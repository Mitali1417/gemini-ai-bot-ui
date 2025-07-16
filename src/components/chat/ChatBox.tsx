import React from 'react';
import type { Message } from './ChatMessage';
import ChatMessage from './ChatMessage';

interface ChatBoxProps {
  messages: Message[];
  onCopy: (content: string, id: string) => void;
  copiedId: string | null;
  aiTyping?: boolean;
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages, copiedId, aiTyping }) => {
  return (
    <div className="flex flex-col gap-4 w-full">
      {messages.map((msg) => (
        <ChatMessage 
          key={msg.id} 
          message={msg} 
          isCopied={copiedId === msg.id}
        />
      ))}
      {aiTyping && (
        <div className="flex items-start gap-3">
          <div className="flex-1">
            <div className="py-3 px-4 text-sm animate-pulse max-w-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground flex items-center gap-2 gemini-text-gradient">Gemini is typing                <div className="flex space-x-1">
                  <div className="w-1 h-1 mt-1 bg-current rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                  <div className="w-1 h-1 mt-1 bg-current rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                  <div className="w-1 h-1 mt-1 bg-current rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                </div></span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBox;