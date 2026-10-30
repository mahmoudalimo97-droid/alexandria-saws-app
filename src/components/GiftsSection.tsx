import React from 'react';
import { Check, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data';

interface GiftsSectionProps {
  onWhatsAppOrder: () => void;
}

export const GiftsSection: React.FC<GiftsSectionProps> = ({ onWhatsAppOrder }) => {
  return (
    <section id="gifts-section" className="mb-8 scroll-mt-24">
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#E5E5E5] dark:border-[#262626]">
          <div>
            <h3 className="text-[22px] font-bold text-[#111111] dark:text-[#F2F2F2]">
              هدايا مع كل منشار
            </h3>
            <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-0.5">
              تُسلّم كاملة فور استلام أي منشار
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] bg-[#E8F0F3] dark:bg-[#1A2D36] px-3 py-1.5 rounded-[8px]">
            <ShieldCheck className="w-4 h-4 stroke-[1.75]" />
            <span>ضمان 5 سنوات معتمد</span>
          </div>
        </div>

        {/* Gifts Checklist */}
        <div className="divide-y divide-[#E5E5E5] dark:divide-[#262626]">
          {COMPANY_INFO.giftsWithSaw.map((gift, idx) => (
            <div
              key={idx}
              className="py-3 flex items-center justify-between text-right"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border border-[#0F3B4C] dark:border-[#7FB4C8] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8] shrink-0">
                  <Check className="w-3 h-3 stroke-[2]" />
                </div>
                <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">
                  {gift}
                </span>
              </div>

              <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] font-normal">
                مجانًا
              </span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-[#E5E5E5] dark:border-[#262626] flex justify-end">
          <button
            onClick={onWhatsAppOrder}
            className="w-full sm:w-auto min-h-[48px] px-6 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[16px] font-medium transition cursor-pointer"
          >
            احجز منشارك الآن مع الهدايا
          </button>
        </div>
      </div>
    </section>
  );
};
