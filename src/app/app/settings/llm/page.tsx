"use client";
import { Header } from "@/components/header";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLLMSettings } from "@/hooks/use-llm-settings";

export default function LLMSettingsPage() {
  const { llmSettings, setLLMSettings } = useLLMSettings();
  return (
    <div className="flex flex-col h-full">
      <Header>
        <h1 className="font-semibold text-2xl">LLM Settings</h1>
      </Header>

      <div className="flex flex-col flex-1 p-6">
        <Label htmlFor="apiKey">OpenAI API Key</Label>
        <Input
          id="apiKey"
          type="password"
          placeholder="OpenAI API Key"
          className="mt-2"
          value={llmSettings.apiKey}
          onChange={(e) =>
            setLLMSettings({ ...llmSettings, apiKey: e.target.value })
          }
        />

        <Label htmlFor="processJobDescriptionPrompt" className="mt-4">
          Process Job Description Prompt
        </Label>
        <Textarea
          id="jobMatchPrompt"
          value={llmSettings.processJobDescriptionPrompt}
          className="flex-1 mt-2 resize-none"
          onChange={(e) =>
            setLLMSettings({
              ...llmSettings,
              processJobDescriptionPrompt: e.target.value,
            })
          }
        />

        <Label htmlFor="jobSummaryPrompt" className="mt-4">
          Job Summary Prompt
        </Label>
        <Textarea
          id="jobSummaryPrompt"
          value={llmSettings.jobSummaryPrompt}
          className="flex-1 mt-2 resize-none"
          onChange={(e) =>
            setLLMSettings({ ...llmSettings, jobSummaryPrompt: e.target.value })
          }
        />

        <Label htmlFor="coverLetterPrompt" className="mt-4">
          Cover Letter Prompt
        </Label>
        <Textarea
          id="coverLetterPrompt"
          value={llmSettings.coverLetterPrompt}
          className="flex-1 mt-2 resize-none"
          onChange={(e) =>
            setLLMSettings({
              ...llmSettings,
              coverLetterPrompt: e.target.value,
            })
          }
        />
      </div>
    </div>
  );
}
