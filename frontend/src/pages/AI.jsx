import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";


export default function Ai() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMsg = message;

    // add user message instantly
    setChat((prev) => [...prev, { role: "user", text: userMsg }]);

    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/ai/chat",
        { message: userMsg }
      );

      const botReply = res.data.reply;

      setChat((prev) => [...prev, { role: "bot", text: botReply }]);
    } catch (err) {
      setChat((prev) => [
        ...prev,
        { role: "bot", text: "Error: Server not responding 😢" },
      ]);
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <>
    <Navbar />
    <div style={styles.container}>
      
      <h2 style={styles.title}>AI Chatbot 🤖</h2>

      <div style={styles.chatBox}>
        {chat.map((c, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              alignSelf: c.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: c.role === "user" ? "#4f46e5" : "#333",
            }}
          >
            {c.text}
          </div>
        ))}

        {loading && <div style={styles.loading}>Typing...</div>}
      </div>

      <div style={styles.inputBox}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />

        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
    </>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "#0f172a",
    color: "white",
    padding: "20px",
  },
  title: {
    marginBottom: "10px",
  },
  chatBox: {
    flex: 1,
    width: "100%",
    maxWidth: "600px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "10px",
    border: "1px solid #333",
    borderRadius: "10px",
    background: "#111827",
    height: "10%",
  },
  message: {
    padding: "10px 14px",
    borderRadius: "10px",
    maxWidth: "70%",
    color: "white",
  },
  inputBox: {
    display: "flex",
    width: "100%",
    maxWidth: "600px",
    marginTop: "10px",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "10px 15px",
    background: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  loading: {
    fontStyle: "italic",
    opacity: 0.7,
  },
};