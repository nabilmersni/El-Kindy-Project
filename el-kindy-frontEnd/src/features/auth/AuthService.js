import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";

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
  return response.data.user;
};

const login = async (userData) => {
  const response = await instance.post(`${API_URL}/login`, userData);

  secureLocalStorage.setItem("user", response.data.data.user);
  return response.data.data.user;
};

const authGoogle = async (userData) => {
  const response = await instance.post(`${API_URL}/auth/google`, userData);

  secureLocalStorage.setItem("user", response.data.data.user);
  return response.data.data.user;
};

const faceIDRegistration = async (id, userData) => {
  const response = await instance.post(
    `${API_URL}/auth/faceIDRegistration/${id}`,
    userData
  );

  secureLocalStorage.setItem("user", response.data.data.user);
  return response.data.data.user;
};

const authFaceID = async (userData) => {
  const response = await instance.post(`${API_URL}/auth/faceID`, userData);

  secureLocalStorage.setItem("user", response.data.data.user);
  return response.data.data.user;
};

const logout = async () => {
  const response = await instance.post(`${API_URL}/logout`);

  secureLocalStorage.removeItem("user");
  return response;
};

const getLoggedUser = async () => {
  const response = await instance.get(`${API_URL}/get/loggedUser`);
  return response.data.user;
};

const verifyEmail = async (data) => {
  const response = await instance.post(`${API_URL}/verifyEmail`, data);
  return response;
};

const forgotPasswordRequest = async (data) => {
  try {
    const response = await instance.post(
      `${API_URL}/forgotPasswordRequest`,
      data
    );
    toast.success("Reset Password Request was sent to your email");
    return response;
  } catch (error) {
    toast.error(error.response.data.message || "An error occurred");
  }
};

const forgotPasswordChange = async (data, token) => {
  try {
    const response = await instance.post(`${API_URL}/forgotPassword`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Password changed successfully");
    return response;
  } catch (error) {
    toast.error(error.response.data.message || "An error occurred");
  }
};

const changePassword = async (userData) => {
  const response = await instance.patch(
    `${API_URL}/user/changePassword`,
    userData
  );
  return response.data.message;
};

const authService = {
  register,
  login,
  getLoggedUser,
  authGoogle,
  faceIDRegistration,
  authFaceID,
  logout,
  verifyEmail,
  forgotPasswordRequest,
  forgotPasswordChange,
  changePassword,
};

export default authService;
