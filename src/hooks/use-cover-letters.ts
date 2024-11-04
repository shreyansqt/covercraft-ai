"use client";

import { useLocalStorage } from "usehooks-ts";

export const useCoverLetters = () => {
  const [coverLetterIds, setCoverLetterIds] = useLocalStorage<string[]>(
    "cover-letters",
    []
  );

  const createCoverLetter = () => {
    const newCoverLetterId = Date.now().toString();
    setCoverLetterIds([newCoverLetterId, ...coverLetterIds]);
    return newCoverLetterId;
  };

  const deleteCoverLetterById = (id: string) => {
    setCoverLetterIds(coverLetterIds.filter((clId) => clId !== id));
    localStorage.removeItem(`cover-letter-${id}`);
  };

  return {
    coverLetterIds,
    createCoverLetter,
    deleteCoverLetterById,
  };
};
