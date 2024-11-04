import { StepCompanyInfo } from "@/components/cover-letter/step-company-info";
import { StepJobDescription } from "@/components/cover-letter/step-job-description";
import { StepKeywords } from "@/components/cover-letter/step-keywords";
import { StepReview } from "@/components/cover-letter/step-review";
import type { Step } from "@/types";

const CoverLetterStepPage = async (props: {
  params: Promise<{ id: string; step: Step }>;
}) => {
  const params = await props.params;

  if (params.step === "job-description") {
    return <StepJobDescription id={params.id} />;
  }
  if (params.step === "company-info") {
    return <StepCompanyInfo id={params.id} />;
  }
  if (params.step === "keywords") {
    return <StepKeywords id={params.id} />;
  }
  if (params.step === "review") {
    return <StepReview id={params.id} />;
  }
  return <div>CoverLetterStepPage</div>;
};

export default CoverLetterStepPage;
