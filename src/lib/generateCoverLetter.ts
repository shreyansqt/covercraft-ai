import type { LLMSettings } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { getPromptWithContext } from "./utils";

export const generateCoverLetter = async (
  coverLetterContext: string,
  llmSettings: LLMSettings
): Promise<string> => {
  const openai = createOpenAI({
    apiKey: llmSettings.apiKey,
  });

  const { text } = await generateText({
    model: openai("gpt-4o-mini"),
    prompt: getPromptWithContext(
      llmSettings.coverLetterPrompt,
      coverLetterContext
    ),
  });

  return text;
};
