import React from "react";
import { ThemeToggle } from "./ThemeToggle";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 px-4">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full gemini-gradient flex items-center justify-center">
            <span className="text-white font-bold text-2xl">G</span>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout; 