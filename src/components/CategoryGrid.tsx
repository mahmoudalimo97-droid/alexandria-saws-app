import React from 'react';
import { 
  Disc, 
  Wrench, 
  Hammer, 
  Flame, 
  Gauge, 
  Gift, 
  Layers
} from 'lucide-react';
import { CATEGORIES } from '../data';

interface CategoryGridProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  selectedSubCategory: string;
  onSelectSubCategory: (sub: string) => void;
  onOpenGifts: () => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedSubCategory,
  onSelectSubCategory,
  onOpenGifts,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'disc':
        return <Disc className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'wrench':
        return <Wrench className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'hammer':
        return <Hammer className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'flame':
        return <Flame className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'gauge':
        return <Gauge className="w-5 h-5 sm:w-6 sm:h-6" />;
      default:
        return <Layers className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const sawsCategory = CATEGORIES.find(c => c.id === 'saws');

  return (
    <div className="mb-6 space-y-4">
      {/* Category Selection Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
        {/* 'All' button */}
        <button
          onClick={() => {
            onSelectCategory('all');
            onSelectSubCategory('الكل');
          }}
          className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer ${
            selectedCategory === 'all'
              ? 'bg-[#0F3B4C] text-white border-[#0F3B4C] shadow-md ring-2 ring-[#0F3B4C]/20'
              : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs'
          }`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition ${
            selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
          }`}>
            <Layers className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-bold">جميع الأقسام</span>
          <span className="text-[10px] opacity-75">32 منتج</span>
        </button>

        {/* Categories mapped */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onSelectSubCategory('الكل');
              }}
              style={{
                borderColor: isSelected ? cat.color : undefined,
              }}
              className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'text-white shadow-md ring-2'
                  : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {isSelected && (
                <div 
                  className="absolute inset-0 opacity-100 -z-10"
                  style={{ backgroundColor: cat.color }}
                />
              )}
              <div 
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-1.5 transition ${
                  isSelected ? 'bg-white/20 text-white' : 'text-white'
                }`}
                style={{ backgroundColor: isSelected ? undefined : cat.color }}
              >
                {getIcon(cat.icon)}
              </div>
              <span className="text-xs sm:text-sm font-bold">{cat.name}</span>
              <span className="text-[10px] opacity-80 truncate max-w-full">
                {cat.shortName}
              </span>
            </button>
          );
        })}

        {/* 'Gifts & Warranty' Button in Grid */}
        <button
          onClick={onOpenGifts}
          className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center p-3 rounded-2xl border border-amber-300 dark:border-amber-700/60 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/30 dark:to-slate-900 text-amber-900 dark:text-amber-200 text-center hover:shadow-sm transition cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-[#F2A900] text-[#0F3B4C] flex items-center justify-center mb-1.5 shadow-xs">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-xs sm:text-sm font-bold">الهدايا والضمان</span>
          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-extrabold">5 هدايا مجاناً ✔</span>
        </button>
      </div>

      {/* Saws Subcategory Tabs (When Saws or All is active) */}
      {(selectedCategory === 'saws' || selectedCategory === 'all') && sawsCategory?.subCategories && (
        <div className="bg-white dark:bg-slate-900 p-2.5 sm:p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Disc className="w-3.5 h-3.5 text-[#1D6FB8]" />
              ماركات ومجموعات المناشير:
            </span>
            {selectedSubCategory !== 'الكل' && (
              <button
                onClick={() => onSelectSubCategory('الكل')}
                className="text-[11px] text-[#1D6FB8] font-bold hover:underline"
              >
                عرض كل الماركات
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {sawsCategory.subCategories.map((sub) => {
              const isSubActive = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    onSelectCategory('saws');
                    onSelectSubCategory(sub);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer shrink-0 ${
                    isSubActive
                      ? 'bg-[#1D6FB8] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
