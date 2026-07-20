import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const maxDuration = 60;

export async function POST(req: Request) {
  try {
    const { rooms } = await req.json();

    if (!rooms || !Array.isArray(rooms) || rooms.length === 0) {
      return new Response("No room data provided", { status: 400 });
    }

    // Fetch live product catalog for context
    let productContext = "Aerio Nano (Compact), Aerio Core (Medium), Aerio Max (Large), Aerio Pro (Extra Large), Aerio Nursery, Aerio Outdoor";
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
      const { data: allProducts } = await res.json();
      productContext = allProducts.map((p: any) => `${p.name} (Coverage: ${p.specs?.coverageSqFt || 'unknown'} sq ft, Category: ${p.category}, Price: $${p.price})`).join(", ");
    } catch (e) {
      console.error("Failed to fetch products for context, using default");
    }

    const roomDescriptions = rooms.map((r: any, i: number) => 
      `Room ${i + 1}: ${r.name} - approximately ${r.sqft} sq ft`
    ).join("\n");

    const result = await generateText({
      model: groq("llama-3.3-70b-versatile") as any,
      system: `You are an elite Aerio Deployment Strategist. Your job is to analyze home room layouts and recommend the perfect Aerio air purifier for each room.

Here is the Aerio product catalog: ${productContext}

Rules:
1. Match each room to the perfect Aerio purifier based on the room's square footage and the product's coverage area.
2. Generate a professional 'Aerio Action Plan' in Markdown format.
3. ALWAYS include a Markdown table with columns: 'Room', 'Sq Ft', 'Recommended Model', 'Price'.
4. Add a total estimated investment at the bottom.
5. Include a brief explanation for each recommendation.
6. Sound highly professional, premium, and authoritative.
7. Keep it concise but comprehensive.`,
      messages: [
        {
          role: "user",
          content: `Please generate an Aerio deployment strategy for my home with the following rooms:\n\n${roomDescriptions}`
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
