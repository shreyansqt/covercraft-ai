import { type LLMSettings } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  roleName: z.string(),
  companyName: z.string(),
  matchScore: z.number(),
});

export const processJobDescription = async (
  coverLetterContext: string,
  llmSettings: LLMSettings
): Promise<z.infer<typeof schema>> => {
  const openai = createOpenAI({
    apiKey: llmSettings.apiKey,
  });

  const prompt = `Context:
${coverLetterContext}
---
${llmSettings.jobSummaryPrompt}`;

  try {
    const result = await generateObject({
      model: openai("gpt-4o", { structuredOutputs: true }),
      schemaName: "jobSummary",
      schemaDescription:
        "Structured data based on the following job description and company info",
      schema,
      prompt,
    });

    return result.object;
  } catch (error) {
    console.error("Error extracting keywords:", error);
    throw error;
  }
};
