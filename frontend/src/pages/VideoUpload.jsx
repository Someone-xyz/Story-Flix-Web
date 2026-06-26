import React, { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const VideoUpload = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title || !description || !video) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setProgress(0);

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("video", video);

      const response = await axios.post(
        "http://localhost:5000/api/video/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,

          onUploadProgress: (event) => {
            const percentCompleted = Math.round(
              (event.loaded * 100) / event.total
            );

            setProgress(percentCompleted);
          },
        }
      );

      if (response.data.success) {
        alert("✅ Video uploaded successfully");

        setTitle("");
        setDescription("");
        setVideo(null);
        setProgress(0);

        document.getElementById("videoFile").value = "";
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "❌ Video upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="navBar">
      <Navbar />
    </div>
    <div
      style={{
        maxWidth: "600px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}
    >
      <h2>Upload Video</h2>

      <form onSubmit={handleUpload}>
        <div style={{ marginBottom: "15px" }}>
          <label>Title</label>
          <input
            type="text"
            placeholder="Enter video title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Description</label>
          <textarea
            placeholder="Enter video description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
            }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Select Video</label>
          <input
            id="videoFile"
            type="file"
            accept="video/*"
            onChange={(e) => setVideo(e.target.files[0])}
            style={{
              width: "100%",
              marginTop: "5px",
            }}
          />
        </div>

        {loading && (
          <div style={{ marginBottom: "15px" }}>
            <p>Uploading: {progress}%</p>

            <div
              style={{
                width: "100%",
                height: "20px",
                backgroundColor: "#ddd",
                borderRadius: "10px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${progress}%`,
                  height: "100%",
                  backgroundColor: "#4caf50",
                  transition: "0.3s",
                }}
              ></div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: loading ? "#999" : "#007bff",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Uploading..." : "Upload Video"}
        </button>
      </form>
    </div>
    </>
  );
};

export default VideoUpload;