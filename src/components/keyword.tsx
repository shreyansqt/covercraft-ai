"use client";

import type { Keyword as TKeyword } from "@/types";
import { Check, Plus } from "@phosphor-icons/react";
import { MyBadge } from "./my-badge";

export const Keyword = ({
  keyword,
  onClick,
}: {
  keyword: TKeyword;
  onClick: () => void;
}) => {
  return (
    <MyBadge
      variant={keyword.selected ? "default" : "outline"}
      className="font-normal cursor-pointer"
      onClick={onClick}
    >
      {keyword.selected ? (
        <Check className="size-3.5" />
      ) : (
        <Plus className="size-3.5" />
      )}
      {keyword.name}
    </MyBadge>
  );
};
