"use client";

import { useBlurAction } from "@/hooks/use-blur-action";
import { updateCoverLetter } from "@/services/cover-letter";
import type { TypedCoverLetter } from "@/types";
import { Check, Spinner } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";

export const StepJobDescription = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const { isLoading, success, handleBlur } = useBlurAction({
    action: async (value: string) => {
      await updateCoverLetter(coverLetter.id, {
        jobDescription: value,
      });
    },
    skipCondition: (value) => value === coverLetter.jobDescription,
  });

  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <div className="flex items-center gap-2">
        <Label htmlFor="jobDescription">Enter Job Description</Label>
        {isLoading && <Spinner className="animate-spin" />}
        {success && <Check />}
      </div>
      <Textarea
        id="jobDescription"
        placeholder="Paste the job description here..."
        defaultValue={coverLetter.jobDescription || ""}
        onBlur={handleBlur}
        className="h-full resize-none"
      />
    </div>
  );
};
