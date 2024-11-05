import type { Keyword } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json();

  const openai = createOpenAI({
    apiKey: body.apiKey,
  });

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: `The user is applying for a job. They generated a cover letter based on the following information:
    Role Name: ${body.roleName}
    Company Name: ${body.companyName}
    Job Description: ${body.jobDescription}
    Company Information: ${body.companyInfo}
    Selected Keywords: ${(body.keywords as Keyword[])
      .map((k) => k.keyword)
      .join(", ")}
    Resume: ${body.resume}
    ---
    Answer the user's questions based on the information provided.
    `,
    messages: body.messages,
  });

  return result.toDataStreamResponse();
}
