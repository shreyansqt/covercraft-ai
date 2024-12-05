"use server";

import { prisma } from "@/prisma";
import { getCurrentUser } from "@/services/user";
import { revalidatePath } from "next/cache";

export type SaveResumeState = {
  error: Error | null;
  message: string | null;
};

export const saveResume = async (
  previousState: SaveResumeState | null,
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
