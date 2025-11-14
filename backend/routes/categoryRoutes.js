import express from 'express';
import {
  getCategories,
  getCategoryStats,
  createCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.get('/stats', getCategoryStats);
router.post('/', createCategory);

export default router;

