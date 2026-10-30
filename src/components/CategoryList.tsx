import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { CATEGORIES, PRODUCTS } from '../data';

interface CategoryListProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  return (
    <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] divide-y divide-[#E5E5E5] dark:divide-[#262626] mb-8">
      {CATEGORIES.map((cat) => {
        const count = PRODUCTS.filter(p => p.category === cat.id).length;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] transition cursor-pointer text-right"
          >
            <div className="flex items-center gap-3">
              <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">
                {cat.name}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
                {count} منتج
              </span>
              <ChevronLeft className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
            </div>
          </button>
        );
      })}

      {/* Gifts & Warranty Row */}
      <button
        onClick={() => onSelectCategory('gifts')}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] transition cursor-pointer text-right"
      >
        <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">
          هدايا مع كل منشار والضمان
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
            5 هدايا مجانية
          </span>
          <ChevronLeft className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
        </div>
      </button>

      {/* Address Row */}
      <button
        onClick={() => onSelectCategory('address')}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] transition cursor-pointer text-right"
      >
        <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">
          العنوان ومقر الشركة
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
            الإسكندرية – المندرة
          </span>
          <ChevronLeft className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
        </div>
      </button>

      {/* Contact Row */}
      <button
        onClick={() => onSelectCategory('contact')}
        className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] transition cursor-pointer text-right"
      >
        <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">
          أرقام التواصل والحجز
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
            4 أرقام
          </span>
          <ChevronLeft className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
        </div>
      </button>
    </div>
  );
};
