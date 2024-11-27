import { auth } from "@/auth";
import { jobInfoSchema } from "@/schemas";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";

export const POST = auth(async (req) => {
  if (req.auth) {
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
  } else {
    return Response.json("401 Unauthorized", { status: 401 });
  }
});
