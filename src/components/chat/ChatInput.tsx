import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FaImage } from "react-icons/fa";
import { BsSend } from "react-icons/bs";
import { X } from "lucide-react";
import { TextToolTip } from "../shared/TextTooltip";

interface ChatInputProps {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  disabled?: boolean;
  image?: string | null;
  onImageChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage?: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  disabled,
  image,
  onImageChange,
  onRemoveImage,
}) => {
  return (
    <div className="w-full">
      {/* Image preview */}
      {image && (
        <div className="mb-3 p-3 bg-muted rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={image}
                alt="Preview"
                className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-md border"
              />
              <span className="text-sm text-muted-foreground">Image attached</span>
            </div>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              onClick={onRemoveImage}
              className="h-8 w-8 p-0"
            >
              <X size={16} />
            </Button>
          </div>
        </div>
      )}

      {/* Input form */}
      <form
        className="flex gap-2 sm:gap-3 items-end w-full"
        onSubmit={(e) => {
          e.preventDefault();
          if (!disabled && (value.trim() || image)) onSend();
        }}
      >
        <div className="flex items-center gap-2 sm:gap-3 w-full">
          {/* Image upload button */}
          <input
            type="file"
            accept="image/*"
            onChange={onImageChange}
            className="hidden"
            id="img-upload-chatinput"
            disabled={disabled}
          />
          <TextToolTip label="Upload an image">
            <label
              htmlFor="img-upload-chatinput"
              className={`cursor-pointer p-2 rounded-full hover:bg-muted transition-colors ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <FaImage size={18} className="text-muted-foreground" />
            </label>
          </TextToolTip>

          {/* Input field with send button */}
          <div className="flex-1 relative">
            <Input
              type="text"
              className="w-full px-4 py-3 pr-12 sm:pr-14 h-12 sm:h-14 rounded-full border-2 focus:border-blue-500 dark:focus:border-blue-400 transition-colors text-sm sm:text-base"
              placeholder="Enter a prompt here"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled}
              aria-label={
                disabled ? "Message input (login required)" : "Message input"
              }
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
              disabled={disabled || (!value.trim() && !image)}
            >
              <BsSend size={16} className="sm:hidden" />
              <BsSend size={18} className="hidden sm:block" />
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;