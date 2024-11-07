"use client";
import { Header } from "@/components/header";
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
    <div className="flex flex-col h-full">
      <Header>
        <h1 className="font-semibold text-2xl">Resume</h1>
      </Header>
      <div className="flex flex-col flex-1 p-6">
        <Label htmlFor="resume" className="mb-2">
          Resume content
        </Label>
        <Textarea
          id="resume"
          className="flex-1 resize-none"
          value={resumeContent}
          onChange={handleResumeChange}
          placeholder="Paste your resume content here..."
        />
      </div>
    </div>
  );
}
