import { prisma } from "@/prisma";
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
