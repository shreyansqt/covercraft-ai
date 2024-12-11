"use client";

import {
  canGoToStep,
  getStepIndex,
  goToNextStep,
  goToPreviousStep,
  steps,
  type Step,
} from "@/lib/steps";
import type { TypedCoverLetter } from "@/types";
import { ArrowLeft } from "@phosphor-icons/react";
import { Button } from "../ui/button";

export const CoverLetterFooter = ({
  coverLetter,
  activeStep,
}: {
  coverLetter: TypedCoverLetter;
  activeStep: Step;
}) => {
  const activeStepIndex = getStepIndex(activeStep);

  const nextStep = steps[activeStepIndex + 1];

  return (
    <footer className="flex px-6 py-4 border-t">
      {activeStepIndex > 0 && (
        <Button
          variant="ghost"
          onClick={() => goToPreviousStep(coverLetter.id, activeStep)}
          size="icon"
        >
          <ArrowLeft className="w-4 h-4" weight="duotone" />
          <span className="sr-only">Previous</span>
        </Button>
      )}

      {activeStepIndex < steps.length - 1 && (
        <Button
          onClick={() => goToNextStep(coverLetter.id, activeStep)}
          className="ml-auto"
          disabled={!canGoToStep(nextStep, coverLetter)}
        >
          Next
        </Button>
      )}
    </footer>
  );
};
