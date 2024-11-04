import { type CoverLetter } from "@/types";
import { createOpenAI } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

const schema = z.object({
  roleName: z.string(),
  companyName: z.string(),
  keywords: z.array(
    z.object({
      keyword: z.string(),
      category: z.string(),
    })
  ),
});

type JobSummary = z.infer<typeof schema>;

export const summarizeJob = async (
  coverLetter: CoverLetter,
  apiKey: string
): Promise<JobSummary> => {
  const openai = createOpenAI({
    apiKey,
  });

  const prompt = `Provide structured data based on the following job description and company info. Respond in JSON format:
  roleName: (job title/role name)
  companyName: (company name)
  keywords: (list of keywords, each between 1-3 words with following categories)
    - Company Values
    - Key Responsibilities
    - Technical Requirements
    - Leadership Skills
    - Soft Skills

Job Description:
${coverLetter.jobDescription}

Company Info:
${coverLetter.companyInfo}`;

  try {
    const result = await generateObject({
      model: openai("gpt-4o", { structuredOutputs: true }),
      schemaName: "jobSummary",
      schemaDescription:
        "Structured data based on the following job description and company info",
      schema,
      prompt,
    });

    return result.object;
  } catch (error) {
    console.error("Error extracting keywords:", error);
    throw error;
  }
};
