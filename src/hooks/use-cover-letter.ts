"use client";

import { useCallback } from "react";
import { useLocalStorage } from "usehooks-ts";
import { CoverLetter } from "../types";
import { useCoverLetters } from "./use-cover-letters";

export const useCoverLetter = (id: string) => {
  const { deleteCoverLetterById } = useCoverLetters();
  const [coverLetter, setCoverLetter, removeCoverLetter] =
    useLocalStorage<CoverLetter>(`cover-letter-${id}`, {
      id,
      keywords: [],
      selectedKeywords: [],
      currentStep: "job-description",
    });

  const updateCoverLetter = useCallback(
    (updates: Partial<CoverLetter>) => {
      setCoverLetter({ ...coverLetter, ...updates });
    },
    [coverLetter, setCoverLetter]
  );

  const deleteCoverLetter = () => {
    removeCoverLetter();
    deleteCoverLetterById(id);
  };

  return {
    coverLetter,
    updateCoverLetter,
    deleteCoverLetter,
  };
};
