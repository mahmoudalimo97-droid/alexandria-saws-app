import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface IntroSplashProps {
  onEnter: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onEnter }) => {
  // Removed automatic timer so user enters manually by pressing the button
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F2F2] p-6 select-none">
      <div className="w-full max-w-sm mx-auto text-center flex flex-col items-center">
        {/* Minimalist Logo Mark */}
        <div className="w-14 h-14 rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] bg-[#FFFFFF] dark:bg-[#141414] flex items-center justify-center mb-6">
          <div className="w-6 h-6 rounded-full border-2 border-[#0F3B4C] dark:border-[#7FB4C8]" />
        </div>

        {/* Company Title */}
        <h1 className="text-[22px] font-bold leading-relaxed">
          شركة الإسكندرية للمناشير وآلات الألوميتال والـ UPVC
        </h1>

        {/* Slogan */}
        <p className="mt-4 text-[16px] font-medium text-[#6B6B6B] dark:text-[#9E9E9E]">
          اشتغل أسرع – انتج أكتر – اكسب أعلى
        </p>

        {/* Manual Enter Button (User presses this to view prices) */}
        <button
          onClick={onEnter}
          className="mt-8 w-full min-h-[48px] px-8 flex items-center justify-center gap-2.5 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[16px] font-medium transition active:scale-95 cursor-pointer"
        >
          <span>عرض الأسعار</span>
          <ArrowLeft className="w-4 h-4 rotate-180" />
        </button>
      </div>
    </div>
  );
};
