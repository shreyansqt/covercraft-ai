"use client";
import { AppHeader } from "@/components/app-header";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import type { LLMSettings } from "@/types";

export default function LLMSettingsPage() {
  const { llmSettings, setLLMSettings } = useLLMSettings();
  return (
    <div className="flex flex-col h-full">
      <AppHeader>
        <h1 className="font-semibold text-2xl">Prompts</h1>
      </AppHeader>

      {Object.keys(llmSettings).map((key) => (
        <div className="flex flex-col flex-1 px-6 py-4" key={key}>
          <Label htmlFor={key}>
            {key
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())}
          </Label>
          <Textarea
            id={key}
            value={llmSettings[key as keyof LLMSettings]}
            className="flex-1 mt-2 resize-none"
            onChange={(e) =>
              setLLMSettings({
                ...llmSettings,
                [key]: e.target.value,
              })
            }
          />
        </div>
      ))}
    </div>
  );
}
