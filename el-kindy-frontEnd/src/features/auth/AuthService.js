import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/users";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
});

const register = async (userData) => {
  const response = await instance.post(`${API_URL}/signup`, userData);
  if (response.data) {
    // localStorage.setItem("loggedUser", JSON.stringify(response.data));
  }
  return response.data.data.user;
};

const login = async (userData) => {
  const response = await instance.post(`${API_URL}/login`, userData);
  return response.data.data.user;
};

const authGoogle = async (userData) => {
  const response = await instance.post(`${API_URL}/auth/google`, userData);
  return response.data.data.user;
};

const getLoggedUser = async () => {
  const response = await instance.get(`${API_URL}/get/loggedUser`);
  return response.data.user;
};

const authService = {
  register,
  login,
  getLoggedUser,
  authGoogle,
};

export default authService;
