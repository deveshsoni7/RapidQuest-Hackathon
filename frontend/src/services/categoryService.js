import api from '../config/api';

export const categoryService = {
  // Get all categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },

  // Get category statistics
  getCategoryStats: async () => {
    const response = await api.get('/categories/stats');
    return response.data;
  },

  // Create category
  createCategory: async (data) => {
    const response = await api.post('/categories', data);
    return response.data;
  },
};

