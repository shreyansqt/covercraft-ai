"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getCurrentUser = async () => {
  const session = await auth();
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email ?? undefined },
  });
  return user;
};
