import axios from "axios";

const API_BASE_URL = "http://localhost:3000/subCategories";

const subCategoriesService = {
  getAllSubCategories: () => {
    return axios.get(API_BASE_URL);
  },

  addSubCategory: (subCategoryData) => {
    return axios.post(API_BASE_URL, subCategoryData);
  },

  deleteSubCategory: (subCategoryId) => {
    return axios.delete(`${API_BASE_URL}/${subCategoryId}`);
  },

  getSubCategoryById: (subCategoryId) => {
    return axios.get(`${API_BASE_URL}/${subCategoryId}`);
  },

  addImageToSubCategory: (subCategoryId, image) => {
    return axios.post(`${API_BASE_URL}/upload/${subCategoryId}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  addVideoToSubCategory: (subCategoryId, video) => {
    return axios.post(`${API_BASE_URL}/uploadVideo/${subCategoryId}`, video, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateSubCategory: (subCategoryId, subCategoryData) => {
    return axios.put(`${API_BASE_URL}/${subCategoryId}`, subCategoryData);
  },

  getCoursesBySubCategoryId: (subCategoryId) => {
    return axios.get(`${API_BASE_URL}/${subCategoryId}/courses`);
  },
};

export default subCategoriesService;
