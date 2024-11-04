"use client";

import { Timeline } from "@/components/cover-letter/timeline";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStep } from "@/hooks/use-step";
import { CoverLetter, type Keyword } from "@/types";
import { downloadPDF, generateCoverLetter } from "@/utils/cover-letter-utils";
import { extractKeywords } from "@/utils/extractKeywords";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";

interface CoverLetterWizardProps {
  coverLetter: CoverLetter;
  updateCoverLetter: (updates: Partial<CoverLetter>) => void;
}

export function CoverLetterWizard({
  coverLetter,
  updateCoverLetter,
}: CoverLetterWizardProps) {
  const { selectedKeywords, jobDescription, companyInfo, keywords, content } =
    coverLetter;
  const totalSteps = 5;
  const { currentStep, next, prev } = useStep(totalSteps);
  const [apiKey] = useLocalStorage("apiKey", "");
  const [loading, setLoading] = useState(false);

  const keywordCategoryMap = new Map<string, Keyword[]>();
  for (const keyword of keywords) {
    keywordCategoryMap.set(keyword.category, [
      ...(keywordCategoryMap.get(keyword.category) || []),
      keyword,
    ]);
  }

  const handleNext = async () => {
    if (currentStep === 2) {
      if (!jobDescription || !companyInfo) return;
      if (keywords.length > 0) {
        next();
        return;
      }
      setLoading(true);
      const extractedKeywords = await extractKeywords(
        jobDescription,
        companyInfo,
        apiKey
      );
      updateCoverLetter({ keywords: extractedKeywords });
      setLoading(false);
    } else if (currentStep === 3) {
      if (!jobDescription || !companyInfo || !selectedKeywords) return;
      const generatedCoverLetter = generateCoverLetter(
        jobDescription,
        companyInfo,
        selectedKeywords
      );
      updateCoverLetter({ content: generatedCoverLetter });
    }
    next();
  };

  return (
    <div className="mx-auto max-w-full">
      <Timeline currentStep={currentStep} totalSteps={totalSteps} />

      {currentStep === 1 && (
        <div className="space-y-4">
          <Label htmlFor="jobDescription">Job Description</Label>
          <Textarea
            id="jobDescription"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) =>
              updateCoverLetter({
                jobDescription: e.target.value,
              })
            }
            className="min-h-[200px]"
          />
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <Label htmlFor="companyInfo">Company Information</Label>
          <Textarea
            id="companyInfo"
            placeholder="Paste information from the company's about and careers page..."
            value={companyInfo}
            onChange={(e) =>
              updateCoverLetter({
                companyInfo: e.target.value,
              })
            }
            className="min-h-[200px]"
          />
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <Label className="font-bold text-2xl">Keywords</Label>
          <div className="space-y-2">
            {Array.from(keywordCategoryMap.entries()).map(
              ([category, keywords], index) => (
                <div key={index}>
                  <h3 className="font-bold text-lg">{category}</h3>
                  {keywords.map((keyword, index) => (
                    <div key={index}>{keyword.keyword}</div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <Label htmlFor="coverLetter">Generated Cover Letter</Label>
          <Textarea
            id="coverLetter"
            value={content}
            onChange={(e) =>
              updateCoverLetter({
                content: e.target.value,
              })
            }
            className="min-h-[400px]"
          />
        </div>
      )}

      {currentStep === 5 && (
        <div className="space-y-4">
          <Label>Your cover letter is ready!</Label>
          <p>Click the button below to download your cover letter as a PDF.</p>
        </div>
      )}

      <div className="flex mt-8">
        {currentStep > 1 && (
          <Button onClick={prev} variant="outline">
            Previous
          </Button>
        )}
        {currentStep < totalSteps ? (
          <Button onClick={handleNext} disabled={loading} className="ml-auto">
            {loading ? "Generating..." : "Next"}
          </Button>
        ) : (
          <Button
            onClick={() => content && downloadPDF(content)}
            className="ml-auto"
          >
            Download PDF
          </Button>
        )}
      </div>
    </div>
  );
}
