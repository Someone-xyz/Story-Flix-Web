import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function StoryComments({ storyId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!storyId) return;

    socket.emit("joinStory", storyId);

    fetch(`http://localhost:5000/api/comments/${storyId}`)
      .then((res) => res.json())
      .then((data) => setComments(data));

    socket.on("newComment", (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    return () => socket.off("newComment");
  }, [storyId]);

  const sendComment = () => {
    if (!message.trim()) return;

    socket.emit("sendComment", {
      storyId,
      userId: currentUser._id,
      username: currentUser.username,
      message
    });

    setMessage("");
  };

  return (
    <div style={styles.wrapper}>
      <h3 style={styles.heading}>Comments</h3>

      {/* ✅ INPUT FIRST (AB UPPER) */}
      <div style={styles.inputBox}>
        <input
          style={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write comment..."
        />

        <button style={styles.button} onClick={sendComment}>
          Send
        </button>
      </div>

      {/* ✅ COMMENTS BELOW */}
      <div style={styles.commentList}>
        {comments.map((c) => (
          <div key={c._id} style={styles.commentCard}>
            <b style={styles.username}>{c.username}</b>
            <p style={styles.text}>{c.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "60%",
    margin: "30px auto",
    padding: "15px",
    background: "#f9f9f9",
    borderRadius: "10px"
  },

  heading: {
    marginBottom: "10px"
  },

  inputBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none"
  },

  button: {
    padding: "10px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  commentList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  commentCard: {
    background: "white",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #eee"
  },

  username: {
    fontSize: "14px",
    color: "#333"
  },

  text: {
    margin: "5px 0 0 0"
  }
};

export default StoryComments;