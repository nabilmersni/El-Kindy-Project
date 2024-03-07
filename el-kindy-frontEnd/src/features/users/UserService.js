import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL = "http://localhost:3000/api/v1/users";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
});

const getAllUsers = async (userData) => {
  const response = await instance.get(`${API_URL}`, userData);
  //   console.log(response.data.data.users);
  return response.data.data.users;
};

const updateMe = async (userData) => {
  const response = await instance.post(`${API_URL}/updateMe`, userData);
  secureLocalStorage.setItem("user", response.data.data.user);
  return response.data.data.user;
};

const userService = {
  getAllUsers,
  updateMe,
};

export default userService;
