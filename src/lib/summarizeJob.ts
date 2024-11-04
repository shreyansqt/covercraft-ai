import { type CoverLetter, type Keyword } from "@/types";
import OpenAI from "openai";
import { jobSummarySchema } from "./jobSummarySchema";

type JobSummary = {
  keywords: Keyword[];
  roleName: string;
  companyName: string;
};

export const summarizeJob = async (
  coverLetter: CoverLetter,
  apiKey: string
): Promise<JobSummary> => {
  const openai = new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true,
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
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.7,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      response_format: {
        type: "json_schema",
        json_schema: jobSummarySchema,
      },
    });

    const response = JSON.parse(
      completion.choices[0].message.content ?? ""
    ) as JobSummary;
    return response;
  } catch (error) {
    console.error("Error extracting keywords:", error);
    throw error;
  }
};
