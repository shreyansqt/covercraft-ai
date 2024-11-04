import type { CoverLetter } from "@/types";

export type StepComponentProps = {
  coverLetter: CoverLetter;
  onUpdate: (coverLetter: Partial<CoverLetter>) => void;
};
