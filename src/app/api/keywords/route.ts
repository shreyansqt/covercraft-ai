import { auth } from "@/auth";
import { keywordSchema } from "@/schemas";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  keywords: z.array(keywordSchema),
});

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

export async function POST(req: Request) {
  const session = await auth();
  if (session) {
    const body = await req.json();

    const result = await generateObject({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
      schemaName: "keywords",
      schema,
      prompt: body.prompt,
    });

    return Response.json(result.object.keywords);
  } else {
    return Response.json("401 Unauthorized", { status: 401 });
  }
}
