import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getStoryById, updateStory } from "../services/storyApi";

function EditStory() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      const data = await getStoryById(id);
      setForm(data.story);
    }

    fetchStory();
  }, [id]);

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

    if (file) {
      formData.append("storyCover", file);
    }

    try {
      await updateStory(id, formData);
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>Edit Story</h1>

      <form onSubmit={handleSubmit}>
        <input name="author" value={form.author || ""} onChange={handleChange} />
        <input name="title" value={form.title || ""} onChange={handleChange} />
        <input name="storyDescription" value={form.storyDescription || ""} onChange={handleChange} />

        <textarea name="storyContent" value={form.storyContent || ""} onChange={handleChange} />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default EditStory;