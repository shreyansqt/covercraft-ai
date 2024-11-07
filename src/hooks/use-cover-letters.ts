"use client";

import { useLocalStorage } from "usehooks-ts";

export const useCoverLetters = () => {
  const [coverLetterIds, setCoverLetterIds] = useLocalStorage<string[]>(
    "cover-letters",
    []
  );

  const createCoverLetter = () => {
    const newCoverLetterId = crypto.randomUUID();
    setCoverLetterIds([newCoverLetterId, ...coverLetterIds]);
    return newCoverLetterId;
  };

  const deleteCoverLetterById = (id: string): string[] => {
    const newCoverLetterIds = coverLetterIds.filter((clId) => clId !== id);
    setCoverLetterIds(newCoverLetterIds);
    return newCoverLetterIds;
  };

  return {
    coverLetterIds,
    createCoverLetter,
    deleteCoverLetterById,
  };
};
