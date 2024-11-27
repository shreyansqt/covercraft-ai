import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict",
  });

  const result = await streamText({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    system: body.prompt,
    messages: body.messages,
  });

  return result.toDataStreamResponse();
}
