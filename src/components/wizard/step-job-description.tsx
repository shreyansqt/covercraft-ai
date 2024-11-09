"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useCoverLetterContext } from "@/hooks/use-cover-letter-context";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { useStep } from "@/hooks/use-step";
import { processJobDescription } from "@/lib/processJobDescription";
import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect } from "react";
import { Textarea } from "../ui/textarea";

export const StepJobDescription = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  const { llmSettings } = useLLMSettings();
  const coverLetterContext = useCoverLetterContext(coverLetter.id);
  const { registerStepAction } = useStep();

  const beforeNextStep = useCallback(async () => {
    if (
      !coverLetter.jobDescription ||
      coverLetter.roleName ||
      coverLetter.companyName ||
      coverLetter.matchScore
    )
      return;
    const { roleName, companyName, matchScore } = await processJobDescription(
      coverLetterContext,
      llmSettings
    );
    updateCoverLetter({
      roleName,
      companyName,
      matchScore,
    });
  }, [coverLetterContext, llmSettings, updateCoverLetter]);

  useEffect(() => {
    registerStepAction(coverLetter.currentStep, beforeNextStep);
  }, [beforeNextStep]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCoverLetter({
      jobDescription: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <Label htmlFor="jobDescription">Enter Job Description</Label>
      <Textarea
        id="jobDescription"
        placeholder="Paste the job description here..."
        value={coverLetter.jobDescription}
        onChange={handleChange}
        className="flex-1 resize-none"
      />
    </div>
  );
};
