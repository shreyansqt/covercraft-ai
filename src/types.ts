import type { CoverLetter } from "@prisma/client";
import type { Message } from "ai/react";
import type { z } from "zod";
import type { jobInfoSchema, keywordSchema } from "./schemas";

export type JobInfo = z.infer<typeof jobInfoSchema>;
export type Keyword = z.infer<typeof keywordSchema>;
export type SelectedKeyword = Keyword & { selected?: boolean };

export type TypedCoverLetter = Omit<
  CoverLetter,
  "chat" | "keywords" | "jobInfo"
> & {
  jobInfo?: JobInfo;
  keywords?: Array<SelectedKeyword>;
  chat?: Message[];
};

export type LLMSettings = {
  jobInfoPrompt: string;
  keywordsPrompt: string;
  coverLetterPrompt: string;
  chatPrompt: string;
};
