import { createGroq } from "@ai-sdk/groq";
import { streamText, tool } from "ai";
import { z } from "zod";

const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = await streamText({
      model: groq("llama-3.3-70b-versatile") as any,
      system: `You are Aerio Concierge, a premium AI shopping assistant for Aerio, a luxury air purifier brand.
      You help customers find the perfect air purifier for their home.
      Always be polite, concise, and luxurious in your tone.
      Use the 'searchAerioProducts' tool whenever the user asks for recommendations, asks about stock, or asks about specific features.
      Do not make up products. Only recommend what the tool returns.`,
      messages,
      tools: {
        searchAerioProducts: tool({
          description: "Search the Aerio product database by category or search term to get exact specifications, prices, and stock.",
          parameters: z.object({
            search: z.string().optional().describe("A text string to search for in product names (e.g. 'Nano', 'Pro')"),
            category: z.string().optional().describe("A category to filter by (e.g. 'Compact', 'Flagship', 'Commercial', 'Nursery', 'Outdoor')"),
          }),
          execute: async ({ search, category }) => {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append("search", search);
            if (category) queryParams.append("category", category);
            
            try {
              const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${queryParams.toString()}`);
              const data = await res.json();
              return data.data; // Array of products
            } catch (error) {
              return { error: "Failed to fetch products" };
            }
          },
        }),
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : String(error) }), { status: 500 });
  }
}
