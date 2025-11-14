import api from '../config/api';

export const searchService = {
  // Search documents
  searchDocuments: async (query, filters = {}) => {
    const params = { q: query, ...filters };
    const response = await api.get('/search', { params });
    return response.data;
  },

  // Get search suggestions
  getSuggestions: async (query) => {
    const response = await api.get('/search/suggestions', {
      params: { q: query },
    });
    return response.data;
  },

  // Get popular searches
  getPopularSearches: async () => {
    const response = await api.get('/search/popular');
    return response.data;
  },
};

