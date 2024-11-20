import {
  chatPrompt,
  coverLetterPrompt,
  jobInfoPrompt,
  keywordsPrompt,
} from "@/prompts";
import type { LLMSettings } from "@/types";
import { useLocalStorage } from "usehooks-ts";

export const useLLMSettings = () => {
  const [llmSettings, setLLMSettings] = useLocalStorage<LLMSettings>(
    "llmSettings",
    {
      jobInfoPrompt,
      keywordsPrompt,
      coverLetterPrompt,
      chatPrompt,
    }
  );
  return { llmSettings, setLLMSettings };
};
