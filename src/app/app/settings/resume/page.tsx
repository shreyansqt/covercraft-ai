"use client";
import { Header } from "@/components/header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useResume } from "@/hooks/use-resume";

export default function ResumePage() {
  const { resume, setResume } = useResume();

  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setResume(newContent);
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
          value={resume}
          onChange={handleResumeChange}
          placeholder="Paste your resume content here..."
        />
      </div>
    </div>
  );
}
