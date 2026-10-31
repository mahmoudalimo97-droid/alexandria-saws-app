import React from 'react';
import { Tag, Camera, ArrowLeft } from 'lucide-react';
import { MainTabType } from './ThreeTabsNav';
import { resolveAssetUrl } from '../data';

interface IntroSplashProps {
  onEnter: (tab?: MainTabType) => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onEnter }) => {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F2F2] p-6 select-none">
      <div className="w-full max-w-sm mx-auto text-center flex flex-col items-center">
        {/* Official Brand Logo */}
        <img
          src={resolveAssetUrl('/icons/icon-512.png')}
          alt="شعار شركة الإسكندرية للمناشير"
          className="w-24 h-24 rounded-[20px] shadow-lg mb-5 object-cover border border-[#E5E5E5] dark:border-[#262626]"
        />

        {/* Company Title */}
        <h1 className="text-[20px] font-bold leading-relaxed">
          شركة الإسكندرية للمناشير وآلات الألوميتال والـ UPVC
        </h1>

        {/* Slogan */}
        <p className="mt-3 text-[14px] font-medium text-[#6B6B6B] dark:text-[#9E9E9E]">
          اشتغل أسرع – انتج أكتر – اكسب أعلى
        </p>

        {/* Direct Action Buttons */}
        <div className="mt-7 w-full space-y-2.5">
          {/* 1) Prices */}
          <button
            onClick={() => onEnter('prices')}
            className="w-full min-h-[48px] px-6 flex items-center justify-center gap-2 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[15px] font-bold transition active:scale-95 cursor-pointer shadow-xs"
          >
            <Tag className="w-4 h-4" />
            <span>عرض الأسعار والكاتلوج</span>
            <ArrowLeft className="w-4 h-4 rotate-180 mr-auto" />
          </button>

          {/* 2) Equipment Photos Gallery */}
          <button
            onClick={() => onEnter('photos')}
            className="w-full min-h-[48px] px-6 flex items-center justify-center gap-2 rounded-[12px] border border-[#0F3B4C] dark:border-[#7FB4C8] text-[#0F3B4C] dark:text-[#7FB4C8] text-[15px] font-bold hover:bg-[#0F3B4C]/5 dark:hover:bg-[#7FB4C8]/10 transition active:scale-95 cursor-pointer"
          >
            <Camera className="w-4 h-4" />
            <span>معرض صور المعدات</span>
            <ArrowLeft className="w-4 h-4 rotate-180 mr-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};
