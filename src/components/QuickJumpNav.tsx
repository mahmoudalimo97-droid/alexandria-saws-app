import React from 'react';

interface QuickJumpNavProps {
  selectedTab: string;
  onSelectTab: (tabId: string) => void;
}

export const QuickJumpNav: React.FC<QuickJumpNavProps> = ({
  selectedTab,
  onSelectTab,
}) => {
  const tabs = [
    { id: 'all', label: 'كل المنتجات' },
    { id: 'saws', label: 'المناشير' },
    { id: 'mills', label: 'الفرايز' },
    { id: 'presses', label: 'المكابس' },
    { id: 'welding', label: 'ماكينات اللحام' },
    { id: 'compressors', label: 'الكمبروسر' },
    { id: 'gifts', label: 'الهدايا والضمان' },
    { id: 'address', label: 'العنوان' },
    { id: 'contact', label: 'التواصل' },
  ];

  return (
    <div className="sticky top-[57px] z-30 bg-white dark:bg-[#0E0E0E] border-b border-[#E5E5E5] dark:border-[#262626]">
      <div className="max-w-4xl mx-auto px-4 flex items-center gap-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`py-3 text-[16px] whitespace-nowrap transition cursor-pointer border-b-2 ${
                isActive
                  ? 'text-[#0F3B4C] dark:text-[#7FB4C8] border-[#0F3B4C] dark:border-[#7FB4C8] font-bold'
                  : 'text-[#6B6B6B] dark:text-[#9E9E9E] border-transparent hover:text-[#111111] dark:hover:text-white font-medium'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
