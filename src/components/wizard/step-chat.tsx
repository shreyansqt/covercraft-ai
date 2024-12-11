"use client";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import type { TypedCoverLetter } from "@/types";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChat, type Message } from "ai/react";
import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Button } from "../ui/button";
import { ChatBubble, ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { Textarea } from "../ui/textarea";

const StepChat = ({ coverLetter }: { coverLetter: TypedCoverLetter }) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { llmSettings } = useLLMSettings();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    id: coverLetter.id,
    initialMessages: [...(coverLetter.chat || [])],
    body: {
      coverLetterId: coverLetter.id,
      chatPrompt: llmSettings.chatPrompt,
    },
    keepLastMessageOnError: true,
  });

  // Scroll to the bottom of the chat when the messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col pb-4 h-full">
      <ChatMessageList className="flex-grow" ref={scrollAreaRef}>
        <ChatBubble variant="received">
          <ChatBubbleMessage variant="received" className="prose">
            <Markdown>
              {`Hello! I am your cover letter assistant. Ask me anything about the role of **${
                coverLetter.jobInfo?.roleName ?? "unknown"
              }** at **${
                coverLetter.jobInfo?.companyName ?? "unknown"
              }**. I can also answer questions about your experience based on your resume.`}
            </Markdown>
          </ChatBubbleMessage>
        </ChatBubble>
        {messages.map((message: Message) => {
          const variant =
            message.role === "user"
              ? "sent"
              : message.role === "assistant"
              ? "received"
              : null;
          return (
            <ChatBubble variant={variant} key={message.id}>
              <ChatBubbleMessage variant={variant} className="prose">
                <Markdown
                  components={{
                    a: ({ href, children }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {children}
                      </a>
                    ),
                  }}
                >
                  {message.content}
                </Markdown>
              </ChatBubbleMessage>
            </ChatBubble>
          );
        })}
      </ChatMessageList>

      <form
        className="relative px-4"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Textarea
          placeholder="Type your message here..."
          className="bg-background shadow-none p-3 rounded-xl min-h-24 resize-none"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit();
            }
          }}
          onChange={handleInputChange}
        />
        <Button size="sm" className="right-8 bottom-4 absolute">
          Send Message
          <PaperPlaneIcon />
        </Button>
      </form>
    </div>
  );
};

export default StepChat;
