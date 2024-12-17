"use client";
import { deleteCoverLetter } from "@/services/cover-letter";
import type { TypedCoverLetter } from "@/types";
import { Trash } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import { AppHeader } from "../app-header";
import { Button } from "../ui/button";

export const CoverLetterHeader = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const router = useRouter();
  const onDelete = async () => {
    await deleteCoverLetter(coverLetter.id);
    router.refresh();
  };
  return (
    <AppHeader>
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-semibold text-2xl">
            {coverLetter.jobInfo?.roleName || "Unknown role"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {coverLetter.jobInfo?.companyName || "Unknown company"}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {coverLetter.jobInfo?.matchScore && (
            <p className="font-bold text-muted-foreground text-xl">
              {coverLetter.jobInfo.matchScore}% match
            </p>
          )}
          <Button onClick={onDelete} variant="outline" size="icon">
            <Trash className="size-4" weight="duotone" />
          </Button>
        </div>
      </div>
    </AppHeader>
  );
};
