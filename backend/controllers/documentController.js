import Document from '../models/Document.js';
import Category from '../models/Category.js';
import { extractTextFromFile, getFileType, formatFileSize } from '../utils/fileParser.js';
import { categorizeDocument, extractKeywordsFromText } from '../utils/categorizer.js';
import fs from 'fs/promises';
import path from 'path';

// Upload and index a document
export const uploadDocument = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { title, description, category, project, team, uploadedBy } = req.body;
    const file = req.file;
    
    const fileType = getFileType(file.originalname);
    const filePath = file.path;
    
    // Extract text content
    const content = await extractTextFromFile(filePath, fileType);
    
    // Auto-categorize if not provided
    const categorization = categorizeDocument(
      title || file.originalname,
      description || '',
      content
    );
    
    // Extract keywords
    const keywords = extractKeywordsFromText(
      `${title || file.originalname} ${description || ''} ${content}`
    );
    
    // Create document
    const document = new Document({
      title: title || file.originalname,
      description: description || '',
      fileName: file.originalname,
      filePath: filePath,
      fileType: fileType,
      fileSize: file.size,
      content: content,
      category: category || categorization.category,
      project: project || categorization.project,
      team: team || categorization.team,
      tags: categorization.tags,
      keywords: keywords,
      uploadedBy: uploadedBy || 'System'
    });
    
    await document.save();
    
    // Update category count
    await Category.findOneAndUpdate(
      { name: document.category.toLowerCase() },
      { 
        $inc: { documentCount: 1 },
        $setOnInsert: { 
          displayName: document.category,
          name: document.category.toLowerCase()
        }
      },
      { upsert: true, new: true }
    );
    
    res.status(201).json({
      success: true,
      message: 'Document uploaded and indexed successfully',
      data: document
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Error uploading document',
      error: error.message
    });
  }
};

// Get all documents with pagination
export const getDocuments = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.project) filter.project = req.query.project;
    if (req.query.team) filter.team = req.query.team;
    if (req.query.fileType) filter.fileType = req.query.fileType;
    
    const documents = await Document.find(filter)
      .sort({ viewCount: -1, uploadDate: -1 }) // Sort by most views first, then by date
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude full content for list view
    
    const total = await Document.countDocuments(filter);
    
    res.json({
      success: true,
      data: documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching documents',
      error: error.message
    });
  }
};

// Get single document by ID
export const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    // Increment view count
    document.viewCount += 1;
    await document.save();
    
    res.json({
      success: true,
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching document',
      error: error.message
    });
  }
};

// Update document
export const updateDocument = async (req, res) => {
  try {
    const { title, description, category, project, team, tags } = req.body;
    
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    if (title) document.title = title;
    if (description) document.description = description;
    if (category) document.category = category;
    if (project) document.project = project;
    if (team) document.team = team;
    if (tags) document.tags = tags;
    document.lastModified = new Date();
    
    await document.save();
    
    res.json({
      success: true,
      message: 'Document updated successfully',
      data: document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating document',
      error: error.message
    });
  }
};

// Delete document
export const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    // Delete file from filesystem
    try {
      await fs.unlink(document.filePath);
    } catch (err) {
      console.error('Error deleting file:', err);
    }
    
    // Update category count
    await Category.findOneAndUpdate(
      { name: document.category.toLowerCase() },
      { $inc: { documentCount: -1 } }
    );
    
    await Document.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Document deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting document',
      error: error.message
    });
  }
};

// Get document file
export const getDocumentFile = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({
        success: false,
        message: 'Document not found'
      });
    }
    
    res.sendFile(path.resolve(document.filePath));
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching file',
      error: error.message
    });
  }
};

