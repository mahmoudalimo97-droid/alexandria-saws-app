import React, { useState } from 'react';
import { MapPin, Navigation, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const AddressSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMPANY_INFO.location);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="address-section" className="mb-8 scroll-mt-24">
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-[8px] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center shrink-0 text-[#0F3B4C] dark:text-[#7FB4C8] mt-1 sm:mt-0">
              <MapPin className="w-5 h-5 stroke-[1.75]" />
            </div>

            <div>
              <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] font-normal block">
                العنوان ومقر المعرض
              </span>
              <h3 className="text-[22px] font-bold text-[#111111] dark:text-[#F2F2F2] mt-1 leading-snug">
                {COMPANY_INFO.location}
              </h3>
              <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-1">
                معاينة وتشغيل كافة الماكينات على الطبيعة قبل الاستلام.
              </p>
            </div>
          </div>

          {/* Action Buttons (48px height, simple outline / accent) */}
          <div className="flex items-center gap-2 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E5E5E5] dark:border-[#262626]">
            <a
              href="https://maps.google.com/?q=Alexandria+Mandara"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none min-h-[48px] px-5 flex items-center justify-center gap-2 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-medium transition cursor-pointer"
            >
              <Navigation className="w-4 h-4 stroke-[1.75]" />
              <span>موقعنا على الخريطة</span>
            </a>

            <button
              onClick={handleCopy}
              className="min-h-[48px] px-4 flex items-center justify-center gap-2 rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#F2F2F2] hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] text-[13px] font-medium transition cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>تم النسخ</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
                  <span>نسخ</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
