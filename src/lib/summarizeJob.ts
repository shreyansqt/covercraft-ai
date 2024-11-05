import { type CoverLetter, type LLMSettings } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  roleName: z.string(),
  companyName: z.string(),
  keywords: z.array(
    z.object({
      keyword: z.string(),
      category: z.string(),
    })
  ),
});

type JobSummary = z.infer<typeof schema>;

export const summarizeJob = async (
  coverLetter: CoverLetter,
  llmSettings: LLMSettings
): Promise<JobSummary> => {
  const openai = createOpenAI({
    apiKey: llmSettings.apiKey,
  });

  const prompt = `${llmSettings.jobSummaryPrompt}

Job Description:
${coverLetter.jobDescription}

Company Info:
${coverLetter.companyInfo}`;

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
