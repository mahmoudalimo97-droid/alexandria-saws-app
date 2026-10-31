import React from 'react';
import { Tag, Phone, Truck, Camera } from 'lucide-react';

export type MainTabType = 'prices' | 'contact' | 'services' | 'photos';

interface ThreeTabsNavProps {
  activeTab: MainTabType;
  onTabChange: (tab: MainTabType) => void;
}

export const ThreeTabsNav: React.FC<ThreeTabsNavProps> = ({
  activeTab,
  onTabChange,
}) => {
  const tabs = [
    { id: 'prices' as MainTabType, label: 'الأسعار', icon: Tag },
    { id: 'contact' as MainTabType, label: 'التواصل', icon: Phone },
    { id: 'services' as MainTabType, label: 'الخدمات', icon: Truck },
    { id: 'photos' as MainTabType, label: 'صور المعدات', icon: Camera },
  ];

  return (
    <nav aria-label="أقسام الكاتلوج الرئيسية" className="sticky top-[51px] z-30 bg-white dark:bg-[#0E0E0E] border-b border-[#E5E5E5] dark:border-[#262626] shrink-0">
      <div className="w-full px-1 sm:px-2">
        <div className="grid grid-cols-4 gap-0.5 sm:gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`min-h-[48px] py-2 px-1 text-center transition cursor-pointer border-b-2 flex items-center justify-center gap-1 sm:gap-1.5 rounded-t-[6px] select-none ${
                  isActive
                    ? 'border-[#0F3B4C] dark:border-[#7FB4C8] text-[#0F3B4C] dark:text-[#7FB4C8] bg-[#0F3B4C]/5 dark:bg-[#7FB4C8]/10 font-bold'
                    : 'border-transparent text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900/50'
                }`}
                title={tab.label}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                <span className="text-[11px] xs:text-[12px] sm:text-[13px] whitespace-nowrap">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export const FourTabsNav = ThreeTabsNav;

