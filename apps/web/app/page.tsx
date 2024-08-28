"use client";
import { useState } from "react";
import { useSocket } from "./context/SocketProvider";
import styles from "./page.module.css";

export default function Page() {
  const { messages, sendMessage } = useSocket();
  const [message, setMessage] = useState("");

  return (
    <section className={styles.page}>
      <div>
        {messages.map((msg) => (
          <li>{msg}</li>
        ))}
      </div>
      <div className={styles.inputContainer}>
        <input
          className={styles.chatInput}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button
          className={styles.sendButton}
          onClick={() => sendMessage(message)}
        >
          Send
        </button>
      </div>
    </section>
  );
}
