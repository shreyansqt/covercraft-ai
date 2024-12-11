"use client";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { cn } from "@/lib/utils";
import {
  generateCoverLetter,
  updateCoverLetter,
} from "@/services/cover-letter";
import type { TypedCoverLetter } from "@/types";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";
import { RichTextEditor } from "../rich-text-editor";
import { Button } from "../ui/button";
import { DownloadForm } from "./download-form";

export const StepReview = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const { llmSettings } = useLLMSettings();
  const [isLoading, setIsLoading] = useState(false);

  const generate = useCallback(async () => {
    setIsLoading(true);
    await generateCoverLetter(coverLetter.id, llmSettings.coverLetterPrompt);
    setIsLoading(false);
  }, [generateCoverLetter]);

  useEffect(() => {
    if (!coverLetter.content) {
      generate();
    }
  }, [generate, coverLetter.content]);

  const handleBlur = (value: string) => {
    if (value === coverLetter.content) return;
    updateCoverLetter(coverLetter.id, {
      content: value,
    });
  };

  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      <div className="flex justify-between items-center">
        <Label htmlFor="coverLetter">Generated Cover Letter</Label>

        <div className="flex items-center gap-2">
          <DownloadForm coverLetter={coverLetter} />
          <Button
            variant="outline"
            size="sm"
            onClick={generate}
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
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="flex flex-col flex-1">
          <RichTextEditor
            value={coverLetter.content || ""}
            onBlur={handleBlur}
          />
        </div>
      )}
    </div>
  );
};
