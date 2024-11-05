import type { CoverLetter, LLMSettings } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const generateCoverLetter = async (
  coverLetter: CoverLetter,
  resume: string,
  llmSettings: LLMSettings
): Promise<string> => {
  const openai = createOpenAI({
    apiKey: llmSettings.apiKey,
  });

  const prompt = `${llmSettings.coverLetterPrompt}

Job Description:
${coverLetter.jobDescription}

Company Info:
${coverLetter.companyInfo}

Resume:
${resume}

Selected Keywords:
${coverLetter.keywords
  .filter((k) => k.selected)
  .map((k) => k.keyword)
  .join(", ")}`;

  const { text } = await generateText({
    model: openai("gpt-4o"),
    prompt,
  });

  return text;
};
