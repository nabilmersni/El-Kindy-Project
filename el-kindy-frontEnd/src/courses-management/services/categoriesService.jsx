import axios from "axios";

const API_BASE_URL = "http://localhost:3000/categories";

const categoriesService = {
  getAllCategories: () => {
    return axios.get(API_BASE_URL);
  },

  addCategory: (categoryData) => {
    return axios.post(API_BASE_URL, categoryData);
  },

  deleteCategory: (categoryId) => {
    return axios.delete(`${API_BASE_URL}/${categoryId}`);
  },

  getCategoryById: (categoryId) => {
    return axios.get(`${API_BASE_URL}/${categoryId}`);
  },

  addImageToCategory: (categoryId, image) => {
    return axios.post(`${API_BASE_URL}/upload/${categoryId}`, image, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  updateCategory: (categoryId, categoryData) => {
    return axios.put(`${API_BASE_URL}/${categoryId}`, categoryData);
  },
};

export default categoriesService;
