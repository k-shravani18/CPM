// //\src\app\components\KafkaMessages.tsx
"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";


export default function KafkaMessages() {
  console.log("my componet");


  const [messages, setMessages] = useState<string[]>([]); // Specify string[] as the type for messages
  useEffect(() => {
    console.log("after use effect and before connecting to the socket");
    const socket = io("http://localhost:3001");

    try {
      // Listen for messages from first consumer
      socket.on("kafka-message-demo", (message: string) => {
        setMessages((prevMessages: string[]) => [...prevMessages, message]);
      });

      // Listen for messages from second consumer
      socket.on("kafka-message-create", (message: string) => {
        setMessages((prevMessages: string[]) => [...prevMessages, message]);
      });
    } catch (error) {
      console.error(error);
    }


    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div>
      <h1>Kafka Messages</h1>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
}




