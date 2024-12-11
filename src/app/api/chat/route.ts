import { getCoverLetter, updateCoverLetter } from "@/services/cover-letter";
import { getResume } from "@/services/resume";
import { getCurrentUser } from "@/services/user";
import type { ChatMessage } from "@/types";
import { addContextToPrompt } from "@/utils/addContextToPrompt";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();

  const user = await getCurrentUser();
  if (!user) {
    return Response.json("401 Unauthorized", { status: 401 });
  }

  const resume = await getResume();
  if (!resume) {
    return Response.json("500 Internal Server Error", { status: 500 });
  }

  const coverLetter = await getCoverLetter(body.coverLetterId);
  if (!coverLetter) {
    return Response.json("404 Not Found", { status: 404 });
  }

  const result = await streamText({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    system: addContextToPrompt(body.chatPrompt, coverLetter, resume.content),
    messages: body.messages,
    async onFinish({ text }) {
      // implement your own storage logic:
      await updateCoverLetter(coverLetter.id, {
        chat: [
          ...body.messages.map((message: ChatMessage) => ({
            ...message,
            id: message.id || crypto.randomUUID(),
            createdAt: message.createdAt || new Date(),
          })),
          {
            id: crypto.randomUUID(),
            createdAt: new Date(),
            role: "assistant",
            content: text,
          },
        ],
      });
    },
  });

  return result.toDataStreamResponse();
}
