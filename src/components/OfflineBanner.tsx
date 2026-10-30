import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineBanner: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="sticky top-[98px] inset-x-0 z-40 flex items-center justify-center p-2 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-2 bg-white dark:bg-[#141414] text-[#111111] dark:text-[#F2F2F2] border border-[#E5E5E5] dark:border-[#262626] px-4 py-2 rounded-[8px] text-[13px] font-medium">
        <WifiOff className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
        <span>تصفح أوفلاين (البيانات محفوظة على جهازك)</span>
      </div>
    </div>
  );
};
