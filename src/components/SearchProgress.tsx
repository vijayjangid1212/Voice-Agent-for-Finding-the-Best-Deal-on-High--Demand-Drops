import React from 'react';
import { Search, CheckCircle } from 'lucide-react';

interface SearchProgressProps {
  isSearching: boolean;
  progress: number;
}

const SearchProgress: React.FC<SearchProgressProps> = ({ isSearching, progress }) => {
  if (!isSearching && progress === 0) return null;
  
  return (
    <div className="w-full mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          {isSearching ? (
            <Search size={20} className="mr-2 text-blue-600 animate-pulse" />
          ) : (
            <CheckCircle size={20} className="mr-2 text-green-600" />
          )}
          <span className="font-medium">
            {isSearching 
              ? `Searching for deals (${progress}%)...` 
              : 'Search complete!'}
          </span>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${isSearching ? 'bg-blue-600' : 'bg-green-600'}`} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SearchProgress;