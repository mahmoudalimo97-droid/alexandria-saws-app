import React from 'react';
import { Phone, MessageCircle, Moon, Sun } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface HeaderProps {
  isDark: boolean;
  onToggleDark: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleDark,
  onNavigateHome,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F2F2] border-b border-[#E5E5E5] dark:border-[#262626] shrink-0">
      <div className="w-full px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <div className="w-8 h-8 rounded-[8px] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8] shrink-0">
            <span className="text-[14px] font-bold">إ</span>
          </div>
          <div>
            <h1 className="text-[14px] font-bold leading-tight">
              شركة الإسكندرية
            </h1>
            <p className="text-[11px] text-[#6B6B6B] dark:text-[#9E9E9E]">
              كاتلوج الأسعار
            </p>
          </div>
        </div>

        {/* Essential Actions: WhatsApp, Call, Theme Toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* WhatsApp Direct */}
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[38px] px-2.5 flex items-center gap-1 rounded-[10px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[12px] font-medium transition"
          >
            <MessageCircle className="w-3.5 h-3.5 stroke-[2]" />
            <span>واتساب</span>
          </a>

          {/* Call Direct */}
          <a
            href={`tel:${COMPANY_INFO.primaryPhone}`}
            className="min-h-[38px] px-2.5 flex items-center gap-1 rounded-[10px] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#F2F2F2] text-[12px] font-medium hover:bg-[#F3F3F3] dark:hover:bg-[#1A1A1A] transition"
          >
            <Phone className="w-3.5 h-3.5 text-[#6B6B6B] dark:text-[#9E9E9E]" />
            <span>اتصال</span>
          </a>

          {/* Theme Switch */}
          <button
            onClick={onToggleDark}
            className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white transition cursor-pointer"
            title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
          >
            {isDark ? <Sun className="w-4 h-4 stroke-[1.75]" /> : <Moon className="w-4 h-4 stroke-[1.75]" />}
          </button>
        </div>
      </div>
    </header>
  );
};
