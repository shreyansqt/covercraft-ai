"use client";

import { cn } from "@/lib/utils";
import type { Editor } from "@tiptap/react";
import { LinkIcon, SaveIcon, Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Toggle } from "./ui/toggle";

export const EditorLinkToggle = ({ editor }: { editor: Editor }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const url = formData.get("url") as string;
    if (url === undefined) {
      return;
    }
    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  const handleReset = () => {
    editor.chain().focus().unsetLink().run();
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          aria-label="Link"
          className={cn(editor.isActive("link") && "bg-accent")}
        >
          <LinkIcon className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent side="top" align="center">
        <form
          className="flex items-center gap-2"
          onSubmit={handleSubmit}
          onReset={handleReset}
        >
          <Input
            autoFocus
            type="url"
            placeholder="https://example.com"
            defaultValue={editor.getAttributes("link").href}
            name="url"
          />
          <Button type="submit" variant="ghost" className="size-8">
            <SaveIcon className="size-4" />
          </Button>

          <Button
            type="reset"
            variant="ghost"
            className="size-8"
            disabled={!editor.isActive("link")}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
};
