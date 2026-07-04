import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// =====================
// GET ALL STORIES
// =====================
export const getAllStories = async () => {
  const response = await API.get("/story/get/story");
  return response.data;
};

// =====================
// GET STORY BY ID
// =====================
export const getStoryById = async (id) => {
  const response = await API.get(`/story/get/story/${id}`);
  return response.data;
};

// =====================
// CREATE STORY
// =====================
export const createStory = async (formData) => {
  const response = await API.post(
    "/story/upload/story",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =====================
// UPDATE STORY
// =====================
export const updateStory = async (id, formData) => {
  const response = await API.put(
    `/story/update/story/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// =====================
// DELETE STORY
// =====================
export const deleteStory = async (id) => {
  const response = await API.delete(
    `/story/delete/story/${id}`
  );

  return response.data;
};

// =====================
// LIKE STORY
// =====================
export const likeStory = async (id) => {
  const response = await API.put(`/story/like/${id}`);
  return response.data;
};

// =====================
// DISLIKE STORY
// =====================
export const dislikeStory = async (id) => {
  const response = await API.put(`/story/dislike/${id}`);
  return response.data;
};