import { Bot } from "lucide-react";

export const TypingIndicator = () => {
  return (
    <div className="flex gap-3 px-4 py-3 message-enter">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <Bot className="w-4 h-4 text-foreground" />
      </div>
      <div className="flex-1 pt-1">
        <p className="text-sm font-medium mb-1 text-muted-foreground">Assistant</p>
        <div className="typing-indicator flex gap-1 py-2">
          <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
          <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
          <span className="w-2 h-2 rounded-full bg-muted-foreground"></span>
        </div>
      </div>
    </div>
  );
};
