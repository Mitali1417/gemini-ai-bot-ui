import React from "react";

const ChatLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="h-screen flex flex-col">
      {children}
    </div>
  );
};

export default ChatLayout; 