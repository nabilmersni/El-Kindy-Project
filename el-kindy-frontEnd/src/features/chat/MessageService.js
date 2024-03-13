import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/messages";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
});

const getMessages = async (chatID) => {
  const response = await instance.get(`${API_URL}/${chatID}`);
  return response.data.data.messages;
};

const sendMessage = async (data) => {
  const response = await instance.post(`${API_URL}`, data);
  return response.data.data.message;
};

const messageService = {
  getMessages,
  sendMessage,
};

export default messageService;
