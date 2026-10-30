import React from 'react';
import { MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="sticky bottom-4 left-4 z-40 select-none w-fit mr-auto ml-3 pointer-events-auto">
      <a
        href={COMPANY_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] border border-white/20 dark:border-black/20 transition cursor-pointer"
        title="محادثة واتساب"
      >
        <MessageCircle className="w-6 h-6 stroke-[1.75]" />
      </a>
    </div>
  );
};
