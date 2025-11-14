import express from 'express';
import {
  uploadDocument,
  getDocuments,
  getDocumentById,
  updateDocument,
  deleteDocument,
  getDocumentFile
} from '../controllers/documentController.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', upload.single('file'), uploadDocument);
router.get('/', getDocuments);
router.get('/:id', getDocumentById);
router.get('/:id/file', getDocumentFile);
router.put('/:id', updateDocument);
router.delete('/:id', deleteDocument);

export default router;

