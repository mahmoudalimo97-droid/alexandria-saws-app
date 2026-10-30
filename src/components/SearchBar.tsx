import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  showOffersOnly: boolean;
  onToggleOffersOnly: (val: boolean) => void;
  resultsCount: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  onSearchChange,
  showOffersOnly,
  onToggleOffersOnly,
  resultsCount,
}) => {
  return (
    <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-3 mb-6">
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[#6B6B6B] dark:text-[#9E9E9E]">
            <Search className="w-4 h-4 stroke-[1.75]" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث بالاسم (مثال: خميس، بدر، فيت، أتيك...)"
            className="w-full min-h-[48px] pr-10 pl-9 py-2 bg-transparent border-0 text-[16px] text-[#111111] dark:text-[#F2F2F2] placeholder:text-[#6B6B6B] dark:placeholder:text-[#9E9E9E] focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 left-0 pl-3 flex items-center text-[#6B6B6B] hover:text-[#111111] dark:hover:text-white"
              title="مسح البحث"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter and Count */}
        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0 justify-between sm:justify-start pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E5E5] dark:border-[#262626]">
          <button
            onClick={() => onToggleOffersOnly(!showOffersOnly)}
            className={`min-h-[44px] px-3.5 rounded-[12px] text-[13px] font-medium transition cursor-pointer border ${
              showOffersOnly
                ? 'bg-[#E8F0F3] dark:bg-[#1A2D36] border-[#0F3B4C] dark:border-[#7FB4C8] text-[#0F3B4C] dark:text-[#7FB4C8]'
                : 'border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white'
            }`}
          >
            العروض فقط
          </button>

          <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] px-2 py-1">
            {resultsCount} منتج
          </span>
        </div>
      </div>
    </div>
  );
};
