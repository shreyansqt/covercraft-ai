import StepChat from "@/components/wizard/step-chat";
import { StepCompanyInfo } from "@/components/wizard/step-company-info";
import { StepJobDescription } from "@/components/wizard/step-job-description";
import { StepKeywords } from "@/components/wizard/step-keywords";
import { StepReview } from "@/components/wizard/step-review";
import { useRouter } from "next/navigation";
import { useState } from "react";
export enum Step {
  JobDescription = "job-description",
  CompanyInfo = "company-info",
  Keywords = "keywords",
  Review = "review",
  Chat = "chat",
}

const steps = Object.values(Step);

const stepComponents = {
  [Step.JobDescription]: StepJobDescription,
  [Step.CompanyInfo]: StepCompanyInfo,
  [Step.Keywords]: StepKeywords,
  [Step.Review]: StepReview,
  [Step.Chat]: StepChat,
};

const stepLabels = {
  [Step.JobDescription]: "Job Description",
  [Step.CompanyInfo]: "Company Info",
  [Step.Keywords]: "Keywords",
  [Step.Review]: "Review & Export",
  [Step.Chat]: "Chat",
};

let stepActions: Partial<Record<Step, () => Promise<void>>> = {};

export const useStep = () => {
  const router = useRouter();
  // state
  const [isNextStepLoading, setIsNextStepLoading] = useState(false);

  // methods
  const goToNextStep = async (id: string, currentStep: Step) => {
    const currentStepIndex = Object.values(Step).indexOf(currentStep);
    const currentStepAction = stepActions[currentStep];
    if (currentStepAction) {
      setIsNextStepLoading(true);
      await currentStepAction();
      setIsNextStepLoading(false);
    }
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      router.push(`/app/cover-letter/${id}/${nextStep}`);
    }
  };

  const goToPreviousStep = (id: string, currentStep: Step) => {
    const currentStepIndex = Object.values(Step).indexOf(currentStep);
    const previousStep = steps[currentStepIndex - 1];
    if (previousStep) {
      router.push(`/app/cover-letter/${id}/${previousStep}`);
    }
  };

  const goToStep = (id: string, step: Step) => {
    router.push(`/app/cover-letter/${id}/${step}`);
  };

  const registerStepAction = (step: Step, action: () => Promise<void>) => {
    stepActions = { ...stepActions, [step]: action };
  };

  const getStepLabel = (step: Step) => {
    return stepLabels[step];
  };

  const getStepComponent = (step: Step) => {
    return stepComponents[step];
  };

  const getStepIndex = (step: Step) => {
    return Object.values(Step).indexOf(step);
  };

  return {
    // state
    steps,
    isNextStepLoading,
    // methods
    goToPreviousStep,
    goToNextStep,
    goToStep,
    registerStepAction,
    getStepLabel,
    getStepComponent,
    getStepIndex,
  };
};
