import Document from '../models/Document.js';

// Smart search with text search and filters
export const searchDocuments = async (req, res) => {
  try {
    const { q, category, project, team, fileType, sortBy = 'relevance' } = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    
    // Build filter
    const filter = {};
    if (category) filter.category = category;
    if (project) filter.project = project;
    if (team) filter.team = team;
    if (fileType) filter.fileType = fileType;
    
    let query;
    
    // Text search
    if (q && q.trim()) {
      query = Document.find({
        ...filter,
        $text: { $search: q }
      }, {
        score: { $meta: 'textScore' }
      });
      
      // Sort by relevance, then by views, then by date
      query = query.sort({ score: { $meta: 'textScore' }, viewCount: -1, uploadDate: -1 });
    } else {
      // No search query, just filter
      query = Document.find(filter);
      
      // Sort options
      switch (sortBy) {
        case 'date':
          query = query.sort({ uploadDate: -1 });
          break;
        case 'views':
          query = query.sort({ viewCount: -1, uploadDate: -1 });
          break;
        case 'name':
          query = query.sort({ title: 1 });
          break;
        default:
          // Default: Sort by most views first, then by date
          query = query.sort({ viewCount: -1, uploadDate: -1 });
      }
    }
    
    const documents = await query
      .skip(skip)
      .limit(limit)
      .select('-content'); // Exclude full content for search results
    
    const total = await Document.countDocuments(
      q && q.trim() 
        ? { ...filter, $text: { $search: q } }
        : filter
    );
    
    res.json({
      success: true,
      data: documents,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      },
      query: q || null
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching documents',
      error: error.message
    });
  }
};

// Get search suggestions/autocomplete
export const getSearchSuggestions = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim().length < 2) {
      return res.json({
        success: true,
        data: []
      });
    }
    
    // Search in titles, tags, and keywords
    const documents = await Document.find({
      $or: [
        { title: { $regex: q, $options: 'i' } },
        { tags: { $regex: q, $options: 'i' } },
        { keywords: { $regex: q, $options: 'i' } }
      ]
    })
    .limit(10)
    .select('title tags keywords category');
    
    // Extract unique suggestions
    const suggestions = new Set();
    documents.forEach(doc => {
      if (doc.title.toLowerCase().includes(q.toLowerCase())) {
        suggestions.add(doc.title);
      }
      doc.tags.forEach(tag => {
        if (tag.toLowerCase().includes(q.toLowerCase())) {
          suggestions.add(tag);
        }
      });
    });
    
    res.json({
      success: true,
      data: Array.from(suggestions).slice(0, 8)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting suggestions',
      error: error.message
    });
  }
};

// Get popular searches
export const getPopularSearches = async (req, res) => {
  try {
    // Get documents sorted by view count
    const popularDocs = await Document.find()
      .sort({ viewCount: -1 })
      .limit(10)
      .select('title keywords tags');
    
    const popularTerms = new Set();
    popularDocs.forEach(doc => {
      doc.keywords.slice(0, 3).forEach(kw => popularTerms.add(kw));
      doc.tags.slice(0, 2).forEach(tag => popularTerms.add(tag));
    });
    
    res.json({
      success: true,
      data: Array.from(popularTerms).slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error getting popular searches',
      error: error.message
    });
  }
};

