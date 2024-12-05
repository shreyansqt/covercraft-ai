"use server";

import { validateCoverLetter } from "@/lib/utils";
import { prisma } from "@/prisma";
import type { User } from "@prisma/client";
import { revalidateTag, unstable_cache } from "next/cache";
import { getCurrentUser } from "./user";

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
