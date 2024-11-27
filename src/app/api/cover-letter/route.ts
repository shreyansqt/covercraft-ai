import { auth } from "@/auth";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

export async function POST(req: Request) {
  const session = await auth();
  if (session) {
    const body = await req.json();

    const { text } = await generateText({
      model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
      prompt: body.prompt,
    });

    return new Response(text);
  } else {
    return Response.json("401 Unauthorized", { status: 401 });
  }
}
