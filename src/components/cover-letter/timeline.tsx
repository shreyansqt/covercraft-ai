import { useCoverLetter } from "@/hooks/use-cover-letter";
import type { Step } from "@/types";
import Link from "next/link";
import { Progress } from "../ui/progress";

export function Timeline({ steps, id }: { steps: Step[]; id: string }) {
  const { coverLetter } = useCoverLetter(id);
  const { currentStep } = coverLetter;
  const currentStepNumber = steps.indexOf(currentStep) + 1;
  const stepLabels = {
    "job-description": "Job Description",
    "company-info": "Company Info",
    keywords: "Keywords",
    review: "Review & Export",
    chat: "Chat",
  };
  return (
    <>
      <div className="flex justify-around px-6 py-4">
        {steps.map((step, i) => (
          <Link
            key={i}
            href={`/cover-letter/${id}/${step}`}
            className="flex flex-col items-center"
          >
            <div
              className={`w-8 h-8 line-height-8 rounded-full flex items-center justify-center transition-colors ${
                i + 1 <= currentStepNumber
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <p className="mt-2 text-center text-sm">{stepLabels[step]}</p>
          </Link>
        ))}
      </div>
      <Progress
        value={(currentStepNumber / steps.length) * 100}
        className="rounded-none h-[2px]"
      />
    </>
  );
}
