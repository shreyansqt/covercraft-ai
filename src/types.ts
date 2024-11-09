import type { Message } from "ai/react";
import type { Step } from "./hooks/use-step";

export type Keyword = {
  keyword: string;
  category: string;
  selected?: boolean;
};

export interface CoverLetter {
  id: string;
  currentStep: Step;
  // step 1: job description, populated by user
  jobDescription?: string;
  // step 1: job description, populated by llm
  roleName?: string;
  companyName?: string;
  matchScore?: number;
  // step 2: company info, populated by user
  companyInfo?: string;
  // step 3: keywords, populated by llm
  keywords: Keyword[];
  // step 4: review, populated by llm
  content?: string;
  // step 5: chat, populated by user & llm
  chat?: Message[];
}

export type LLMSettings = {
  apiKey?: string;
  processJobDescriptionPrompt: string;
  jobSummaryPrompt: string;
  coverLetterPrompt: string;
};
