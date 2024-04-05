import axios from "axios";

const API_BASE_URL = "http://localhost:3000/availabilities";

const availabilitiesService = {
  getAllAvailabilities: () => {
    return axios.get(API_BASE_URL);
  },

  getTeacherAvailabilities: (teacherId) => {
    return axios.get(`${API_BASE_URL}/teacher/${teacherId}`);
  },

  addAvailability: (availabilityData) => {
    return axios.post(API_BASE_URL, availabilityData);
  },

  deleteAvailability: (availabilityId) => {
    return axios.delete(`${API_BASE_URL}/${availabilityId}`);
  },

  getAvailabilityById: (availabilityId) => {
    return axios.get(`${API_BASE_URL}/${availabilityId}`);
  },

  updateAvailability: (availabilityId, availabilityData) => {
    return axios.put(`${API_BASE_URL}/${availabilityId}`, availabilityData);
  },
};

export default availabilitiesService;
