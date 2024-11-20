import { keywordSchema } from "@/schemas";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  keywords: z.array(keywordSchema),
});

export async function POST(req: Request) {
  const body = await req.json();

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    compatibility: "strict",
  });

  const result = await generateObject({
    model: openai("gpt-4o-mini"),
    schemaName: "keywords",
    schema,
    prompt: body.prompt,
  });

  return Response.json(result.object.keywords);
}
