"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "usehooks-ts";

export default function ResumePage() {
  const [resumeContent, setResumeContent] = useLocalStorage("resume", "");

  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setResumeContent(newContent);
  };

  return (
    <div className="flex flex-col p-6 h-full">
      <Label className="mb-2 text-xl">Paste Your Resume</Label>
      <Textarea
        className="flex-1 resize-none"
        value={resumeContent}
        onChange={handleResumeChange}
        placeholder="Paste your resume content here..."
      />
    </div>
  );
}
