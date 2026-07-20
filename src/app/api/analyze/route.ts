import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { generateText } from "ai";

const google = createGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export const maxDuration = 60; // Document analysis takes longer

export async function POST(req: Request) {
  try {
    const { image } = await req.json(); // Expected as a base64 string

    if (!image) {
      return new Response("No image provided", { status: 400 });
    }

    // Since we don't want to hardcore the products in the prompt if they change, 
    // we fetch them to inject into the system prompt.
    let productContext = "Aerio Nano (Compact), Aerio Core (Medium), Aerio Max (Large), Aerio Pro (Extra Large), Aerio Nursery, Aerio Outdoor";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
      const { data: allProducts } = await res.json();
      productContext = allProducts.map((p: any) => `${p.name} (Coverage: ${p.specs?.coverageSqFt || 'unknown'} sq ft, Category: ${p.category})`).join(", ");
    } catch (e) {
      console.error("Failed to fetch products for context, using default");
    }

    const result = await generateText({
      model: google("gemini-1.5-pro") as any,
      system: `You are an elite Aerio Deployment Strategist. Your job is to analyze home floor plans, blueprints, or HVAC layouts.
      1. Visually identify rooms and estimate their square footage (if possible from the plan) or use standard sizes.
      2. Match each room to the perfect Aerio purifier based on this catalog: ${productContext}
      3. Generate a professional 'Aerio Action Plan' in Markdown format.
      4. INCLUDE a Markdown table that maps 'Room', 'Estimated Sq Ft', and 'Recommended Aerio Model'.
      5. Sound highly professional, premium, and authoritative.`,
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Please analyze this floor plan and generate an Aerio deployment strategy." },
            { type: "image", image: image.split(",")[1] || image } // Strip data URL prefix if present
          ]
        }
      ]
    });

    return new Response(JSON.stringify({ markdown: result.text }), {
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Analysis API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
