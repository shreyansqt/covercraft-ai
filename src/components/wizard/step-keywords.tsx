"use client";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { generateKeywords, updateCoverLetter } from "@/services/cover-letter";
import type { Keyword as TKeyword, TypedCoverLetter } from "@/types";
import { useEffect } from "react";
import { Keyword } from "../keyword";
import { Label } from "../ui/label";

export const StepKeywords = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const { llmSettings } = useLLMSettings();

  if (!coverLetter.keywords) return null;

  useEffect(() => {
    if (!coverLetter.keywords || coverLetter.keywords.length === 0) {
      generateKeywords(coverLetter.id, llmSettings.keywordsPrompt);
    }
  }, [coverLetter.keywords, generateKeywords]);

  const updateKeyword = async (newKeyword: TKeyword) => {
    if (!coverLetter.keywords) return;
    const index = coverLetter.keywords.findIndex(
      (k) => k.name === newKeyword.name
    );
    const newKeywords = [...coverLetter.keywords];
    newKeywords[index] = newKeyword;
    await updateCoverLetter(coverLetter.id, {
      keywords: newKeywords,
    });
  };

  // create map for rendering keywords in categories
  const keywordCategoryMap = new Map<string, TKeyword[]>();
  for (const keyword of coverLetter.keywords) {
    keywordCategoryMap.set(keyword.category, [
      ...(keywordCategoryMap.get(keyword.category) || []),
      keyword,
    ]);
  }

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4">
        <Label>Select Relevant Keywords</Label>
        {/* <Button
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
        </Button> */}
      </div>
      {Array.from(keywordCategoryMap.entries()).map(
        ([category, keywords], index) => (
          <div key={index} className="mb-4">
            <h3 className="mb-2 text-sm">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {keywords.map((keyword, index) => (
                <Keyword
                  key={index}
                  keyword={keyword}
                  updateKeyword={updateKeyword}
                />
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
