"use client";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { goToNextStep, Step } from "@/lib/steps";
import { cn } from "@/lib/utils";
import { generateKeywords, updateCoverLetter } from "@/services/cover-letter";
import type { Keyword as TKeyword, TypedCoverLetter } from "@/types";
import { ArrowsClockwise, Spinner } from "@phosphor-icons/react";
import Form from "next/form";
import {
  useActionState,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { Keyword } from "../keyword";
import { Button } from "../ui/button";
import { Label } from "../ui/label";

export const StepKeywords = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const { llmSettings } = useLLMSettings();

  const [keywords, setKeywords] = useState<TKeyword[]>(coverLetter.keywords);
  const [isLoading, startTransition] = useTransition();

  const generate = useCallback(async () => {
    startTransition(async () => {
      const newKeywords = await generateKeywords(
        coverLetter.id,
        llmSettings.keywordsPrompt
      );
      setKeywords(newKeywords);
    });
  }, [coverLetter.id, llmSettings.keywordsPrompt]);

  useEffect(() => {
    if (coverLetter.keywords.length === 0) {
      generate();
    }
  }, [generate, coverLetter.keywords.length]);

  const handleKeywordClick = (keyword: TKeyword) => {
    setKeywords((keywords) => {
      const newKeywords = [...keywords];
      const index = newKeywords.findIndex((k) => k.name === keyword.name);
      newKeywords[index] = { ...keyword, selected: !keyword.selected };
      return newKeywords;
    });
  };

  const handleSubmit = async () => {
    await updateCoverLetter(coverLetter.id, { keywords });
    goToNextStep(coverLetter.id, Step.Keywords);
  };

  const [, formAction, isPending] = useActionState(handleSubmit, null);

  // create map for rendering keywords in categories
  const keywordCategoryMap = new Map<string, TKeyword[]>();
  for (const keyword of keywords) {
    keywordCategoryMap.set(keyword.category, [
      ...(keywordCategoryMap.get(keyword.category) || []),
      keyword,
    ]);
  }

  return (
    <Form
      action={formAction}
      className="flex flex-col flex-grow overflow-hidden"
    >
      <main className="flex flex-col flex-grow gap-6 p-6 overflow-auto">
        <div className="flex justify-between items-center pb-4">
          <Label className="text-md">Select Relevant Keywords</Label>
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
        <div className="flex flex-col flex-grow">
          {isLoading ? (
            <Spinner size={24} className="m-auto animate-spin" />
          ) : (
            Array.from(keywordCategoryMap.entries()).map(
              ([category, keywords], index) => (
                <div key={index} className="mb-4">
                  <h3 className="mb-2 font-medium text-sm">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {keywords.map((keyword, index) => (
                      <Keyword
                        key={index}
                        keyword={keyword}
                        onClick={() => handleKeywordClick(keyword)}
                      />
                    ))}
                  </div>
                </div>
              )
            )
          )}
        </div>
      </main>

      <footer className="flex mt-auto px-6 py-4 border-t">
        <Button type="submit" className="ml-auto" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner className="animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Save & Proceed</span>
          )}
        </Button>
      </footer>
    </Form>
  );
};
