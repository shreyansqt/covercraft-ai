"use client";

import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CoverLetter } from "../types";
import { addContextToPrompt } from "../utils/addContextToPrompt";
import { useCoverLetters } from "./use-cover-letters";
import { useLLMSettings } from "./use-llm-settings";
import { useResume } from "./use-resume";
import { Step } from "./use-step";

export const useCoverLetter = (id: string) => {
  const { llmSettings } = useLLMSettings();
  const { resume } = useResume();

  const { deleteCoverLetterById } = useCoverLetters();
  const [coverLetter, setCoverLetter, removeCoverLetter] =
    useLocalStorage<CoverLetter>(`cover-letter-${id}`, {
      id,
      keywords: [],
      currentStep: Step.JobDescription,
    });

  const updateCoverLetter = useCallback(
    (updates: Partial<CoverLetter> | ((coverLetter: CoverLetter) => void)) => {
      setCoverLetter((coverLetter) => ({
        ...coverLetter,
        ...(typeof updates === "function" ? updates(coverLetter) : updates),
      }));
    },
    [setCoverLetter]
  );

  const fetchJobInfo = () =>
    fetch("/api/job-info", {
      method: "POST",
      body: JSON.stringify({
        prompt: addContextToPrompt(
          llmSettings.jobInfoPrompt,
          coverLetter,
          resume
        ),
      }),
    })
      .then((res) => res.json())
      .then((jobInfo) => {
        updateCoverLetter({
          jobInfo,
        });
      });

  const fetchKeywords = () =>
    fetch("/api/keywords", {
      method: "POST",
      body: JSON.stringify({
        prompt: addContextToPrompt(
          llmSettings.keywordsPrompt,
          coverLetter,
          resume
        ),
      }),
    })
      .then((res) => res.json())
      .then((keywords) => {
        updateCoverLetter({
          keywords,
        });
      });

  const fetchCoverLetter = () =>
    fetch("/api/cover-letter", {
      method: "POST",
      body: JSON.stringify({
        prompt: addContextToPrompt(
          llmSettings.coverLetterPrompt,
          coverLetter,
          resume
        ),
      }),
    })
      .then((res) => res.text())
      .then((text) => {
        updateCoverLetter({
          content: text,
        });
      });

  const deleteCoverLetter = (): string[] => {
    removeCoverLetter();
    return deleteCoverLetterById(id);
  };

  return {
    coverLetter,
    fetchJobInfo,
    fetchKeywords,
    fetchCoverLetter,
    updateCoverLetter,
    deleteCoverLetter,
  };
};
