import axios from "axios";

const API_BASE_URL = "http://localhost:3000/groups";

const groupService = {
  getAllGroups: () => {
    return axios.get(API_BASE_URL);
  },

  createGroup: (groupData) => {
    return axios.post(API_BASE_URL, groupData);
  },

  getGroupById: (groupId) => {
    return axios.get(`${API_BASE_URL}/${groupId}`);
  },

  updateGroup: (groupId, groupData) => {
    return axios.put(`${API_BASE_URL}/${groupId}`, groupData);
  },

  deleteGroupById: (groupId) => {
    return axios.delete(`${API_BASE_URL}/${groupId}`);
  },
};

export default groupService;
