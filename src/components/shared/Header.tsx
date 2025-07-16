import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/store";
import { Button } from "../ui/button";
import { Logout } from "./Logout";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">G</span>
          </div>
          <h1 className="text-xl font-normal">Gemini</h1>
        </div>
        <ThemeToggle />
      </div>
      <div>
        {isLoggedIn ? (
          <Logout />
        ) : (
          <Button variant="default" onClick={() => navigate("/signin")}>
            Sign in
          </Button>
        )}
      </div>
    </header>
  );
};
