import React, { useEffect, useState } from "react";
import { useAuthStore, useChatStore } from "../store/store";
import { Chatroom } from "./Chatroom";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import { Sidebar } from "../shared/Sidebar";
import { Header } from "../shared/Header";

const ChatHome: React.FC = () => {
  const { isLoggedIn, user } = useAuthStore();
  const { chatrooms, createChatroom } = useChatStore();
  const [selectedChatroom, setSelectedChatroom] = useState<string | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (isLoggedIn && chatrooms.length === 0) {
      const title = `Chat ${new Date().toLocaleDateString()}`;
      createChatroom(title);
    }
  }, [isLoggedIn, chatrooms.length, createChatroom]);

  useEffect(() => {
    if (isLoggedIn && chatrooms.length > 0 && !selectedChatroom) {
      setSelectedChatroom(chatrooms[0].id);
    }
  }, [isLoggedIn, chatrooms, selectedChatroom]);

  let MainContent;
  if (!isLoggedIn) {
    MainContent = (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))] p-4 sm:p-8">
        <div className="text-center max-w-2xl w-full">
          <div className="mb-8">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">G</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-light mb-4 tracking-wide leading-tight">
              Meet Gemini, <br />your personal AI assistant
            </h1>
            <h6 className="text-lg text-muted-foreground mb-8">
              How can I help you today?
            </h6>
          </div>

          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <p className="text-sm sm:text-base">"Help me write a professional email"</p>
              </CardContent>
            </Card>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <p className="text-sm sm:text-base">"Explain quantum computing simply"</p>
              </CardContent>
            </Card>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <p className="text-sm sm:text-base">"Create a workout plan for beginners"</p>
              </CardContent>
            </Card>
            <Card className="p-4 cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <p className="text-sm sm:text-base">"Suggest ideas for a weekend trip"</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else if (selectedChatroom && chatrooms.length > 0) {
    MainContent = (
      <div className="h-full">
        <Chatroom chatroomId={selectedChatroom} />
      </div>
    );
  } else {
    MainContent = (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.16))] p-4 sm:p-8">
        <div className="text-center max-w-md w-full">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light mb-4">Hello, {user?.phone}</h2>
          <p className="text-muted-foreground text-lg mb-6">How can I help you today?</p>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (isLoggedIn && showLogin) {
      setShowLogin(false);
      toast.success("Logged in successfully!");
    }
  }, [isLoggedIn, showLogin]);

  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1 min-h-0">
        <Sidebar
          setSelectedChatroom={setSelectedChatroom}
          setShowLogin={setShowLogin}
        />
        <div className="relative pl-10 md:pl-0 flex-1 flex flex-col min-w-0">
          <Header />
          <main className="flex-1 overflow-hidden">{MainContent}</main>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;