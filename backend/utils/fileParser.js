import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';

export const extractTextFromFile = async (filePath, fileType) => {
  try {
    const buffer = await fs.readFile(filePath);
    
    switch (fileType.toLowerCase()) {
      case 'pdf':
        const pdfData = await pdfParse(buffer);
        return pdfData.text;
      
      case 'docx':
        const docxResult = await mammoth.extractRawText({ path: filePath });
        return docxResult.value;
      
      case 'txt':
      case 'md':
      case 'html':
        return buffer.toString('utf-8');
      
      default:
        return '';
    }
  } catch (error) {
    console.error('Error extracting text from file:', error);
    return '';
  }
};

export const getFileType = (fileName) => {
  const ext = path.extname(fileName).toLowerCase().slice(1);
  const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'];
  
  if (imageTypes.includes(ext)) {
    return 'image';
  }
  
  const validTypes = ['pdf', 'docx', 'txt', 'md', 'html'];
  return validTypes.includes(ext) ? ext : 'other';
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
};

