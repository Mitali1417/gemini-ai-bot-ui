import React, { useEffect, useRef, useState } from 'react';
import { useChatStore } from '../store/store';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import ChatInput from './ChatInput';
import ChatBox from './ChatBox';
import type { Message } from './ChatMessage';

interface ChatroomProps {
  chatroomId: string;
}

const PAGE_SIZE = 20;

const FAKE_REPLIES = [
  "Sure, I can help with that!",
  "Here's what I found:",
  "Can you clarify your question?",
  "That's an interesting topic!",
  "Let me think about that for a moment...",
  "Here's a quick summary:",
  "Absolutely!",
  "I'm on it!",
  "Here's a fun fact:",
  "Let's break it down together.",
  "Of course!",
  "Here's a step-by-step guide:",
  "I'm happy to help!",
  "Let's explore that idea.",
  "Here's what you need to know:",
];

export const Chatroom: React.FC<ChatroomProps> = ({ chatroomId }) => {
  const chatroom = useChatStore((s) => s.chatrooms.find((c) => c.id === chatroomId));
  const addMessage = useChatStore((s) => s.addMessage);
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [aiTyping, setAiTyping] = useState(false);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [copyId, setCopyId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const aiReplyPending = useRef(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }, [chatroomId]);

  useEffect(() => {
    setAiTyping(false);
    aiReplyPending.current = false;
  }, [chatroomId]);

  useEffect(() => {
    if (!loading && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatroom?.messages.length, loading]);

  if (!chatroom) return <div className="p-4">Chatroom not found.</div>;

  const totalMessages = chatroom.messages.length;
  const pagedMessages: Message[] = chatroom.messages.slice(Math.max(0, totalMessages - page * PAGE_SIZE));

  const handleSend = () => {
    if (!input.trim() && !image) return;
    const msg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: Date.now(),
      ...(image ? { image } : {}),
    };
    addMessage(chatroomId, msg);
    setInput('');
    setImage(null);
    if (!aiReplyPending.current) {
      setAiTyping(true);
      aiReplyPending.current = true;
      setTimeout(() => {
        const aiMsg: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          content: FAKE_REPLIES[Math.floor(Math.random() * FAKE_REPLIES.length)],
          timestamp: Date.now(),
        };
        addMessage(chatroomId, aiMsg);
        setAiTyping(false);
        aiReplyPending.current = false;
      }, 1200 + Math.random() * 1000);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopyId(id);
    toast.success('Copied!');
    setTimeout(() => setCopyId(null), 1000);
  };

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPage((p) => p + 1);
      setLoadingMore(false);
    }, 500);
  };

  const hasMessages = totalMessages > 0;

  return (
    <div className="flex flex-col h-full w-full max-w-4xl mx-auto relative">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-4 sm:px-6 lg:px-8">
          {!hasMessages && !loading ? (
            // Empty state with Gemini greeting
            <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-2xl">G</span>
              </div>
              <h1 className="text-4xl sm:text-5xl font-light mb-4 gemini-text-gradient tracking-wide leading-tight">
                Hello, I'm Gemini
              </h1>
              <h6 className="text-lg text-muted-foreground mb-8">
                How can I help you today?
              </h6>
            </div>
          ) : (
            <>
              {loading ? (
                <div className="space-y-4 mt-8">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-12 bg-zinc-200 dark:bg-zinc-800 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="mt-8">
                  {pagedMessages.length < totalMessages && (
                    <div className="flex justify-center mb-6">
                      <Button onClick={handleLoadMore} size="sm" disabled={loadingMore}>
                        {loadingMore ? 'Loading...' : 'Load older messages'}
                      </Button>
                    </div>
                  )}
                  <ChatBox messages={pagedMessages} onCopy={handleCopy} copiedId={copyId} aiTyping={aiTyping} />
                </div>
              )}
            </>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Fixed input at bottom */}
      <div className="sticky bottom-0 bg-background border-t border-border/40 backdrop-blur-sm">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="max-w-3xl mx-auto">
            <ChatInput
              value={input}
              onChange={setInput}
              onSend={handleSend}
              disabled={aiTyping}
              image={image}
              onImageChange={handleImage}
              onRemoveImage={() => setImage(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};