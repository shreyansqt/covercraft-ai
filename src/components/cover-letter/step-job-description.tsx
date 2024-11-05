import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import type { StepComponentProps } from "./types";

export const StepJobDescription = ({
  coverLetter,
  onUpdate,
}: StepComponentProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      jobDescription: e.target.value,
    });
  };
  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <Label htmlFor="jobDescription">Enter Job Description</Label>
      <Textarea
        id="jobDescription"
        placeholder="Paste the job description here..."
        value={coverLetter.jobDescription}
        onChange={handleChange}
        className="flex-1 resize-none"
      />
    </div>
  );
};
