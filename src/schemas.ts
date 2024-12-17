import { z } from "zod";

export const jobInfoSchema = z.object({
  roleName: z
    .string()
    .describe("Job title/role name, could be found in job description"),
  companyName: z
    .string()
    .describe(
      "Company name, could be found in job description and/or company info"
    ),
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "Estimated match score based on job description, company info and resume, try to based in on no. of matching keywords"
    ),
});

export const keywordSchema = z.object({
  name: z.string(),
  category: z.string(),
  selected: z.boolean().optional(),
});

export const chatMessageSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  content: z.string(),
  role: z.enum(["function", "user", "data", "assistant", "system", "tool"]),
});
