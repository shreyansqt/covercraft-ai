import { jobInfoSchema } from "@/schemas";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";

export async function POST(req: Request) {
  const body = await req.json();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict",
  });

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    schemaName: "jobSummary",
    schema: jobInfoSchema,
    prompt: body.prompt,
  });

  return Response.json(result.object);
}
