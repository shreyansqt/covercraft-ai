import { CoverLetterFooter } from "@/components/wizard/footer";
import { CoverLetterHeader } from "@/components/wizard/header";
import { Timeline } from "@/components/wizard/timeline";
import type { Step } from "@/types";

export default async function CoverLetterPage(props: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const params = await props.params;
  const steps: Step[] = [
    "job-description",
    "company-info",
    "keywords",
    "review",
    "chat",
  ];

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <CoverLetterHeader id={params.id} />
        <Timeline steps={steps} id={params.id} />
        <main className="flex-grow flex-1 overflow-auto">{props.children}</main>
        <CoverLetterFooter id={params.id} steps={steps} />
      </div>
    </div>
  );
}
