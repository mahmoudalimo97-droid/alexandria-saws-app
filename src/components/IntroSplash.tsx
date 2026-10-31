import React from 'react';
import { Tag, Camera, ArrowLeft } from 'lucide-react';
import { MainTabType } from './ThreeTabsNav';
import { resolveAssetUrl } from '../data';

interface IntroSplashProps {
  onEnter: (tab?: MainTabType) => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onEnter }) => {
  return (
    <div 
      style={{
        height: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
      className="fixed inset-0 z-50 bg-[#0B3A82] text-white p-4 sm:p-6 select-none box-border"
    >
      <div className="w-full max-w-sm mx-auto text-center flex flex-col items-center justify-center my-auto">
        {/* Official Brand Logo */}
        <img
          src={resolveAssetUrl('/icons/icon-512.png')}
          alt="شعار شركة الإسكندرية للمناشير"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-[18px] sm:rounded-[20px] shadow-lg mb-3 sm:mb-4 object-cover border border-white/20"
        />

        {/* Company Title */}
        <h1 className="text-[17px] sm:text-[20px] font-bold leading-snug sm:leading-relaxed text-white">
          شركة الإسكندرية للمناشير وآلات الألوميتال والـ UPVC
        </h1>

        {/* Slogan */}
        <p className="mt-2 text-[13px] sm:text-[14px] font-medium text-white/80">
          اشتغل أسرع – انتج أكتر – اكسب أعلى
        </p>

        {/* Direct Action Buttons: immediately visible in the center area, never below the fold */}
        <div className="mt-5 sm:mt-6 w-full space-y-2.5">
          {/* 1) Prices */}
          <button
            onClick={() => onEnter('prices')}
            className="w-full min-h-[46px] sm:min-h-[48px] px-5 flex items-center justify-center gap-2 rounded-[12px] bg-white text-[#0B3A82] text-[15px] font-bold transition active:scale-95 cursor-pointer shadow-md"
          >
            <Tag className="w-4 h-4" />
            <span>عرض الأسعار والكاتلوج</span>
            <ArrowLeft className="w-4 h-4 rotate-180 mr-auto" />
          </button>

          {/* 2) Equipment Photos Gallery */}
          <button
            onClick={() => onEnter('photos')}
            className="w-full min-h-[46px] sm:min-h-[48px] px-5 flex items-center justify-center gap-2 rounded-[12px] border border-white/40 text-white hover:bg-white/10 text-[15px] font-bold transition active:scale-95 cursor-pointer"
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
