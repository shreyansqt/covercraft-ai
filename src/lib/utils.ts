import { jobInfoSchema, keywordSchema } from "@/schemas";
import type { TypedCoverLetter } from "@/types";
import type { CoverLetter, Step } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateCoverLetter = (
  coverLetter: CoverLetter
): TypedCoverLetter => {
  const jobInfo = coverLetter.jobInfo
    ? jobInfoSchema.parse(coverLetter.jobInfo)
    : undefined;
  const keywords = coverLetter.keywords
    ? keywordSchema.array().parse(coverLetter.keywords)
    : undefined;
  const chat = coverLetter.chat ? JSON.parse(coverLetter.chat) : undefined;
  return { ...coverLetter, jobInfo, keywords, chat };
};

const stepPathMap: Record<Step, string> = {
  JobDescription: "job-description",
  CompanyInfo: "company-info",
  Keywords: "keywords",
  Review: "review",
  Chat: "chat",
};

export const getStepPath = (coverLetter: TypedCoverLetter) => {
  return `/app/cover-letter/${coverLetter.id}/${
    stepPathMap[coverLetter.currentStep]
  }`;
};
