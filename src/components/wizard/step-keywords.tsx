"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { summarizeJob } from "@/lib/summarizeJob";
import { cn } from "@/lib/utils";
import type { Keyword } from "@/types";
import { ArrowsClockwise, Check, Plus } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";
import { MyBadge } from "../my-badge";
import { Button } from "../ui/button";

export const StepKeywords = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  const [isLoading, setIsLoading] = useState(false);
  const { llmSettings } = useLLMSettings();

  const fetchKeywords = useCallback(async () => {
    if (coverLetter.jobDescription === "" || coverLetter.companyInfo === "")
      return;
    setIsLoading(true);
    const { roleName, companyName, keywords } = await summarizeJob(
      coverLetter,
      llmSettings
    );
    updateCoverLetter({
      roleName,
      companyName,
      keywords,
    });
    setIsLoading(false);
  }, [coverLetter, llmSettings, updateCoverLetter]);

  useEffect(() => {
    if (coverLetter.keywords.length === 0) {
      fetchKeywords();
    }
  }, [fetchKeywords, coverLetter.keywords]);

  const keywordCategoryMap = new Map<string, Keyword[]>();
  for (const keyword of coverLetter.keywords) {
    keywordCategoryMap.set(keyword.category, [
      ...(keywordCategoryMap.get(keyword.category) || []),
      keyword,
    ]);
  }

  const toggleKeywordSelection = (keyword: Keyword) => {
    const index = coverLetter.keywords.findIndex(
      (k) => k.keyword === keyword.keyword
    );
    const newKeyword = { ...keyword, selected: !keyword.selected };
    updateCoverLetter((coverLetter) => {
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
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <ArrowsClockwise
            className={cn("w-4 h-4", isLoading && "animate-spin")}
            weight="duotone"
          />
          {isLoading ? "Regenerating..." : "Regenerate"}
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        Array.from(keywordCategoryMap.entries()).map(
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
                    {keyword.keyword}
                  </MyBadge>
                ))}
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};
