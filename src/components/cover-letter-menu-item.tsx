"use client";
import { getCurrentStepPath } from "@/lib/steps";
import type { TypedCoverLetter } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MyBadge } from "./my-badge";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export const CoverLetterMenuItem = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const href = getCurrentStepPath(coverLetter);
  const params = useParams();
  const isActive = params.id === coverLetter.id;

  return (
    <SidebarMenuItem key={coverLetter.id} className="relative group/item">
      <SidebarMenuButton
        isActive={isActive}
        asChild
        className="items-start h-auto leading-none"
      >
        <Link href={href} className="flex flex-col items-stretch gap-0.5 p-4">
          <strong className="font-semibold" suppressHydrationWarning>
            {coverLetter.jobInfo?.roleName || "Unknown role"}
          </strong>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-xs">
              {coverLetter.jobInfo?.companyName || "Unknown company"}
            </span>
            {coverLetter.jobInfo?.matchScore !== undefined && (
              <MyBadge variant="secondary" size="sm">
                {coverLetter.jobInfo?.matchScore}% match
              </MyBadge>
            )}
          </div>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

export default CoverLetterMenuItem;
