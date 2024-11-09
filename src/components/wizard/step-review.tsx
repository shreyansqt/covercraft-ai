"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { useResume } from "@/hooks/use-resume";
import { generateCoverLetter } from "@/lib/generateCoverLetter";
import { cn } from "@/lib/utils";
import { ArrowsClockwise } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useCallback, useEffect, useState } from "react";
import { RichTextEditor } from "../rich-text-editor";
import { Button } from "../ui/button";
import { DownloadForm } from "./download-form";

export const StepReview = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  const { resume } = useResume();
  const { llmSettings } = useLLMSettings();
  const [isLoading, setIsLoading] = useState(false);

  const generate = useCallback(async () => {
    setIsLoading(true);
    const content = await generateCoverLetter(coverLetter, resume, llmSettings);
    updateCoverLetter({
      content,
    });
    setIsLoading(false);
  }, [coverLetter, resume, llmSettings, updateCoverLetter]);

  useEffect(() => {
    if (!coverLetter.content) {
      generate();
    }
  }, [generate, coverLetter.content]);

  const handleChange = (value: string) => {
    onUpdate({
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
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};
