"use client";

import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Header } from "../header";

export const CoverLetterHeader = ({ id }: { id: string }) => {
  const { coverLetter } = useCoverLetter(id);
  return (
    <Header>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-2xl">
            {coverLetter.jobInfo?.roleName || "Unknown role"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {coverLetter.jobInfo?.companyName || "Unknown company"}
          </p>
        </div>
        {coverLetter.jobInfo?.matchScore && (
          <p className="font-bold text-muted-foreground text-xl">
            {coverLetter.jobInfo.matchScore}% match
          </p>
        )}
      </div>
    </Header>
  );
};
