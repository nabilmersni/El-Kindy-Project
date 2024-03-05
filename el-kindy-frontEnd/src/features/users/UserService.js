import axios from "axios";

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

const userService = {
  getAllUsers,
};

export default userService;
