import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  content: string;
  isUser: boolean;
  isNew?: boolean;
}

export const ChatMessage = ({ content, isUser, isNew = false }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 px-4 py-3",
        isNew && "message-enter"
      )}
    >
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-chat-user" : "bg-secondary"
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 text-chat-user-foreground" />
        ) : (
          <Bot className="w-4 h-4 text-foreground" />
        )}
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-medium mb-1 text-muted-foreground">
          {isUser ? "You" : "Assistant"}
        </p>
        <div
          className={cn(
            "text-foreground leading-relaxed whitespace-pre-wrap"
          )}
        >
          {content}
        </div>
      </div>
    </div>
  );
};
