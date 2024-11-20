import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export async function POST(req: Request) {
  const body = await req.json();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict",
  });

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: body.prompt,
  });

  return new Response(text);
}
