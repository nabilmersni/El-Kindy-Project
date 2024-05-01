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

  addReservationIndiv: (reservationIndivData) => {
    return axios.post(API_BASE_URL, reservationIndivData);
  },

  // checkout: () => {
  //   // console.log("Event ID:", eventId);
  //   try {
  //     const response = axios.post(`${API_BASE_URL}/checkout`);
  //     const { result } = response.data;
  //     console.log(response.data);

  //     if (result && result.link) {
  //       // Redirect to the payment link
  //       window.location.href = result.link;
  //     } else {
  //       console.error("No payment link found in the response");
  //     }
  //   } catch (error) {
  //     console.error("Error in payement request:", error);
  //     throw error;
  //   }
  // },

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
};

export default reservationIndivService;
