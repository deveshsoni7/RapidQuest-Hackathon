import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import DocumentCard from './components/DocumentCard';
import FilterBar from './components/FilterBar';
import UploadModal from './components/UploadModal';
import PreviewModal from './components/PreviewModal';
import { documentService } from './services/documentService';
import { searchService } from './services/searchService';
import { categoryService } from './services/categoryService';

function App() {
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});
  const [stats, setStats] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 0 });

  useEffect(() => {
    loadDocuments();
    loadStats();
  }, []);

  useEffect(() => {
    if (searchQuery || Object.keys(filters).length > 0) {
      performSearch();
    } else {
      loadDocuments();
    }
  }, [filters, pagination.page]);

  const loadDocuments = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const result = await documentService.getDocuments(params);
      setDocuments(result.data);
      setFilteredDocuments(result.data);
      setPagination(result.pagination || pagination);
    } catch (error) {
      console.error('Error loading documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await categoryService.getCategoryStats();
      setStats(result);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = {
        q: searchQuery,
        page: pagination.page,
        limit: pagination.limit,
        ...filters,
      };
      const result = await searchService.searchDocuments(searchQuery, params);
      setFilteredDocuments(result.data);
      setPagination(result.pagination || pagination);
    } catch (error) {
      console.error('Error searching documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);
    setPagination({ ...pagination, page: 1 });
    if (query.trim()) {
      await performSearch();
    } else {
      loadDocuments();
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => {
      const newFilters = { ...prev };
      if (value) {
        newFilters[key] = value;
      } else {
        delete newFilters[key];
      }
      return newFilters;
    });
    setPagination({ ...pagination, page: 1 });
  };

  const handleViewDocument = async (document) => {
    try {
      const result = await documentService.getDocumentById(document._id);
      setSelectedDocument(result.data);
      setIsPreviewModalOpen(true);
    } catch (error) {
      console.error('Error loading document:', error);
    }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      await documentService.deleteDocument(id);
      setDocuments(documents.filter((doc) => doc._id !== id));
      setFilteredDocuments(filteredDocuments.filter((doc) => doc._id !== id));
      loadStats();
    } catch (error) {
      console.error('Error deleting document:', error);
      alert('Error deleting document');
    }
  };

  const handleUploadSuccess = () => {
    loadDocuments();
    loadStats();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Marketing Document Search</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">Find your documents instantly</p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md hover:shadow-lg text-sm sm:text-base whitespace-nowrap"
            >
              + Upload Document
            </button>
          </div>

          <SearchBar onSearch={handleSearch} />
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <FilterBar filters={filters} onFilterChange={handleFilterChange} stats={stats} />

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-sm sm:text-base text-gray-600 break-words">
            {searchQuery ? (
              <>
                Found <span className="font-semibold">{pagination.total}</span> results for "
                <span className="font-semibold break-all">{searchQuery}</span>"
              </>
            ) : (
              <>
                Showing <span className="font-semibold">{filteredDocuments.length}</span> of{' '}
                <span className="font-semibold">{pagination.total}</span> documents
              </>
            )}
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        )}

        {/* Documents Grid */}
        {!loading && filteredDocuments.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No documents found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchQuery
                ? 'Try adjusting your search or filters'
                : 'Get started by uploading your first document'}
            </p>
          </div>
        )}

        {!loading && filteredDocuments.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredDocuments.map((document) => (
              <DocumentCard
                key={document._id}
                document={document}
                onView={handleViewDocument}
                onDelete={handleDeleteDocument}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && pagination.pages > 1 && (
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-2">
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page - 1 })}
              disabled={pagination.page === 1}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm sm:text-base text-gray-700 whitespace-nowrap">
              Page {pagination.page} of {pagination.pages}
            </span>
            <button
              onClick={() => setPagination({ ...pagination, page: pagination.page + 1 })}
              disabled={pagination.page >= pagination.pages}
              className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>

      {/* Modals */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
      <PreviewModal
        document={selectedDocument}
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
      />
    </div>
  );
}

export default App;
