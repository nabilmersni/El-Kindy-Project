import axios from "axios";

const API_BASE_URL = "http://localhost:3000/reservationIndiv";

const reservationIndivService = {
  // getAllAvailabilities: () => {
  //   return axios.get(API_BASE_URL);
  // },

  getTeacherReservationIndiv: (teacherId) => {
    return axios.get(`${API_BASE_URL}/teacher/${teacherId}`);
  },

  getUserReservationIndiv: (userId) => {
    return axios.get(`${API_BASE_URL}/user/${userId}`);
  },

  getUserReservationById: (reservationId) => {
    return axios.get(`${API_BASE_URL}/${reservationId}`);
  },

  addReservationIndiv: (reservationIndivData) => {
    return axios.post(API_BASE_URL, reservationIndivData);
  },

  checkoutReservationIndiv: (checkoutReservationIndivData) => {
    return axios.post(`${API_BASE_URL}/checkout`, checkoutReservationIndivData);
  },

  deleteReservationIndiv: (reservationIndivId) => {
    return axios.delete(`${API_BASE_URL}/${reservationIndivId}`);
  },

  getAvailabilityById: (availabilityId) => {
    return axios.get(`${API_BASE_URL}/${availabilityId}`);
  },

  updateReservationIndiv: (reservationIndivId, reservationIndivData) => {
    return axios.put(
      `${API_BASE_URL}/${reservationIndivId}`,
      reservationIndivData
    );
  },

  getReservationsByUserIdAndCourseId: (userId, courseId) => {
    return axios.get(`${API_BASE_URL}/user/${userId}/course/${courseId}`);
  },
};

export default reservationIndivService;
