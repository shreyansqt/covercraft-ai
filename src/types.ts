export type Keyword = {
  keyword: string;
  category: string;
  selected?: boolean;
};

export interface CoverLetter {
  id: string;
  roleName?: string;
  companyName?: string;
  jobDescription?: string;
  companyInfo?: string;
  keywords: Keyword[];
  content?: string;
  currentStep: Step;
}

export type Step = "job-description" | "company-info" | "keywords" | "review";

export type LLMSettings = {
  apiKey?: string;
  jobSummaryPrompt: string;
  coverLetterPrompt: string;
};
