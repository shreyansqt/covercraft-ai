"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { generateCoverLetter } from "@/lib/generateCoverLetter";
import { Label } from "@radix-ui/react-label";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

export const StepReview = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  const [apiKey] = useLocalStorage("apiKey", "");
  const [resume] = useLocalStorage("resume", "");
  const [isLoading, setIsLoading] = useState(false);

  const generate = async () => {
    setIsLoading(true);
    const content = await generateCoverLetter(coverLetter, resume, apiKey);
    updateCoverLetter({
      content,
    });
    setIsLoading(false);
  };
  useEffect(() => {
    updateCoverLetter({
      currentStep: "review",
    });
    if (!coverLetter.content) {
      generate();
    }
  }, []);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateCoverLetter({
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
