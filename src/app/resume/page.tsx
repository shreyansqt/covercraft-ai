"use client";
import { useLocalStorage } from "usehooks-ts";

export default function ResumePage() {
  const [resumeContent, setResumeContent] = useLocalStorage("resume", "");

  const handleResumeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setResumeContent(newContent);
  };

  return (
    <div className="flex flex-col flex-1 p-4 h-full">
      <h1 className="mb-4 font-bold text-2xl">Paste Your Resume</h1>
      <textarea
        className="flex-1 p-4 border rounded-lg w-full h-96 resize-none"
        value={resumeContent}
        onChange={handleResumeChange}
        placeholder="Paste your resume content here..."
      />
    </div>
  );
}
