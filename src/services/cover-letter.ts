"use server";

import { validateCoverLetter } from "@/lib/utils";
import { prisma } from "@/prisma";
import { jobInfoSchema, keywordSchema } from "@/schemas";
import type { TypedCoverLetter } from "@/types";
import { addContextToPrompt } from "@/utils/addContextToPrompt";
import { createOpenAI } from "@ai-sdk/openai";
import type { User } from "@prisma/client";
import { generateObject, generateText } from "ai";
import { revalidateTag, unstable_cache } from "next/cache";
import { z } from "zod";
import { getResume } from "./resume";
import { getCurrentUser } from "./user";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

export const getCoverLetters = unstable_cache(
  async (user: User) => {
    const coverLetters = await prisma.coverLetter.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return coverLetters.map(validateCoverLetter);
  },
  ["cover-letters"],
  { revalidate: 3600, tags: ["cover-letters"] }
);

export const getCoverLetter = unstable_cache(
  async (id: string) => {
    const coverLetter = await prisma.coverLetter.findUnique({ where: { id } });
    return validateCoverLetter(coverLetter);
  },
  ["cover-letter"],
  { revalidate: 3600, tags: ["cover-letter"] }
);

export const createCoverLetter = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const coverLetter = await prisma.coverLetter.create({
    data: { userId: user.id },
  });
  revalidateTag("cover-letters");
  return validateCoverLetter(coverLetter);
};

export const deleteCoverLetter = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  await prisma.coverLetter.delete({ where: { id } });
  revalidateTag("cover-letters");
};

export const updateCoverLetter = async (
  id: string,
  data: Partial<TypedCoverLetter>
) => {
  await prisma.coverLetter.update({
    where: { id },
    data: {
      ...data,
      jobInfo: data.jobInfo || undefined,
      keywords: data.keywords?.filter((k) => k !== null),
      chat: data.chat?.filter((c) => c !== null) || undefined,
    },
  });
  revalidateTag("cover-letter");
};

export const generateJobInfo = async (id: string, jobInfoPrompt: string) => {
  const resume = await getResume();
  if (!resume) {
    throw new Error("Resume not found");
  }

  const coverLetter = await getCoverLetter(id);
  if (!coverLetter) {
    throw new Error("Cover letter not found");
  }

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    schemaName: "jobSummary",
    schema: jobInfoSchema,
    prompt: addContextToPrompt(jobInfoPrompt, coverLetter, resume.content),
  });

  updateCoverLetter(id, { jobInfo: result.object });
};

export const generateKeywords = async (id: string, keywordsPrompt: string) => {
  const resume = await getResume();
  if (!resume) {
    throw new Error("Resume not found");
  }

  const coverLetter = await getCoverLetter(id);
  if (!coverLetter) {
    throw new Error("Cover letter not found");
  }

  const schema = z.object({
    keywords: z.array(keywordSchema),
  });

  const result = await generateObject({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    schemaName: "keywords",
    schema,
    prompt: addContextToPrompt(keywordsPrompt, coverLetter, resume.content),
  });

  updateCoverLetter(id, {
    keywords: result.object.keywords,
  });
};

export const generateCoverLetter = async (
  id: string,
  coverLetterPrompt: string
) => {
  const resume = await getResume();
  if (!resume) {
    throw new Error("Resume not found");
  }

  const coverLetter = await getCoverLetter(id);
  if (!coverLetter) {
    throw new Error("Cover letter not found");
  }

  const { text } = await generateText({
    model: openai(process.env.OPENAI_MODEL || "gpt-4o-mini"),
    prompt: addContextToPrompt(coverLetterPrompt, coverLetter, resume.content),
  });

  updateCoverLetter(id, { content: text });
};
