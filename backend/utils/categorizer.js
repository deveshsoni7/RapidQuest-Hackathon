import natural from 'natural';

const { PorterStemmer } = natural;

// Marketing-related keywords for categorization
const categoryKeywords = {
  'Campaign': ['campaign', 'marketing', 'promotion', 'advertisement', 'advert', 'ad', 'launch'],
  'Brand': ['brand', 'branding', 'identity', 'logo', 'guideline', 'style'],
  'Content': ['content', 'blog', 'article', 'post', 'social', 'media'],
  'Strategy': ['strategy', 'plan', 'planning', 'roadmap', 'objective', 'goal'],
  'Analytics': ['analytics', 'report', 'data', 'metric', 'kpi', 'performance', 'insight'],
  'Sales': ['sales', 'pitch', 'proposal', 'client', 'customer', 'deal'],
  'Product': ['product', 'feature', 'specification', 'requirement'],
  'Event': ['event', 'conference', 'webinar', 'workshop', 'meeting'],
  'Research': ['research', 'study', 'survey', 'analysis', 'findings'],
  'Design': ['design', 'mockup', 'wireframe', 'prototype', 'ui', 'ux']
};

// Project-related keywords
const projectKeywords = {
  'Q1 Campaign': ['q1', 'quarter', 'january', 'february', 'march'],
  'Q2 Campaign': ['q2', 'april', 'may', 'june'],
  'Q3 Campaign': ['q3', 'july', 'august', 'september'],
  'Q4 Campaign': ['q4', 'october', 'november', 'december'],
  'Product Launch': ['launch', 'release', 'new product'],
  'Brand Refresh': ['refresh', 'rebrand', 'update brand']
};

// Team-related keywords
const teamKeywords = {
  'Marketing': ['marketing', 'campaign', 'promotion'],
  'Content': ['content', 'blog', 'copy', 'writing'],
  'Design': ['design', 'creative', 'visual', 'graphic'],
  'Analytics': ['analytics', 'data', 'report', 'metric'],
  'Sales': ['sales', 'revenue', 'client', 'customer']
};

const stemmer = PorterStemmer;

const extractKeywords = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  return tokens.map(token => stemmer.stem(token));
};

const calculateMatchScore = (text, keywordList) => {
  const textKeywords = extractKeywords(text);
  let score = 0;
  
  keywordList.forEach(keyword => {
    const stemmedKeyword = stemmer.stem(keyword.toLowerCase());
    if (textKeywords.includes(stemmedKeyword)) {
      score += 1;
    }
  });
  
  return score;
};

export const categorizeDocument = (title, description, content) => {
  const fullText = `${title} ${description} ${content}`.toLowerCase();
  
  // Find best matching category
  let bestCategory = 'Uncategorized';
  let bestScore = 0;
  
  Object.entries(categoryKeywords).forEach(([category, keywords]) => {
    const score = calculateMatchScore(fullText, keywords);
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  });
  
  // Find best matching project
  let bestProject = 'General';
  let projectScore = 0;
  
  Object.entries(projectKeywords).forEach(([project, keywords]) => {
    const score = calculateMatchScore(fullText, keywords);
    if (score > projectScore) {
      projectScore = score;
      bestProject = project;
    }
  });
  
  // Find best matching team
  let bestTeam = 'General';
  let teamScore = 0;
  
  Object.entries(teamKeywords).forEach(([team, keywords]) => {
    const score = calculateMatchScore(fullText, keywords);
    if (score > teamScore) {
      teamScore = score;
      bestTeam = team;
    }
  });
  
  // Extract tags (simple keyword extraction)
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(fullText);
  const stopWords = natural.stopwords;
  const tags = tokens
    .filter(token => token.length > 3 && !stopWords.includes(token))
    .slice(0, 10);
  
  return {
    category: bestCategory,
    project: bestProject,
    team: bestTeam,
    tags: [...new Set(tags)] // Remove duplicates
  };
};

export const extractKeywordsFromText = (text) => {
  const tokenizer = new natural.WordTokenizer();
  const tokens = tokenizer.tokenize(text.toLowerCase());
  const stopWords = natural.stopwords;
  
  return tokens
    .filter(token => token.length > 3 && !stopWords.includes(token))
    .slice(0, 20);
};

