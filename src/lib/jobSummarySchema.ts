import { type OpenAI } from "openai";

const StringType = {
  type: "string",
};

const NumberType = {
  type: "number",
};

const ArrayType = (items: object) => ({
  type: "array",
  items,
});

const ObjectType = (properties: object) => ({
  type: "object",
  properties,
  additionalProperties: false,
  required: Object.keys(properties),
});

export const jobSummarySchema: OpenAI.ResponseFormatJSONSchema["JSONSchema"] = {
  name: "jobSummary",
  description:
    "Structured data based on the following job description and company info",
  strict: true,
  schema: ObjectType({
    roleName: StringType,
    companyName: StringType,
    keywords: ArrayType(
      ObjectType({
        keyword: StringType,
        category: StringType,
      })
    ),
  }),
};
