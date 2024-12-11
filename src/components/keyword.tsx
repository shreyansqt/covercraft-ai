"use client";

import type { Keyword as TKeyword } from "@/types";
import { Check, Plus } from "@phosphor-icons/react";
import { useOptimistic, useTransition } from "react";
import { MyBadge } from "./my-badge";

export const Keyword = ({
  keyword,
  updateKeyword,
}: {
  keyword: TKeyword;
  updateKeyword: (keyword: TKeyword) => Promise<void>;
}) => {
  const [, startTransition] = useTransition();
  const [optimisticKeyword, setOptimisticKeyword] = useOptimistic(keyword);

  const handleClick = () => {
    startTransition(() => {
      const newKeyword = { ...keyword, selected: !keyword.selected };
      setOptimisticKeyword(newKeyword);
      updateKeyword(newKeyword);
    });
  };

  return (
    <MyBadge
      variant={optimisticKeyword.selected ? "default" : "outline"}
      onClick={handleClick}
    >
      {optimisticKeyword.selected ? (
        <Check className="size-3.5" />
      ) : (
        <Plus className="size-3.5" />
      )}
      {optimisticKeyword.name}
    </MyBadge>
  );
};
