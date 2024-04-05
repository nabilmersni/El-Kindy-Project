import axios from "axios";

const API_BASE_URL = "http://localhost:3000/groupAvailabilities";

const groupAvailabilitiesService = {
  getAllGroupAvailabilities: () => {
    return axios.get(API_BASE_URL);
  },

  createGroupAvailabilities: (groupAvailabilityData) => {
    return axios.post(API_BASE_URL, groupAvailabilityData);
  },

  getGroupAvailabilitiesById: (groupAvailabilityId) => {
    return axios.get(`${API_BASE_URL}/${groupAvailabilityId}`);
  },

  updateGroupAvailabilities: (groupAvailabilityId, groupAvailabilityData) => {
    return axios.put(
      `${API_BASE_URL}/${groupAvailabilityId}`,
      groupAvailabilityData
    );
  },

  deleteGroupAvailabilitiesById: (groupAvailabilityId) => {
    return axios.delete(`${API_BASE_URL}/${groupAvailabilityId}`);
  },
};

export default groupAvailabilitiesService;
