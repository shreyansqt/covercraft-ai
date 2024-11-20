"use client";

import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useStep } from "@/hooks/use-step";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export const CoverLetterFooter = ({ id }: { id: string }) => {
  const { coverLetter } = useCoverLetter(id);
  const { steps, getStepIndex, goToPreviousStep, goToNextStep, canGoToStep } =
    useStep();

  const currentStepIndex = getStepIndex(coverLetter.currentStep);

  const nextStep = steps[currentStepIndex + 1];

  return (
    <footer className="flex px-6 py-4 border-t">
      {currentStepIndex > 0 && (
        <Button
          variant="ghost"
          onClick={() => goToPreviousStep(id, coverLetter.currentStep)}
          size="icon"
        >
          <ArrowLeft className="w-4 h-4" weight="duotone" />
          <span className="sr-only">Previous</span>
        </Button>
      )}

      {currentStepIndex < steps.length - 1 && (
        <Button
          onClick={() => goToNextStep(id, coverLetter.currentStep)}
          className="ml-auto"
          disabled={!canGoToStep(nextStep, coverLetter)}
        >
          Next
        </Button>
      )}
    </footer>
  );
};
