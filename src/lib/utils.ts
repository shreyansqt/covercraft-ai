import { chatMessageSchema, jobInfoSchema, keywordSchema } from "@/schemas";
import type { TypedCoverLetter } from "@/types";
import type { CoverLetter } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateCoverLetter = (
  coverLetter: CoverLetter | null
): TypedCoverLetter => {
  if (!coverLetter) throw new Error("Cover letter not found");
  const jobInfo = coverLetter.jobInfo
    ? jobInfoSchema.parse(coverLetter.jobInfo)
    : null;
  const keywords = keywordSchema.array().parse(coverLetter.keywords);
  const chat = chatMessageSchema.array().parse(
    coverLetter.chat.map((message) => {
      if (!message || typeof message !== "object" || Array.isArray(message))
        return null;
      return {
        ...message,
        createdAt: new Date(message.createdAt as string),
      };
    })
  );
  return { ...coverLetter, jobInfo, keywords, chat };
};
