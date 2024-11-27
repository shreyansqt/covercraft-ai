import { auth } from "@/auth";
import { jobInfoSchema } from "@/schemas";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";

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
      schemaName: "jobSummary",
      schema: jobInfoSchema,
      prompt: body.prompt,
    });

    return Response.json(result.object);
  } else {
    return Response.json("401 Unauthorized", { status: 401 });
  }
}
