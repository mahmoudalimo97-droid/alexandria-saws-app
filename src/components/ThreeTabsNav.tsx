import React from 'react';

export type MainTabType = 'prices' | 'contact' | 'services';

interface ThreeTabsNavProps {
  activeTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
}

export const ThreeTabsNav: React.FC<ThreeTabsNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs: { id: MainTabType; label: string }[] = [
    { id: 'prices', label: 'الأسعار' },
    { id: 'contact', label: 'التواصل' },
    { id: 'services', label: 'الخدمات' },
  ];

  return (
    <div className="sticky top-[51px] z-30 bg-white dark:bg-[#0E0E0E] border-b border-[#E5E5E5] dark:border-[#262626] shrink-0">
      <div className="w-full px-3">
        <div className="grid grid-cols-3 gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`min-h-[48px] py-3 text-center text-[16px] transition cursor-pointer border-b-2 ${
                  isActive
                    ? 'border-[#0F3B4C] dark:border-[#7FB4C8] text-[#0F3B4C] dark:text-[#7FB4C8] font-bold'
                    : 'border-transparent text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white font-medium'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
