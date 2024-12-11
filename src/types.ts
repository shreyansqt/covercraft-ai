import type { CoverLetter } from "@prisma/client";
import type { z } from "zod";
import type {
  chatMessageSchema,
  jobInfoSchema,
  keywordSchema,
} from "./schemas";

export type JobInfo = z.infer<typeof jobInfoSchema>;
export type Keyword = z.infer<typeof keywordSchema>;
export type ChatMessage = z.infer<typeof chatMessageSchema>;

export type TypedCoverLetter = Omit<
  CoverLetter,
  "chat" | "keywords" | "jobInfo"
> & {
  jobInfo: JobInfo | null;
  keywords: Keyword[];
  chat: ChatMessage[];
};

export type LLMSettings = {
  jobInfoPrompt: string;
  keywordsPrompt: string;
  coverLetterPrompt: string;
  chatPrompt: string;
};
