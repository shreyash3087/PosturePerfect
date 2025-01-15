import { createContext, useContext, useEffect, useState } from "react";

const backendUrl = "http://localhost:3000";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [isFetching, setIsFetching] = useState(false);

  const chat = async (message) => {
    setLoading(true);
    const data = await fetch(`${backendUrl}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });
    const resp = (await data.json()).messages;
    setMessages((messages) => [...messages, ...resp]);
    setLoading(false);
  };

  const fetchCount = async () => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      const data = await fetch(`${backendUrl}/api/count`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resp = await data.json();
      if (resp.messages && resp.messages.length > 0) {
        const newCount = resp.messages[0].count;
        if (newCount !== count) {
          setCount(newCount);
          setMessages((messages) => [...messages, ...resp.messages]);
        }
      }
    } catch (error) {
      console.error("Error fetching count:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [cameraZoomed, setCameraZoomed] = useState(true);

  const onMessagePlayed = () => {
    setMessages((messages) => messages.slice(1));
  };

  useEffect(() => {
    if (messages.length > 0) {
      setMessage(messages[0]);
    } else {
      setMessage(null);
    }
  }, [messages]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCount();
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <ChatContext.Provider
      value={{
        chat,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
        count,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
