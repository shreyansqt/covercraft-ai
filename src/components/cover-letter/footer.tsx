import { useCoverLetter } from "@/hooks/use-cover-letter";
import type { Step } from "@/types";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { DownloadButton } from "./download-button";

export const CoverLetterFooter = ({
  id,
  steps,
}: {
  id: string;
  steps: Step[];
}) => {
  const router = useRouter();
  const { coverLetter } = useCoverLetter(id);
  const { currentStep } = coverLetter;
  const currentStepIndex = steps.indexOf(currentStep);
  const handleNext = () => {
    const nextStep = steps[currentStepIndex + 1];
    if (nextStep) {
      router.push(`/cover-letter/${id}/${nextStep}`);
    }
  };

  const handlePrevious = () => {
    const previousStep = steps[currentStepIndex - 1];
    if (previousStep) {
      router.push(`/cover-letter/${id}/${previousStep}`);
    }
  };

  return (
    <footer className="flex px-6 py-4 border-t">
      {currentStepIndex > 0 && (
        <Button variant="ghost" onClick={handlePrevious}>
          <ArrowLeftIcon />
        </Button>
      )}

      {currentStepIndex < steps.length - 1 && (
        <Button onClick={handleNext} className="ml-auto">
          Next
        </Button>
      )}

      {currentStep === "review" && <DownloadButton coverLetter={coverLetter} />}
    </footer>
  );
};
