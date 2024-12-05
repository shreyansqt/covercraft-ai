import StepChat from "@/components/wizard/step-chat";
import { StepCompanyInfo } from "@/components/wizard/step-company-info";
import { StepJobDescription } from "@/components/wizard/step-job-description";
import { StepKeywords } from "@/components/wizard/step-keywords";
import { StepReview } from "@/components/wizard/step-review";
import type { TypedCoverLetter } from "@/types";
import { useRouter } from "next/navigation";

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

export const useStep = () => {
  const router = useRouter();

  const goToNextStep = async (id: string, currentStep: Step) => {
    const currentStepIndex = Object.values(Step).indexOf(currentStep);
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

  const getStepLabel = (step: Step) => {
    return stepLabels[step];
  };

  const getStepComponent = (step: Step) => {
    return stepComponents[step];
  };

  const getStepIndex = (step: Step) => {
    return Object.values(Step).indexOf(step);
  };

  const canGoToStep = (step: Step, coverLetter: TypedCoverLetter) => {
    const requiredKeys = preStepRequirements[step];
    return requiredKeys.every((key) => coverLetter[key]);
  };

  return {
    steps,
    goToPreviousStep,
    goToNextStep,
    goToStep,
    getStepLabel,
    getStepComponent,
    getStepIndex,
    canGoToStep,
  };
};
