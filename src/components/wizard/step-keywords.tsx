"use client";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { cn } from "@/lib/utils";
import { generateKeywords, updateCoverLetter } from "@/services/cover-letter";
import type { Keyword as TKeyword, TypedCoverLetter } from "@/types";
import { ArrowsClockwise, Spinner } from "@phosphor-icons/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";
import { Keyword } from "../keyword";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const StepKeywords = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const router = useRouter();
  const { llmSettings } = useLLMSettings();

  const [isLoading, startTransition] = useTransition();

  const generate = useCallback(async () => {
    startTransition(async () => {
      await generateKeywords(coverLetter.id, llmSettings.keywordsPrompt);
      router.refresh();
    });
  }, [coverLetter.id, llmSettings.keywordsPrompt, router]);

  useEffect(() => {
    if (coverLetter.keywords.length === 0) {
      generate();
    }
  }, [generate, coverLetter.keywords.length]);

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
    router.refresh();
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
        <div className="flex items-center gap-2">
          <Label>Select Relevant Keywords</Label>
          {isLoading && <Spinner className="animate-spin" />}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={generate}
          className="flex items-center gap-2"
          disabled={isLoading}
        >
          <ArrowsClockwise
            className={cn("w-4 h-4", isLoading && "animate-spin")}
            weight="duotone"
          />
          {isLoading ? "Regenerating..." : "Regenerate"}
        </Button>
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
