import axios from "axios";

const API_BASE_URL = "http://localhost:3000/userAvailabilities";

const userAvailabilitiesService = {
  getAllUserAvailabilities: () => {
    return axios.get(API_BASE_URL);
  },

  createUserAvailability: (availabilityData) => {
    return axios.post(API_BASE_URL, availabilityData);
  },

  getUserAvailabilitiesByUserId: (userId) => {
    return axios.get(`${API_BASE_URL}/user/${userId}`);
  },

  getUserAvailabilityById: (availabilityId) => {
    return axios.get(`${API_BASE_URL}/${availabilityId}`);
  },

  updateUserAvailability: (availabilityId, availabilityData) => {
    return axios.put(`${API_BASE_URL}/${availabilityId}`, availabilityData);
  },

  deleteUserAvailabilityById: (availabilityId) => {
    return axios.delete(`${API_BASE_URL}/${availabilityId}`);
  },
};

export default userAvailabilitiesService;
