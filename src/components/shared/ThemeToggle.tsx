import { useEffect } from "react";
import { BsMoonStarsFill } from "react-icons/bs";
import { IoIosSunny } from "react-icons/io";
import { Button } from "../ui/button";
import { useThemeStore } from "../store/theme.slice";
import { TextToolTip } from "./TextTooltip";

export const ThemeToggle = () => {
  const dark = useThemeStore((s) => s.dark);
  const toggle = useThemeStore((s) => s.toggle);
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <TextToolTip label={dark ? "Light Mode" : "Dark Mode"}>
      <Button
        variant={"ghost"}
        className="p-2 rounded-full transition-colors"
        onClick={toggle}
        aria-label="Toggle dark mode"
      >
        {dark ? (
          <BsMoonStarsFill className="w-5 h-5" />
        ) : (
          <IoIosSunny className="w-5 h-5" />
        )}
      </Button>
    </TextToolTip>
  );
};
