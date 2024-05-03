import axios from "axios";

const API_BASE_URL = "http://localhost:3000/studentTrackingSheetRoutes";

const studentTrackingSheetService = {
  addStudentTrackingSheet: (data) => {
    return axios.post(API_BASE_URL, data);
  },

  getStudentTrackingSheetByTeacher: (teacherId) => {
    return axios.get(`${API_BASE_URL}/teacher/${teacherId}`);
  },

  getAllStudentTrackingSheets: () => {
    return axios.get(API_BASE_URL);
  },

  deleteStudentTrackingSheetById: (studentTrackingSheetId) => {
    return axios.delete(`${API_BASE_URL}/${studentTrackingSheetId}`);
  },

  getStudentTrackingSheetById: (studentTrackingSheetId) => {
    return axios.get(`${API_BASE_URL}/${studentTrackingSheetId}`);
  },

  updateStudentTrackingSheet: (id, data) => {
    return axios.put(`${API_BASE_URL}/${id}`, data);
  },
};

export default studentTrackingSheetService;
