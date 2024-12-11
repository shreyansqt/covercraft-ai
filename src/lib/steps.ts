import StepChat from "@/components/wizard/step-chat";
import { StepCompanyInfo } from "@/components/wizard/step-company-info";
import { StepJobDescription } from "@/components/wizard/step-job-description";
import { StepKeywords } from "@/components/wizard/step-keywords";
import { StepReview } from "@/components/wizard/step-review";
import type { TypedCoverLetter } from "@/types";
import { redirect } from "next/navigation";

export enum Step {
  JobDescription = "job-description",
  CompanyInfo = "company-info",
  Keywords = "keywords",
  Review = "review",
  Chat = "chat",
}

export const steps = [
  Step.JobDescription,
  Step.CompanyInfo,
  Step.Keywords,
  Step.Review,
  Step.Chat,
] as const;

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

const preStepRequirements: Record<Step, (keyof TypedCoverLetter)[]> = {
  [Step.JobDescription]: [],
  [Step.CompanyInfo]: ["jobDescription"],
  [Step.Keywords]: ["jobDescription", "jobInfo", "companyInfo"],
  [Step.Review]: ["jobDescription", "jobInfo", "companyInfo", "keywords"],
  [Step.Chat]: [
    "jobDescription",
    "jobInfo",
    "companyInfo",
    "keywords",
    "content",
  ],
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
  const requiredKeys = preStepRequirements[step];
  return requiredKeys.every((key) => coverLetter[key]);
};

export const getCurrentStep = (coverLetter: TypedCoverLetter) => {
  if (!coverLetter.jobDescription) {
    return Step.JobDescription;
  }
  if (!coverLetter.companyInfo) {
    return Step.CompanyInfo;
  }
  if (coverLetter.keywords.length === 0) {
    return Step.Keywords;
  }
  if (!coverLetter.content) {
    return Step.Review;
  }
  return Step.Chat;
};

export const getCurrentStepPath = (coverLetter: TypedCoverLetter) => {
  const currentStep = getCurrentStep(coverLetter);
  return `/app/cover-letter/${coverLetter.id}/${currentStep}`;
};

export const getCurrentStepIndex = (coverLetter: TypedCoverLetter) => {
  const currentStep = getCurrentStep(coverLetter);
  return getStepIndex(currentStep);
};
