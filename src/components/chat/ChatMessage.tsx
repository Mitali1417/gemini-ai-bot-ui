import React from "react";
import { Button } from "../ui/button";
import { LucideCopy, LucideCopyCheck } from "lucide-react";
import { toast } from "sonner";
import { TextToolTip } from "../shared/TextTooltip";

export interface Message {
  id: string;
  sender: "user" | "ai";
  content: string;
  timestamp: number;
  image?: string;
}

interface ChatMessageProps {
  message: Message;
  isCopied: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCopied }) => {
  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Copied to clipboard!");
  };
  return (
    <div
      className={`group flex items-start gap-2 ${
        message.sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`relative max-w-xs px-3 py-2 rounded-lg shadow text-sm ${
          message.sender === "user"
            ? "bg-blue-500 !text-white rounded-br-none"
            : "bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-none"
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="upload"
            className="mb-1 max-w-[120px] rounded"
          />
        )}
        <span
          className={`${
            message.sender === "user"
              ? "!text-white rounded-br-none"
              : "text-zinc-900 dark:text-zinc-100 rounded-bl-none"
          }`}
        >
          {message.content}
        </span>
        <span
          className={`block text-[10px] mt-1 opacity-60 ${
            message.sender === "user"
              ? "!text-white rounded-br-none"
              : "text-zinc-900 dark:text-zinc-100 rounded-bl-none"
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      {message.sender !== "user" && (
        <TextToolTip label="Copy">
          <Button
            variant={"ghost"}
            size={"icon"}
            tabIndex={0}
            aria-label="Clipboard"
            onClick={() => handleCopy(message.content)}
          >
            {isCopied ? <LucideCopyCheck /> : <LucideCopy />}
          </Button>
        </TextToolTip>
      )}
    </div>
  );
};

export default ChatMessage;
