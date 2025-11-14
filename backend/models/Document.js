import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  description: {
    type: String,
    trim: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileType: {
    type: String,
    required: true,
    enum: ['pdf', 'docx', 'txt', 'md', 'html', 'image', 'other']
  },
  fileSize: {
    type: Number,
    required: true
  },
  content: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: 'Uncategorized',
    index: true
  },
  project: {
    type: String,
    default: 'General',
    index: true
  },
  team: {
    type: String,
    default: 'General',
    index: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  keywords: [{
    type: String,
    trim: true
  }],
  uploadedBy: {
    type: String,
    default: 'System'
  },
  uploadDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  lastModified: {
    type: Date,
    default: Date.now
  },
  viewCount: {
    type: Number,
    default: 0
  },
  searchScore: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better search performance
documentSchema.index({ title: 'text', description: 'text', content: 'text', tags: 'text' });
documentSchema.index({ category: 1, project: 1, team: 1 });
documentSchema.index({ uploadDate: -1 });

const Document = mongoose.model('Document', documentSchema);

export default Document;

