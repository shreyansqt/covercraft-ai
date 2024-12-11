"use client";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import {
  generateCoverLetter,
  updateCoverLetter,
} from "@/services/cover-letter";
import type { TypedCoverLetter } from "@/types";
import { ArrowsClockwise, Spinner } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { RichTextEditor } from "../rich-text-editor";
import { Button } from "../ui/button";
import { DownloadForm } from "./download-form";

export const StepReview = ({
  coverLetter,
}: {
  coverLetter: TypedCoverLetter;
}) => {
  const router = useRouter();
  const { llmSettings } = useLLMSettings();
  const [isLoading, setIsLoading] = useState(false);

  const generate = useCallback(async () => {
    setIsLoading(true);
    await generateCoverLetter(coverLetter.id, llmSettings.coverLetterPrompt);
    setIsLoading(false);
    router.refresh();
  }, [llmSettings.coverLetterPrompt, coverLetter.id, router]);

  useEffect(() => {
    if (!coverLetter.content) {
      generate();
    }
  }, [generate, coverLetter.content]);

  const handleBlur = async (value: string) => {
    if (value === coverLetter.content) return;
    await updateCoverLetter(coverLetter.id, {
      content: value,
    });
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-4 p-6 h-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Label htmlFor="coverLetter">Generated Cover Letter</Label>
          {isLoading && <Spinner className="animate-spin" />}
        </div>

        <div className="flex items-center gap-2">
          <DownloadForm coverLetter={coverLetter} disabled={isLoading} />
          <Button
            variant="outline"
            size="sm"
            onClick={generate}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <ArrowsClockwise weight="duotone" />
            Regenerate
          </Button>
        </div>
      </div>
      {coverLetter.content && (
        <RichTextEditor
          value={coverLetter.content}
          onBlur={handleBlur}
          disabled={isLoading}
          className="flex-1"
        />
      )}
    </div>
  );
};
