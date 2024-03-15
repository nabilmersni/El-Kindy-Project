import axios from "axios";

const API_BASE_URL = "http://localhost:3000/courses";

const courseService = {
  getAllCourses: () => {
    return axios.get(API_BASE_URL);
  },

  addCourse: (courseData) => {
    return axios.post(API_BASE_URL, courseData);
  },

  deleteCourse: (courseId) => {
    return axios.delete(`${API_BASE_URL}/${courseId}`);
  },

  getCourseById: (courseId) => {
    return axios.get(`${API_BASE_URL}/${courseId}`);
  },

  addImageToCourse: (courseId, image) => {
    return axios.post(`${API_BASE_URL}/upload/${courseId}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateCourse: (courseId, courseData) => {
    return axios.put(`${API_BASE_URL}/${courseId}`, courseData);
  },
};

export default courseService;
