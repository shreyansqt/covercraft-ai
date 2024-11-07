"use client";

import { useCoverLetter } from "@/hooks/use-cover-letter";
import { Trash } from "@phosphor-icons/react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
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
    <SidebarMenuItem key={coverLetter.id} className="relative group/item">
      <SidebarMenuButton
        isActive={isActive}
        asChild
        className="items-start p-4 h-auto leading-none"
      >
        <Link href={href} className="flex flex-col gap-0.5">
          <strong className="font-semibold">
            {coverLetter.roleName || "Unknown role"}
          </strong>
          <span className="text-muted-foreground text-xs">
            {coverLetter.companyName || "Unknown company"}
          </span>
        </Link>
      </SidebarMenuButton>
      <Button
        variant="ghost"
        size="sm"
        className="top-1/2 right-2 absolute hover:bg-background opacity-0 group-hover/item:opacity-100 transition-opacity -translate-y-1/2 size-8"
        onClick={onDelete}
      >
        <Trash className="w-4 h-4" weight="duotone" />
      </Button>
    </SidebarMenuItem>
  );
};
