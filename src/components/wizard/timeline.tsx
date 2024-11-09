"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useStep } from "@/hooks/use-step";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Progress } from "../ui/progress";

export function Timeline({ id }: { id: string }) {
  const { coverLetter } = useCoverLetter(id);
  const { steps, getStepIndex, getStepLabel } = useStep();
  const currentStepIndex = getStepIndex(coverLetter.currentStep);

  return (
    <>
      <div className="flex justify-around px-4 py-3">
        {steps.map((step, i) => (
          <Link
            key={i}
            href={`/app/cover-letter/${id}/${step}`}
            className="flex items-center gap-2"
          >
            <div
              className={cn(
                "size-6 line-height-6 rounded-full flex items-center justify-center transition-colors text-sm",
                i <= currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {i + 1}
            </div>
            <p className="text-center text-sm">{getStepLabel(step)}</p>
          </Link>
        ))}
      </div>
      <Progress
        value={((currentStepIndex + 1) / steps.length) * 100}
        className="rounded-none h-[2px]"
      />
    </>
  );
}
