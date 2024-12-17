import StepChat from "@/components/wizard/step-chat";
import { StepInfo } from "@/components/wizard/step-info";
import { StepKeywords } from "@/components/wizard/step-keywords";
import { StepReview } from "@/components/wizard/step-review";
import type { TypedCoverLetter } from "@/types";
import { redirect } from "next/navigation";

export enum Step {
  Info = "info",
  Keywords = "keywords",
  Review = "review",
  Chat = "chat",
}

export const steps = [
  Step.Info,
  Step.Keywords,
  Step.Review,
  Step.Chat,
] as const;

const stepComponents = {
  [Step.Info]: StepInfo,
  [Step.Keywords]: StepKeywords,
  [Step.Review]: StepReview,
  [Step.Chat]: StepChat,
};

const stepLabels = {
  [Step.Info]: "Enter Job Info",
  [Step.Keywords]: "Select Relevant Keywords",
  [Step.Review]: "Review & Export",
  [Step.Chat]: "Chat",
};

const preStepRequirements: Record<
  Step,
  (coverLetter: TypedCoverLetter) => boolean
> = {
  [Step.Info]: () => true,
  [Step.Keywords]: (coverLetter) => !!coverLetter.jobDescription,
  [Step.Review]: (coverLetter) =>
    !!coverLetter.jobDescription && coverLetter.keywords.length > 0,
  [Step.Chat]: (coverLetter) =>
    !!coverLetter.jobDescription && coverLetter.keywords.length > 0,
};

export const getStepLabel = (step: Step) => stepLabels[step];
export const getStepComponent = (step: Step) => stepComponents[step];
export const getStepIndex = (step: Step) => steps.indexOf(step);

export const goToStep = (id: string, step: Step) => {
  redirect(`/app/cover-letter/${id}/${step}`);
};

export const goToNextStep = async (id: string, activeStep: Step) => {
  const activeStepIndex = getStepIndex(activeStep);
  const nextStep = steps[activeStepIndex + 1];
  if (nextStep) {
    goToStep(id, nextStep);
  }
};

export const goToPreviousStep = (id: string, activeStep: Step) => {
  const activeStepIndex = getStepIndex(activeStep);
  const previousStep = steps[activeStepIndex - 1];
  if (previousStep) {
    goToStep(id, previousStep);
  }
};

export const canGoToStep = (step: Step, coverLetter: TypedCoverLetter) => {
  return preStepRequirements[step](coverLetter);
};

export const getCurrentStep = (coverLetter: TypedCoverLetter) => {
  if (canGoToStep(Step.Keywords, coverLetter)) {
    return Step.Keywords;
  }
  if (canGoToStep(Step.Review, coverLetter)) {
    return Step.Review;
  }
  if (canGoToStep(Step.Chat, coverLetter)) {
    return Step.Chat;
  }
  return Step.Info;
};

export const getCurrentStepPath = (coverLetter: TypedCoverLetter) => {
  const currentStep = getCurrentStep(coverLetter);
  return `/app/cover-letter/${coverLetter.id}/${currentStep}`;
};

export const getCurrentStepIndex = (coverLetter: TypedCoverLetter) => {
  const currentStep = getCurrentStep(coverLetter);
  return getStepIndex(currentStep);
};
