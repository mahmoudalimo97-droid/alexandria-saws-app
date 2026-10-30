import React from 'react';
import { 
  ShieldCheck, 
  Presentation, 
  ArrowDownCircle, 
  Sparkles, 
  Truck, 
  CreditCard, 
  Gift
} from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface HeroBannerProps {
  onBrowsePrices: () => void;
  onOpenSlideShow: () => void;
  onOpenGifts: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onBrowsePrices,
  onOpenSlideShow,
  onOpenGifts,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F3B4C] via-[#14475c] to-[#0A2631] text-white pt-8 pb-10 px-4 sm:px-6 shadow-md">
      {/* Decorative background geometry */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 rounded-full bg-[#1D6FB8]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-72 h-72 rounded-full bg-[#F2A900]/15 blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Brand Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-3.5 py-1 rounded-full text-xs font-semibold text-[#F2A900] mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#F2A900] animate-bounce" />
          <span>{COMPANY_INFO.subtitle}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F2A900]" />
          <span className="text-white">تحديث 2026</span>
        </div>

        {/* Main Title */}
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight sm:leading-snug">
          {COMPANY_INFO.name}
        </h1>

        {/* Tagline */}
        <p className="mt-3 text-base sm:text-xl font-bold text-[#F2A900] tracking-wide">
          "{COMPANY_INFO.tagline}"
        </p>

        {/* Warranty Highlight Banner */}
        <div className="mt-4 inline-flex items-center gap-2.5 bg-[#F2A900]/15 border border-[#F2A900]/40 text-[#F2A900] px-4 py-2 rounded-2xl shadow-inner">
          <ShieldCheck className="w-5 h-5 text-[#F2A900] shrink-0" />
          <span className="text-sm sm:text-base font-extrabold text-white">
            {COMPANY_INFO.warranty}
          </span>
          <span className="text-xs bg-[#1A7F4B] text-white font-bold px-2 py-0.5 rounded-full">
            معتمد
          </span>
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-6 grid grid-cols-3 gap-2 max-w-lg mx-auto text-xs text-slate-200">
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1">
            <Truck className="w-4 h-4 text-cyan-400" />
            <span className="font-bold">توصيل سريع</span>
            <span className="text-[10px] text-slate-300">لكل المحافظات</span>
          </div>
          <div 
            onClick={onOpenGifts}
            className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-white/10 transition"
          >
            <Gift className="w-4 h-4 text-[#F2A900]" />
            <span className="font-bold">5 هدايا مجانية</span>
            <span className="text-[10px] text-amber-300">مع كل منشار</span>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 flex flex-col items-center justify-center gap-1">
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span className="font-bold">كاش وتقسيط</span>
            <span className="text-[10px] text-slate-300">تسهيلات ميسرة</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={onBrowsePrices}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#F2A900] hover:bg-[#d89600] active:scale-95 text-[#0F3B4C] px-8 py-3.5 rounded-xl font-extrabold text-base sm:text-lg shadow-lg hover:shadow-[#F2A900]/20 transition cursor-pointer"
          >
            <ArrowDownCircle className="w-5 h-5 text-[#0F3B4C]" />
            <span>تصفح الأسعار الآن</span>
          </button>

          <button
            onClick={onOpenSlideShow}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:scale-95 text-white border border-white/20 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base backdrop-blur-md transition cursor-pointer"
          >
            <Presentation className="w-5 h-5 text-[#F2A900]" />
            <span>عرض سلايد شو الكاتلوج (10 صفحات)</span>
          </button>
        </div>

        {/* Small subtitle reminder */}
        <p className="mt-4 text-xs text-slate-300">
          مناشير – فرايز – مكابس – ماكينات لحام UPVC – كمبروسرات هواء
        </p>
      </div>
    </section>
  );
};
