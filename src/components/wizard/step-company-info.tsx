"use client";

import { useBlurAction } from "@/hooks/use-blur-action";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { generateJobInfo, updateCoverLetter } from "@/services/cover-letter";
import type { TypedCoverLetter } from "@/types";
import { Check, Spinner } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";

export const StepCompanyInfo = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const router = useRouter();
  const { llmSettings } = useLLMSettings();

  useEffect(() => {
    if (!coverLetter.jobInfo) {
      generateJobInfo(coverLetter.id, llmSettings.jobInfoPrompt).finally(() => {
        router.refresh();
      });
    }
  }, [coverLetter.jobInfo, coverLetter.id, llmSettings.jobInfoPrompt, router]);

  const { isLoading, success, handleBlur } = useBlurAction({
    action: async (value: string) => {
      await updateCoverLetter(coverLetter.id, {
        companyInfo: value,
      });
      router.refresh();
    },
    skipCondition: (value) => value === coverLetter.companyInfo,
  });

  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <div className="flex items-center gap-2">
        <Label htmlFor="companyInfo">Enter Company Information</Label>
        {isLoading && <Spinner className="animate-spin" />}
        {success && <Check />}
      </div>
      <Textarea
        id="companyInfo"
        placeholder="Paste information from the company's about and careers page..."
        defaultValue={coverLetter.companyInfo || ""}
        onBlur={handleBlur}
        className="flex-1 resize-none"
      />
    </div>
  );
};
