"use server";

import { addContextToPrompt } from "@/lib/add-context-to-prompt";
import { prisma } from "@/prisma";
import { chatMessageSchema, jobInfoSchema, keywordSchema } from "@/schemas";
import type { TypedCoverLetter } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import type { CoverLetter } from "@prisma/client";
import { generateObject, generateText } from "ai";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getResume } from "./resume";
import { getCurrentUser } from "./user";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

const typeCoverLetter = (coverLetter: CoverLetter): TypedCoverLetter => {
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

export const getCoverLetters = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const coverLetters = await prisma.coverLetter.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const typedCoverLetters = coverLetters.map(typeCoverLetter);
  return typedCoverLetters;
};

export const getCoverLetter = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const coverLetter = await prisma.coverLetter.findUnique({
    where: { id, userId: user.id },
  });
  if (!coverLetter) throw new Error("Cover letter not found");
  const typedCoverLetter = typeCoverLetter(coverLetter);
  return typedCoverLetter;
};

export const createCoverLetter = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const coverLetter = await prisma.coverLetter.create({
    data: { userId: user.id },
  });
  const typedCoverLetter = typeCoverLetter(coverLetter);
  return typedCoverLetter;
};

export const deleteCoverLetter = async (id: string) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  await prisma.coverLetter.delete({
    where: { id, userId: user.id },
  });
  redirect("/app");
};

export const updateCoverLetter = async (
  id: string,
  data: Partial<TypedCoverLetter>
) => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  await prisma.coverLetter.update({
    where: { id, userId: user.id },
    data: {
      ...data,
      jobInfo: data.jobInfo || undefined,
      keywords: data.keywords?.filter((k) => k !== null),
      chat: data.chat?.filter((c) => c !== null) || undefined,
    },
  });
};

export const generateJobInfo = async (id: string) => {
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
    prompt: addContextToPrompt("", coverLetter, resume.content),
  });

  await updateCoverLetter(id, { jobInfo: result.object });
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

  await updateCoverLetter(id, {
    keywords: result.object.keywords,
  });

  return result.object.keywords;
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

  await updateCoverLetter(id, { content: text });
};
