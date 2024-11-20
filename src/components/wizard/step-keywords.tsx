"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { cn } from "@/lib/utils";
import type { SelectedKeyword } from "@/types";
import { ArrowsClockwise, Check, Plus } from "@phosphor-icons/react";
import { useEffect } from "react";
import { MyBadge } from "../my-badge";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const StepKeywords = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter, fetchKeywords, fetchingKeywords } =
    useCoverLetter(id);

  const keywordCategoryMap = new Map<string, SelectedKeyword[]>();

  useEffect(() => {
    if (!coverLetter.keywords || coverLetter.keywords.length === 0) {
      fetchKeywords();
    }
  }, [coverLetter.keywords, fetchKeywords]);

  if (!coverLetter.keywords) return null;

  for (const keyword of coverLetter.keywords) {
    keywordCategoryMap.set(keyword.category, [
      ...(keywordCategoryMap.get(keyword.category) || []),
      keyword,
    ]);
  }

  const toggleKeywordSelection = (keyword: SelectedKeyword) => {
    if (!coverLetter.keywords) return;
    const index = coverLetter.keywords.findIndex(
      (k) => k.name === keyword.name
    );
    const newKeyword = { ...keyword, selected: !keyword.selected };
    updateCoverLetter((coverLetter) => {
      if (!coverLetter.keywords) return coverLetter;
      const keywords = [...coverLetter.keywords];
      keywords[index] = newKeyword;
      return { keywords };
    });
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <Label>Select Relevant Keywords</Label>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchKeywords}
          className="flex items-center gap-2"
          disabled={fetchingKeywords}
        >
          <ArrowsClockwise
            className={cn("w-4 h-4", fetchingKeywords && "animate-spin")}
            weight="duotone"
          />
          {fetchingKeywords ? "Regenerating..." : "Regenerate"}
        </Button>
      </div>
      {Array.from(keywordCategoryMap.entries()).map(
        ([category, keywords], index) => (
          <div key={index} className="mb-4">
            <h3 className="mb-2 text-sm">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <MyBadge
                  key={index}
                  variant={keyword.selected ? "default" : "outline"}
                  onClick={() => {
                    toggleKeywordSelection(keyword);
                  }}
                >
                  {keyword.selected ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Plus className="size-3.5" />
                  )}
                  {keyword.name}
                </MyBadge>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
