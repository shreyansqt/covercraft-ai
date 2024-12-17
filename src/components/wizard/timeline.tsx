"use client";
import { canGoToStep, getStepLabel, steps, type Step } from "@/lib/steps";
import { cn } from "@/lib/utils";
import type { TypedCoverLetter } from "@/types";
import Link from "next/link";

export function Timeline({
  coverLetter,
  activeStep,
}: {
  coverLetter: TypedCoverLetter;
  activeStep: Step;
}) {
  return (
    <div className="flex flex-shrink-0 justify-around px-4 py-3">
      {steps.map((step, i) => {
        const isDisabled = !canGoToStep(step, coverLetter);
        return (
          <Link
            key={i}
            href={
              isDisabled ? "" : `/app/cover-letter/${coverLetter.id}/${step}`
            }
            className={cn(
              "flex items-center gap-2",
              isDisabled && "disabled opacity-50 pointer-events-none"
            )}
          >
            <div
              className={cn(
                "size-6 line-height-6 rounded-full flex items-center justify-center transition-colors text-sm",
                activeStep === step
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <p className="text-center text-sm">{getStepLabel(step)}</p>
          </Link>
        );
      })}
    </div>
  );
}
