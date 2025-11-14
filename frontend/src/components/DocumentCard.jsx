import { documentService } from '../services/documentService';

const DocumentCard = ({ document, onView, onDelete }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = (fileType) => {
    const icons = {
      pdf: '📄',
      docx: '📝',
      txt: '📃',
      md: '📋',
      html: '🌐',
      image: '🖼️',
      other: '📎',
    };
    return icons[fileType] || icons.other;
  };

  const getCategoryColor = (category) => {
    const colors = {
      Campaign: 'bg-blue-100 text-blue-800',
      Brand: 'bg-purple-100 text-purple-800',
      Content: 'bg-green-100 text-green-800',
      Strategy: 'bg-yellow-100 text-yellow-800',
      Analytics: 'bg-red-100 text-red-800',
      Sales: 'bg-indigo-100 text-indigo-800',
      Product: 'bg-pink-100 text-pink-800',
      Event: 'bg-orange-100 text-orange-800',
      Research: 'bg-teal-100 text-teal-800',
      Design: 'bg-cyan-100 text-cyan-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col h-full overflow-hidden group">
      {/* Header Section */}
      <div className="p-5 pb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="text-3xl sm:text-4xl flex-shrink-0 mt-0.5">{getFileIcon(document.fileType)}</div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1.5 break-words line-clamp-2 leading-tight">
              {document.title}
            </h3>
            {document.description && (
              <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {document.description}
              </p>
            )}
          </div>
        </div>

        {/* Category, Project, Team Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(document.category)}`}>
            {document.category}
          </span>
          {document.project && document.project !== 'General' && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
              {document.project}
            </span>
          )}
          {document.team && document.team !== 'General' && (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
              {document.team}
            </span>
          )}
        </div>

        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {document.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 text-xs text-gray-500 bg-gray-50 rounded-md border border-gray-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer Section */}
      <div className="mt-auto pt-4 px-5 pb-5 border-t border-gray-100 bg-gray-50/50">
        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5 text-xs text-gray-500 mb-3">
          <span className="whitespace-nowrap flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
            </svg>
            {formatFileSize(document.fileSize)}
          </span>
          <span className="text-gray-300">•</span>
          <span className="whitespace-nowrap flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {formatDate(document.uploadDate)}
          </span>
          <span className="text-gray-300">•</span>
          <span className="whitespace-nowrap flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            {document.viewCount} views
          </span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onView(document)}
            className="flex-1 sm:flex-none px-4 py-2 text-sm text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors font-medium whitespace-nowrap shadow-sm hover:shadow-md"
          >
            View
          </button>
          <a
            href={documentService.getDocumentFileUrl(document._id)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2 text-sm text-center text-primary-600 bg-white border border-primary-200 hover:bg-primary-50 rounded-lg transition-colors font-medium whitespace-nowrap shadow-sm hover:shadow-md"
          >
            Download
          </a>
          {onDelete && (
            <button
              onClick={() => onDelete(document._id)}
              className="px-4 py-2 text-sm text-red-600 bg-white border border-red-200 hover:bg-red-50 rounded-lg transition-colors font-medium whitespace-nowrap shadow-sm hover:shadow-md"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;

