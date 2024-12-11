"use server";

import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
import { getCurrentUser } from "./user";

export const getResume = async () => {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated");
  }
  const resume = await prisma.resume.findFirst({
    where: {
      userId: user.id,
    },
  });

  return resume;
};

export type UpdateResumeState = {
  error: Error | null;
  message: string | null;
};

export const updateResume = async (
  previousState: UpdateResumeState | null,
  formData: FormData
) => {
  try {
    const user = await getCurrentUser();
    if (!user) {
      throw new Error("User not found");
    }
    const resume = await prisma.resume.findFirst({
      where: { userId: user.id },
    });

    const content = formData.get("content") as string;

    if (!resume) {
      await prisma.resume.create({
        data: {
          name: "Default",
          content,
          userId: user.id,
        },
      });
    } else {
      await prisma.resume.update({
        where: { id: resume.id },
        data: { content },
      });
    }

    revalidatePath("/app/settings/resume");

    return { error: null, message: "Resume saved successfully!" };
  } catch (error) {
    return { message: null, error: error as Error };
  }
};
