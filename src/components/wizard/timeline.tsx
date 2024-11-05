import { useCoverLetter } from "@/hooks/use-cover-letter";
import { cn } from "@/lib/utils";
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
      <div className="flex justify-around px-4 py-3">
        {steps.map((step, i) => (
          <Link
            key={i}
            href={`/cover-letter/${id}/${step}`}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                "size-6 line-height-6 rounded-full flex items-center justify-center transition-colors text-sm",
                i + 1 <= currentStepNumber
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <p className="text-center text-sm">{stepLabels[step]}</p>
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
