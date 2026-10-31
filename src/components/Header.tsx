import React from 'react';
import { Phone, MessageCircle, Moon, Sun } from 'lucide-react';
import { COMPANY_INFO, resolveAssetUrl } from '../data';

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
    <header className="sticky top-0 z-40 bg-[#2F3437] dark:bg-[#25292C] text-white border-b border-black/15 dark:border-white/10 shrink-0 transition-colors">
      <div className="w-full px-3 py-2.5 flex items-center justify-between gap-2">
        {/* Brand */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer select-none shrink-0"
        >
          <img 
            src={resolveAssetUrl('/icons/icon-192.png')} 
            alt="شعار شركة الإسكندرية للمناشير" 
            className="w-8 h-8 rounded-[8px] object-cover border border-white/20 shrink-0 shadow-xs" 
          />
          <div>
            <h1 className="text-[14px] font-bold leading-tight text-white">
              شركة الإسكندرية
            </h1>
            <p className="text-[11px] text-white/80">
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
            className="min-h-[38px] px-2.5 flex items-center gap-1 rounded-[10px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[12px] font-medium transition active:scale-95 shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 stroke-[2]" />
            <span>واتساب</span>
          </a>

          {/* Call Direct */}
          <a
            href={`tel:${COMPANY_INFO.primaryPhone}`}
            className="min-h-[38px] px-2.5 flex items-center gap-1 rounded-[10px] border border-white/25 text-white text-[12px] font-medium hover:bg-white/10 active:bg-white/15 transition active:scale-95"
          >
            <Phone className="w-3.5 h-3.5 text-white" />
            <span>اتصال</span>
          </a>

          {/* Theme Switch */}
          <button
            onClick={onToggleDark}
            className="w-9 h-9 flex items-center justify-center rounded-[10px] border border-white/25 text-white hover:bg-white/10 active:bg-white/15 transition cursor-pointer active:scale-95"
            title={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
            aria-label={isDark ? "الوضع الفاتح" : "الوضع الداكن"}
          >
            {isDark ? <Sun className="w-4 h-4 stroke-[2] text-white" /> : <Moon className="w-4 h-4 stroke-[2] text-white" />}
          </button>
        </div>
      </div>
    </header>
  );
};
