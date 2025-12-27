
import React from 'react';
import { NewsArticle } from '../types';

interface NewsSectionProps {
  articles: NewsArticle[];
  loading: boolean;
}

const NewsSection: React.FC<NewsSectionProps> = ({ articles, loading }) => {
  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-gray-100 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-100 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-bold text-gray-800">Latest Reds News</h2>
      {articles.length === 0 ? (
        <div className="text-center p-8 text-gray-500">No news found today. Check back soon!</div>
      ) : (
        articles.map((article, index) => (
          <a 
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col md:flex-row gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-all border border-transparent hover:border-red-100"
          >
            <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
              <img 
                src={`https://picsum.photos/seed/${article.title}/400/300`} 
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col flex-grow">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold uppercase text-red-600 tracking-wider">{article.source}</span>
                <span className="text-xs text-gray-400">• {article.publishedAt}</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors mb-2 leading-tight">
                {article.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                {article.summary}
              </p>
            </div>
          </a>
        ))
      )}
    </div>
  );
};

export default NewsSection;
