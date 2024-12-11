"use client";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";
import {
  ListBullets,
  ListNumbers,
  TextB,
  TextItalic,
} from "@phosphor-icons/react";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { EditorLinkToggle } from "./EditorLinkToggle";

export const RichTextEditor = ({
  value,
  onBlur,
  disabled,
  className,
}: {
  value: string;
  onBlur: (value: string) => void;
  disabled?: boolean;
  className?: string;
}) => {
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "h-full w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
      },
    },
    extensions: [
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: "https",
        HTMLAttributes: {
          class: "underline",
        },
      }),
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "mb-2",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal pl-4 mb-2",
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: "list-disc pl-4 mb-2",
          },
        },
      }),
    ],
    content: value,
    onBlur: ({ editor }) => {
      onBlur(editor.getHTML());
    },
    editable: !disabled,
  });

  if (!editor) return null;

  return (
    <div className={cn("flex flex-col", className)}>
      <EditorContent
        editor={editor}
        className="flex-1 h-full"
        disabled={disabled}
      />
      <div className="flex flex-row items-center gap-1 border-input bg-transparent p-1 border rounded-bl-md rounded-br-md">
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <TextB className="size-4" weight="duotone" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <TextItalic className="size-4" weight="duotone" />
        </Toggle>
        <Separator orientation="vertical" className="w-[1px] h-8" />
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          aria-label="Bullet List"
        >
          <ListBullets className="size-4" weight="duotone" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
          aria-label="Ordered List"
        >
          <ListNumbers className="size-4" weight="duotone" />
        </Toggle>
        <EditorLinkToggle editor={editor} />
      </div>
    </div>
  );
};
