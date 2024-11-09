"use client";

import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CoverLetter } from "../types";
import { useCoverLetters } from "./use-cover-letters";
import { Step } from "./use-step";

export const useCoverLetter = (id: string) => {
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

  const deleteCoverLetter = (): string[] => {
    removeCoverLetter();
    return deleteCoverLetterById(id);
  };

  return {
    coverLetter,
    updateCoverLetter,
    deleteCoverLetter,
  };
};
