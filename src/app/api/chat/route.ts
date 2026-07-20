import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const groq = createOpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const maxDuration = 30;

// Pre-fetch products and cache for the system prompt
async function getProductCatalog(): Promise<string> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`);
    const data = await res.json();
    return JSON.stringify(data.data?.map((p: any) => ({
      name: p.name,
      category: p.category,
      price: p.price,
      specs: p.specs,
      inStock: p.inStock,
    })) || []);
  } catch {
    return "[]";
  }
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const catalog = await getProductCatalog();

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile") as any,
      system: `You are Aerio Concierge, a premium AI shopping assistant for Aerio, a luxury air purifier brand.
      You help customers find the perfect air purifier for their home.
      Always be polite, concise, and luxurious in your tone.

      Here is the complete Aerio product catalog in JSON format. Use ONLY these products for recommendations. Never make up products:
      ${catalog}

      When recommending products:
      - Always mention the exact price
      - Highlight key specs like coverage area (sq ft), CADR rating, noise level
      - Be concise but luxurious in tone
      - If a product is out of stock, mention it and suggest alternatives`,
      messages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), { status: 500 });
  }
}
