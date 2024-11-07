"use client";

import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Header } from "../header";

export const CoverLetterHeader = ({ id }: { id: string }) => {
  const { coverLetter } = useCoverLetter(id);

  return (
    <Header>
      <h1 className="font-semibold text-2xl">
        {coverLetter.roleName || "Unknown role"}
      </h1>
      <h2 className="text-muted-foreground text-sm">
        {coverLetter.companyName || "Unknown company"}
      </h2>
    </Header>
  );
};
