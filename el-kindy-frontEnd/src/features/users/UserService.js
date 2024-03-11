import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

const API_URL = "http://localhost:3000/api/v1/users";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
});

const getAllUsers = async (excludeUserId) => {
  const queryString = excludeUserId ? `?excludeUserId=${excludeUserId}` : "";

  const response = await instance.get(`${API_URL}${queryString}`);
  return response.data.data.users;
};

const updateMe = async (userData) => {
  const response = await instance.post(`${API_URL}/updateMe`, userData);
  secureLocalStorage.setItem("user", response.data.data.user);
  return response.data.data.user;
};

const blockUser = async (id, state) => {
  const response = await instance.patch(`${API_URL}/block/${id}`, state);
  return response.data.data.user;
};

const updateUser = async (id, userData) => {
  const response = await instance.patch(`${API_URL}/${id}`, userData);
  return response.data.data.user;
};

const addUser = async (data) => {
  const response = await instance.post(`${API_URL}/addUser`, data);
  return response;
};

const userService = {
  getAllUsers,
  updateMe,
  blockUser,
  updateUser,
  addUser,
};

export default userService;
