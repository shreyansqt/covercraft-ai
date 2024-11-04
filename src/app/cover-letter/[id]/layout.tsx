"use client";

import { CoverLetterFooter } from "@/components/cover-letter/footer";
import { CoverLetterHeader } from "@/components/cover-letter/header";
import { Timeline } from "@/components/cover-letter/timeline";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import type { Step } from "@/types";
import { use } from "react";

export default function CoverLetterPage(props: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
  const params = use(props.params);
  const steps: Step[] = [
    "job-description",
    "company-info",
    "keywords",
    "review",
  ];

  const { coverLetter } = useCoverLetter(params.id);

  if (!coverLetter) {
    return <h1>No cover letter found for id &quot;{params.id}&quot;</h1>;
  }

  return (
    <div className="flex w-full h-screen">
      <div className="flex flex-col flex-1 overflow-hidden">
        <CoverLetterHeader id={params.id} />
        <Timeline steps={steps} id={params.id} />
        <main className="flex-grow flex-1 p-6 overflow-auto">
          {props.children}
        </main>
        <CoverLetterFooter id={params.id} steps={steps} />
      </div>
    </div>
  );
}
