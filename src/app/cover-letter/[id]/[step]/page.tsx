"use client";
import StepChat from "@/components/cover-letter/step-chat";
import { StepCompanyInfo } from "@/components/cover-letter/step-company-info";
import { StepJobDescription } from "@/components/cover-letter/step-job-description";
import { StepKeywords } from "@/components/cover-letter/step-keywords";
import { StepReview } from "@/components/cover-letter/step-review";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import type { Step } from "@/types";
import { use, useEffect } from "react";

const CoverLetterStepPage = (props: {
  params: Promise<{ id: string; step: Step }>;
}) => {
  const params = use(props.params);

  const { coverLetter, updateCoverLetter } = useCoverLetter(params.id);

  useEffect(() => {
    updateCoverLetter({
      currentStep: params.step,
    });
  }, [params.step, updateCoverLetter]);

  const stepComponents = {
    "job-description": StepJobDescription,
    "company-info": StepCompanyInfo,
    keywords: StepKeywords,
    review: StepReview,
    chat: StepChat,
  };

  const StepComponent = stepComponents[params.step];

  return (
    <StepComponent coverLetter={coverLetter} onUpdate={updateCoverLetter} />
  );
};

export default CoverLetterStepPage;
