import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import type { StepComponentProps } from "./types";

export const StepCompanyInfo = ({
  coverLetter,
  onUpdate,
}: StepComponentProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdate({
      companyInfo: e.target.value,
    });
  };
  return (
    <div className="flex flex-col gap-2 p-6 h-full">
      <Label htmlFor="companyInfo">Enter Company Information</Label>
      <Textarea
        id="companyInfo"
        placeholder="Paste information from the company's about and careers page..."
        value={coverLetter.companyInfo}
        onChange={handleChange}
        className="flex-1 resize-none"
      />
    </div>
  );
};
