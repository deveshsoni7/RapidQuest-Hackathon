import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  displayName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  documentCount: {
    type: Number,
    default: 0
  },
  color: {
    type: String,
    default: '#3B82F6'
  }
}, {
  timestamps: true
});

const Category = mongoose.model('Category', categorySchema);

export default Category;

