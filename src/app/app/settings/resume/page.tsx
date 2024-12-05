import { Header } from "@/components/header";
import { ResumeForm } from "@/components/resume-form";
import { prisma } from "@/prisma";
import { getCurrentUser } from "@/services/user";

export default async function ResumePage() {
  const user = await getCurrentUser();
  if (!user) return <div>Not authenticated</div>;

  const resume = await prisma.resume.findFirst({
    where: {
      userId: user.id,
    },
  });

  return (
    <div className="flex flex-col h-full">
      <Header>
        <h1 className="font-semibold text-2xl">Resume</h1>
      </Header>
      <ResumeForm currentResume={resume} />
    </div>
  );
}
