import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

// Register User
export const registerUser = async (userData) => {
  const response = await API.post(
    "/user/register/user",
    userData
  );

  return response.data;
};

// Login User
export const loginUser = async (userData) => {
  const response = await API.post(
    "/user/login/user",
    userData
  );

  return response.data;
};

// Delete User
export const deleteUser = async (id) => {
  const response = await API.delete(
    `/user/delete/user/${id}`
  );

  return response.data;
};

export default API;