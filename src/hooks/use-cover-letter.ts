"use client";

import { jobInfoSchema, keywordSchema } from "@/schemas";
import { useCallback, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { TypedCoverLetter } from "../types";
import { addContextToPrompt } from "../utils/addContextToPrompt";
import { useCoverLetters } from "./use-cover-letters";
import { useLLMSettings } from "./use-llm-settings";
import { useResume } from "./use-resume";
import { Step } from "./use-step";

export const useCoverLetter = (id: string) => {
  const { llmSettings } = useLLMSettings();
  const { resume } = useResume();
  const [fetchingJobInfo, setFetchingJobInfo] = useState(false);
  const [fetchingKeywords, setFetchingKeywords] = useState(false);
  const [fetchingCoverLetter, setFetchingCoverLetter] = useState(false);

  const { deleteCoverLetterById } = useCoverLetters();
  const [coverLetter, setCoverLetter, removeCoverLetter] =
    useLocalStorage<TypedCoverLetter>(`cover-letter-${id}`, {
      id,
      currentStep: Step.JobDescription,
    });

  const updateCoverLetter = useCallback(
    (
      updates:
        | Partial<TypedCoverLetter>
        | ((coverLetter: TypedCoverLetter) => void)
    ) => {
      setCoverLetter((coverLetter) => ({
        ...coverLetter,
        ...(typeof updates === "function" ? updates(coverLetter) : updates),
      }));
    },
    [setCoverLetter]
  );

  const fetchJobInfo = async () => {
    setFetchingJobInfo(true);
    const response = await fetch("/api/job-info", {
      method: "POST",
      body: JSON.stringify({
        prompt: addContextToPrompt(
          llmSettings.jobInfoPrompt,
          coverLetter,
          resume
        ),
      }),
    }).then((res) => res.json());
    const jobInfo = jobInfoSchema.parse(response);
    updateCoverLetter({ jobInfo });
    setFetchingJobInfo(false);
  };

  const fetchKeywords = async () => {
    setFetchingKeywords(true);
    const response = (await fetch("/api/keywords", {
      method: "POST",
      body: JSON.stringify({
        prompt: addContextToPrompt(
          llmSettings.keywordsPrompt,
          coverLetter,
          resume
        ),
      }),
    }).then((res) => res.json())) as unknown[];
    const keywords = response.map((k) => keywordSchema.parse(k));
    updateCoverLetter({ keywords });
    setFetchingKeywords(false);
  };

  const fetchCoverLetter = async () => {
    setFetchingCoverLetter(true);
    const content = await fetch("/api/cover-letter", {
      method: "POST",
      body: JSON.stringify({
        prompt: addContextToPrompt(
          llmSettings.coverLetterPrompt,
          coverLetter,
          resume
        ),
      }),
    }).then((res) => res.text());
    updateCoverLetter({ content });
    setFetchingCoverLetter(false);
  };

  const deleteCoverLetter = (): string[] => {
    removeCoverLetter();
    return deleteCoverLetterById(id);
  };

  return {
    coverLetter,
    fetchingJobInfo,
    fetchingKeywords,
    fetchingCoverLetter,
    fetchJobInfo,
    fetchKeywords,
    fetchCoverLetter,
    updateCoverLetter,
    deleteCoverLetter,
  };
};
