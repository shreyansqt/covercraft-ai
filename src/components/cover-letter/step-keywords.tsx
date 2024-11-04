"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { summarizeJob } from "@/lib/summarizeJob";
import type { Keyword } from "@/types";
import { Label } from "@radix-ui/react-label";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";

export const StepKeywords = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey] = useLocalStorage("apiKey", "");
  const fetchKeywords = async () => {
    if (coverLetter.jobDescription === "" || coverLetter.companyInfo === "")
      return;
    setIsLoading(true);
    const { roleName, companyName, keywords } = await summarizeJob(
      coverLetter,
      apiKey
    );
    updateCoverLetter({
      roleName,
      companyName,
      keywords,
    });
    setIsLoading(false);
  };

  useEffect(() => {
    updateCoverLetter({
      currentStep: "keywords",
    });
    if (coverLetter.keywords.length === 0) {
      fetchKeywords();
    }
  }, []);

  const keywordCategoryMap = new Map<string, Keyword[]>();
  for (const keyword of coverLetter.keywords) {
    keywordCategoryMap.set(keyword.category, [
      ...(keywordCategoryMap.get(keyword.category) || []),
      keyword,
    ]);
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between">
        <Label className="font-bold text-2xl">Keywords</Label>
        <Button
          variant="outline"
          onClick={fetchKeywords}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Regenerate
        </Button>
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-2">
          {Array.from(keywordCategoryMap.entries()).map(
            ([category, keywords], index) => (
              <div key={index} className="flex flex-col items-start mt-4">
                <h3 className="font-bold text-xl">{category}</h3>
                {keywords.map((keyword, index) => (
                  <Label
                    key={index}
                    className="inline-flex items-center gap-2 mt-2 cursor-pointer"
                  >
                    <Checkbox
                      id={keyword.keyword}
                      checked={keyword.selected}
                      onCheckedChange={(checked) => {
                        if (typeof checked === "boolean") {
                          updateCoverLetter({
                            keywords: coverLetter.keywords.map((k) =>
                              k.keyword === keyword.keyword
                                ? { ...k, selected: checked }
                                : k
                            ),
                          });
                        }
                      }}
                    />
                    <span>{keyword.keyword}</span>
                  </Label>
                ))}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};
