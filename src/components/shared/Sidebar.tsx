import { HiOutlineMenu } from "react-icons/hi";
import { Button } from "../ui/button";
import { FaEdit } from "react-icons/fa";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";
import { useEffect, useState } from "react";
import { useAuthStore, useChatStore } from "../store/store";
import { toast } from "sonner";
import { Delete } from "lucide-react";
import { useNavigate } from "react-router-dom";

type SidebarProps = {
  setSelectedChatroom: (id: string | null) => void;
  setShowLogin: (show: boolean) => void;
};

export const Sidebar = ({ setSelectedChatroom }: SidebarProps) => {
  const { isLoggedIn } = useAuthStore();
  const { chatrooms, createChatroom, deleteChatroom } = useChatStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarLoading, setSidebarLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setSidebarLoading(true);
    const t = setTimeout(() => setSidebarLoading(false), 800);
    return () => clearTimeout(t);
  }, [isLoggedIn]);

  return (
    <>
      {/* Backdrop for small screens */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`transition-all duration-200 h-full flex flex-col bg-muted border-r z-50 ${
          sidebarOpen ? "w-64" : "w-16"
        } md:relative fixed left-0 top-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-4 md:translate-x-0"
        }`}
      >
        <div className="flex flex-col p-3">
          <div className="flex justify-between items-center pl-2 md:pl-0 mb-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
              onClick={() => setSidebarOpen((v) => !v)}
            >
              <HiOutlineMenu className="w-5 h-5" />
            </Button>
          </div>

          {sidebarOpen && (
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start px-4 py-3 h-auto rounded-full"
              onClick={() => {
                const title = `Chat ${new Date().toLocaleDateString()} ${
                  chatrooms.length + 1
                }`;
                createChatroom(title);
                setTimeout(() => {
                  setSelectedChatroom(chatrooms[0]?.id || null);
                }, 50);
              }}
            >
              <FaEdit className="w-4 h-4 text-muted-foreground" />
              <span>New chat</span>
            </Button>
          )}
        </div>

        {sidebarOpen && (
          <div className="px-4 flex-1 overflow-hidden">
            <div className="mb-4">
              <h5 className="text-sm font-medium mb-3 pl-2">Recent</h5>
              <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
                {sidebarLoading ? (
                  Array.from({ length: 6 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full rounded-lg" />
                  ))
                ) : !isLoggedIn ? (
                  <Card className="shadow-2xl">
                    <CardContent>
                      <h6 className="font-medium mb-2">
                        Sign in to start saving your chats
                      </h6>
                      <p className="text-sm mb-3">
                        Once you're signed in, you can access your recent chats
                        here
                      </p>
                      <button
                        className="text-blue-600 dark:text-blue-400 cursor-pointer text-sm hover:underline"
                        onClick={() => navigate("/signin")}
                      >
                        Sign in
                      </button>
                    </CardContent>
                  </Card>
                ) : chatrooms.length === 0 ? (
                  <p className="text-sm">No recent chats</p>
                ) : (
                  chatrooms.map((room) => (
                    <div
                      key={room.id}
                      className={`flex items-center group gap-3 p-3 hover:bg-accent cursor-pointer rounded-lg transition-colors justify-between`}
                      tabIndex={0}
                      onClick={() => setSelectedChatroom(room.id)}
                      onKeyDown={(e) =>
                        (e.key === "Enter" || e.key === " ") &&
                        setSelectedChatroom(room.id)
                      }
                      aria-label={`Open chatroom ${room.title}`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <span className="truncate text-sm">{room.title}</span>
                      </div>
                      <button
                        className="hidden group-hover:flex"
                        aria-label="Delete chatroom"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteChatroom(room.id);
                          setTimeout(() => {
                            const next = chatrooms.filter(
                              (c) => c.id !== room.id
                            )[0];
                            setSelectedChatroom(next ? next.id : null);
                          }, 50);
                          toast.success("Chatroom deleted");
                        }}
                      >
                        <Delete className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};