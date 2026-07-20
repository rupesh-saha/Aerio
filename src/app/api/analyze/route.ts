import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { image } = await req.json();

    if (!image) {
      return new Response("No image provided", { status: 400 });
    }

    // Fetch live product catalog for context
    let productContext = "Aerio Nano (Compact), Aerio Core (Medium), Aerio Max (Large), Aerio Pro (Extra Large), Aerio Nursery, Aerio Outdoor";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
      const { data: allProducts } = await res.json();
      productContext = allProducts.map((p: any) => `${p.name} (Coverage: ${p.specs?.coverageSqFt || 'unknown'} sq ft, Category: ${p.category})`).join(", ");
    } catch (e) {
      console.error("Failed to fetch products for context, using default");
    }

    // Use the base64 image data
    const base64Data = image.split(",")[1] || image;

    const result = await generateText({
      model: groq("llama-4-scout-17b-16e-instruct") as any,
      messages: [
        {
          role: "system",
          content: `You are an elite Aerio Deployment Strategist. Your job is to analyze home floor plans, blueprints, room photos, or HVAC layouts.
          1. Visually identify rooms and estimate their square footage (if possible from the plan) or use standard sizes.
          2. Match each room to the perfect Aerio purifier based on this catalog: ${productContext}
          3. Generate a professional 'Aerio Action Plan' in Markdown format.
          4. INCLUDE a Markdown table that maps 'Room', 'Estimated Sq Ft', and 'Recommended Aerio Model'.
          5. Sound highly professional, premium, and authoritative.`
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Please analyze this floor plan / room image and generate an Aerio deployment strategy." },
            { type: "image", image: base64Data }
          ]
        }
      ]
    });

    return new Response(JSON.stringify({ markdown: result.text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Analysis API Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), { status: 500 });
  }
}
