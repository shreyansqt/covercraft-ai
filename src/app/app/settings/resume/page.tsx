import { Header } from "@/components/header";
import { ResumeForm } from "@/components/resume-form";
import { getResume } from "@/services/resume";

export default async function ResumePage() {
  const resume = await getResume();

  return (
    <div className="flex flex-col h-full">
      <Header>
        <h1 className="font-semibold text-2xl">Resume</h1>
      </Header>
      <ResumeForm currentResume={resume} className="flex-1 p-8" />
    </div>
  );
}
