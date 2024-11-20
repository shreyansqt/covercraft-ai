"use client";

import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { MyBadge } from "./my-badge";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export const CoverLetterMenuItem = ({ id }: { id: string }) => {
  const params = useParams();
  const router = useRouter();
  const { coverLetter, deleteCoverLetter } = useCoverLetter(id);

  const href = `/app/cover-letter/${coverLetter.id}/${coverLetter.currentStep}`;
  const isActive = params.id === coverLetter.id;

  const onDelete = () => {
    router.push("/app");
    deleteCoverLetter();
  };
  return (
    <ContextMenu>
      <SidebarMenuItem
        key={coverLetter.id}
        className="relative group/item"
        suppressHydrationWarning
      >
        <ContextMenuTrigger>
          <SidebarMenuButton
            isActive={isActive}
            asChild
            className="items-start h-auto leading-none"
            suppressHydrationWarning
          >
            <Link
              href={href}
              className="flex flex-col items-stretch gap-0.5 p-4"
            >
              <strong className="font-semibold" suppressHydrationWarning>
                {coverLetter.jobInfo?.roleName || "Unknown role"}
              </strong>
              <div className="flex justify-between items-center">
                <span
                  className="text-muted-foreground text-xs"
                  suppressHydrationWarning
                >
                  {coverLetter.jobInfo?.companyName || "Unknown company"}
                </span>
                {coverLetter.jobInfo?.matchScore && (
                  <MyBadge
                    variant="secondary"
                    size="sm"
                    suppressHydrationWarning
                  >
                    {coverLetter.jobInfo?.matchScore}% match
                  </MyBadge>
                )}
              </div>
            </Link>
          </SidebarMenuButton>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={onDelete} className="gap-2 cursor-pointer">
            <Trash className="size-4" weight="duotone" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </SidebarMenuItem>
    </ContextMenu>
  );
};

export default CoverLetterMenuItem;
