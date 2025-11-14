import express from 'express';
import {
  searchDocuments,
  getSearchSuggestions,
  getPopularSearches
} from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchDocuments);
router.get('/suggestions', getSearchSuggestions);
router.get('/popular', getPopularSearches);

export default router;

