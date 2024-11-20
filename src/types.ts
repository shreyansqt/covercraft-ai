import type { Message } from "ai/react";
import type { z } from "zod";
import type { Step } from "./hooks/use-step";
import type { jobInfoSchema, keywordSchema } from "./schemas";

export type Keyword = z.infer<typeof keywordSchema>;
export type SelectedKeyword = Keyword & { selected?: boolean };

export type JobInfo = z.infer<typeof jobInfoSchema>;

export interface CoverLetter {
  id: string;
  currentStep: Step;
  // step 1: job description, populated by user
  jobDescription?: string;
  // step 1: job description, populated by llm
  jobInfo?: JobInfo;
  // step 2: company info, populated by user
  companyInfo?: string;
  // step 3: keywords, populated by llm
  keywords: Array<SelectedKeyword>;
  // step 4: review, populated by llm
  content?: string;
  // step 5: chat, populated by user & llm
  chat?: Message[];
}

export type LLMSettings = {
  jobInfoPrompt: string;
  keywordsPrompt: string;
  coverLetterPrompt: string;
  chatPrompt: string;
};
