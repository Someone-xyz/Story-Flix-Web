import { useState } from "react";
import { createStory } from "../services/storyApi";
import { useNavigate } from "react-router-dom";
import "../pagescss/UploadStory.css";
import Navbar from "../components/Navbar";

function UploadStory() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("author", form.author);
    formData.append("title", form.title);
    formData.append("storyDescription", form.storyDescription);
    formData.append("storyContent", form.storyContent);
    formData.append("storyCover", file);

    try {
      setLoading(true);

      await createStory(formData);

      alert("✅ Story Uploaded Successfully!");

      navigate("/");
    } catch (err) {
      console.error(err);
      alert("❌ Story Upload Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="cont">
        <h1>Upload Story</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="author"
            placeholder="Author"
            onChange={handleChange}
            required
          />

          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            required
          />

          <input
            name="storyDescription"
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <textarea
            name="storyContent"
            placeholder="Story Content"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Uploading..." : "Upload"}
          </button>
        </form>

        <button
          onClick={() => navigate("/story/upload/video")}
          disabled={loading}
        >
          Upload Video
        </button>
      </div>
    </>
  );
}

export default UploadStory;