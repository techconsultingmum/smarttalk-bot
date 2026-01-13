import { useState, useCallback } from "react";

export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const WEBHOOK_URL = "https://hakiy.app.n8n.cloud/webhook/chatapp";

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = useCallback(async (content: string) => {
    const userMessage: Message = {
      id: crypto.randomUUID(),
      content,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          message: content,
          timestamp: new Date().toISOString(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Extract string content from various response formats
      let responseContent: string;
      if (typeof data === "string") {
        responseContent = data;
      } else if (data.response && typeof data.response === "string") {
        responseContent = data.response;
      } else if (data.message && typeof data.message === "string") {
        responseContent = data.message;
      } else if (data.output && typeof data.output === "string") {
        responseContent = data.output;
      } else if (data.text && typeof data.text === "string") {
        responseContent = data.text;
      } else {
        // Format object as readable text
        responseContent = JSON.stringify(data, null, 2);
      }
      
      const botMessage: Message = {
        id: crypto.randomUUID(),
        content: responseContent,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        content: "Sorry, I couldn't process your request. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return {
    messages,
    isLoading,
    sendMessage,
    clearMessages,
  };
};
