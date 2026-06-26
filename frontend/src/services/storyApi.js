import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Get All Stories
export const getAllStories = async () => {
  const response = await API.get("/story/get/story");
  return response.data;
};

// Get Story By Id
export const getStoryById = async (id) => {
  const response = await API.get(`/story/get/story/${id}`);
  return response.data;
};

// Create Story
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

// Update Story
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

// Delete Story
export const deleteStory = async (id) => {
  const response = await API.delete(
    `/story/delete/story/${id}`
  );

  return response.data;
};