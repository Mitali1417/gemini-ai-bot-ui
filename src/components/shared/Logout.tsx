import { useAuthStore } from "../store/store";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { toast } from "sonner";
import { IoMdLogOut } from "react-icons/io";

export const Logout = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">Sign out</DialogTrigger>
      <DialogContent className="flex flex-col items-center w-full max-w-sm">
        <span className="w-20 h-20 rounded-full bg-secondary p-4 flex items-center justify-center">
            <IoMdLogOut className="text-muted-cforeground w-full h-full"/>
        </span>
        <h5 className="text-lg">
          Are you sure you want to logout?
        </h5>
        <div className="flex justify-end gap-2">
          <Button variant="destructive" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
