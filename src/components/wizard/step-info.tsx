"use client";

import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { goToNextStep, Step } from "@/lib/steps";
import { generateJobInfo, updateCoverLetter } from "@/services/cover-letter";
import type { TypedCoverLetter } from "@/types";
import { Spinner } from "@phosphor-icons/react";
import Form from "next/form";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export const StepInfo = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (_: void | null, formData: FormData) => {
    const jobDescription = formData.get("jobDescription") as string;
    const companyInfo = formData.get("companyInfo") as string;

    if (!jobDescription) {
      toast({
        title: "Please fill in the job description",
        variant: "destructive",
      });
      return;
    }

    if (
      jobDescription !== coverLetter.jobDescription ||
      companyInfo !== coverLetter.companyInfo
    ) {
      await updateCoverLetter(coverLetter.id, {
        jobDescription,
        companyInfo,
      });
    }

    await generateJobInfo(coverLetter.id);
    goToNextStep(coverLetter.id, Step.Info);
    router.refresh();
  };

  const [, formAction, isPending] = useActionState(handleSubmit, null);

  return (
    <Form
      action={formAction}
      className="flex flex-col flex-shrink flex-1 overflow-auto"
    >
      <main className="flex flex-col flex-shrink gap-6 p-6 overflow-auto">
        <div className="flex flex-col gap-2">
          <Label htmlFor="jobDescription" className="text-md">
            Enter Job Description
          </Label>
          <Textarea
            id="jobDescription"
            name="jobDescription"
            placeholder="Paste the job description here..."
            defaultValue={coverLetter.jobDescription || ""}
            className="min-h-32"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="companyInfo" className="text-md">
            Enter Company Information (optional)
          </Label>
          <Textarea
            id="companyInfo"
            name="companyInfo"
            placeholder="Paste information from the company's about and careers page..."
            defaultValue={coverLetter.companyInfo || ""}
            className="min-h-32"
          />
        </div>
      </main>
      <footer className="flex mt-auto px-6 py-4 border-t">
        <Button type="submit" className="ml-auto" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save & Proceed</span>
          )}
        </Button>
      </footer>
    </Form>
  );
};
