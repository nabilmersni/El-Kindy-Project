import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/chats";

const instance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include credentials (cookies) with requests
});

const userChats = async (userID) => {
  const response = await instance.get(`${API_URL}/${userID}`);
  return response.data.data.chats;
};

const userChat = async (user1ID, user2ID) => {
  const response = await instance.get(`${API_URL}/find/${user1ID}/${user2ID}`);
  return response.data.data.chat;
};

const addChat = async (data) => {
  const response = await instance.post(`${API_URL}`, data);
  return response.data.data.chat;
};

const updateChatSeen = async (userID, data) => {
  const response = await instance.patch(`${API_URL}/${userID}`, data);
  return response.data.chat;
};

const unseenChatsCount = async (userID) => {
  const response = await instance.get(`${API_URL}/stat/unseen/${userID}`);
  return response.data.data.unseenChatsCount;
};

const chatService = {
  userChats,
  userChat,
  addChat,
  updateChatSeen,
  unseenChatsCount,
};

export default chatService;
