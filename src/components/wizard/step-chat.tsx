"use client";
import { useCoverLetter } from "@/hooks/use-cover-letter";
import { useLLMSettings } from "@/hooks/use-llm-settings";
import { useResume } from "@/hooks/use-resume";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { useChat, type Message } from "ai/react";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import { ChatBubble, ChatBubbleMessage } from "../ui/chat/chat-bubble";
import { ChatMessageList } from "../ui/chat/chat-message-list";
import { Textarea } from "../ui/textarea";

const StepChat = ({ id }: { id: string }) => {
  const { coverLetter, updateCoverLetter } = useCoverLetter(id);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { resume } = useResume();
  const { llmSettings } = useLLMSettings();
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
    id: coverLetter.id,
    initialMessages: [...(coverLetter.chat || [])],
    body: {
      roleName: coverLetter.roleName,
      companyName: coverLetter.companyName,
      jobDescription: coverLetter.jobDescription,
      companyInfo: coverLetter.companyInfo,
      keywords: coverLetter.keywords,
      apiKey: llmSettings.apiKey,
      resume,
    },
    keepLastMessageOnError: true,
    onFinish: (message) => {
      updateCoverLetter((coverLetter) => ({
        chat: [...(coverLetter.chat || []), message],
      }));
    },
  });

  const submitUserMessage = () => {
    handleSubmit();
    updateCoverLetter((coverLetter) => ({
      chat: [
        ...(coverLetter.chat || []),
        {
          id: new Date().getTime().toString(),
          createdAt: new Date(),
          role: "user",
          content: input,
        },
      ],
    }));
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col pb-4 h-full">
      <ChatMessageList className="flex-grow" ref={scrollAreaRef}>
        <ChatBubble variant="received">
          <ChatBubbleMessage variant="received">
            Hello! I am your cover letter assistant. Ask me anything about the
            role of <strong>{coverLetter.roleName}</strong> at{" "}
            <strong>{coverLetter.companyName}</strong>. I can also answer
            questions about your experience based on your resume.
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
              <ChatBubbleMessage variant={variant}>
                {message.content}
              </ChatBubbleMessage>
            </ChatBubble>
          );
        })}
      </ChatMessageList>

      <form
        className="relative px-4"
        onSubmit={(e) => {
          e.preventDefault();
          submitUserMessage();
        }}
      >
        <Textarea
          placeholder="Type your message here..."
          className="bg-background shadow-none p-3 rounded-xl min-h-24 resize-none"
          value={input}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              submitUserMessage();
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
