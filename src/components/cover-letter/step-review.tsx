"use client";
import { generateCoverLetter } from "@/lib/generateCoverLetter";
import { Label } from "@radix-ui/react-label";
import { RefreshCcw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import type { StepComponentProps } from "./types";

export const StepReview = ({ coverLetter, onUpdate }: StepComponentProps) => {
  const [apiKey] = useLocalStorage("apiKey", "");
  const [resume] = useLocalStorage("resume", "");
  const [isLoading, setIsLoading] = useState(false);

  const generate = useCallback(async () => {
    setIsLoading(true);
    const content = await generateCoverLetter(coverLetter, resume, apiKey);
    onUpdate({
      content,
    });
    setIsLoading(false);
  }, [coverLetter, resume, apiKey, onUpdate]);

  useEffect(() => {
    if (!coverLetter.content) {
      generate();
    }
  }, [generate, coverLetter.content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      content: e.target.value,
    });
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex justify-between items-center">
        <Label htmlFor="coverLetter">Generated Cover Letter</Label>
        <Button
          variant="outline"
          onClick={generate}
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
        <Textarea
          id="coverLetter"
          value={coverLetter.content}
          onChange={handleChange}
          className="flex-1 resize-none"
        />
      )}
    </div>
  );
};
