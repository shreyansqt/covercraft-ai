"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useStep, type Step } from "@/hooks/use-step";
import { use, useEffect } from "react";

const CoverLetterStepPage = (props: {
  params: Promise<{ id: string; step: Step }>;
}) => {
  const params = use(props.params);
  const { updateCoverLetter } = useCoverLetter(params.id);
  const { getStepComponent } = useStep();
  const CurrentStepComponent = getStepComponent(params.step);

  useEffect(() => {
    updateCoverLetter({ currentStep: params.step });
  }, [params.step, updateCoverLetter]);

  if (!CurrentStepComponent) return null;

  return <CurrentStepComponent id={params.id} />;
};

export default CoverLetterStepPage;
