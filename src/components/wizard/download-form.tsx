import type { CoverLetter } from "@/types";
import { Download, SpinnerGap } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export const DownloadForm = ({ coverLetter }: { coverLetter: CoverLetter }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileName, setFileName] = useLocalStorage(
    "cover-letter-file-name",
    `${coverLetter.jobInfo?.companyName} - ${coverLetter.jobInfo?.roleName} Cover Letter`
  );

  const handleGeneratePDF = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/pdf", {
      method: "POST",
      body: JSON.stringify({ content: coverLetter.content, fileName }),
    });
    // console.log(await response.json());
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    // Create a temporary link and click it to download the file
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();

    // Revoke the object URL after download
    window.URL.revokeObjectURL(url);
    setIsLoading(false);
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleGeneratePDF}>
      <Label htmlFor="fileName" className="text-nowrap text-sm">
        File Name
      </Label>
      <Input
        id="fileName"
        type="text"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Enter a file name"
        className="w-[300px]"
      />
      <Button type="submit" className="ml-auto" disabled={isLoading} size="sm">
        {isLoading ? (
          <SpinnerGap className="animate-spin size-4" />
        ) : (
          <Download className="size-4" weight="duotone" />
        )}
        {isLoading ? "Generating PDF..." : "Download PDF"}
      </Button>
    </form>
  );
};
