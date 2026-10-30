import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Navigation, Copy, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(COMPANY_INFO.location);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* 1) Address Card */}
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-[8px] bg-[#E8F0F3] dark:bg-[#1A2D36] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8] shrink-0 mt-0.5">
            <MapPin className="w-5 h-5 stroke-[1.75]" />
          </div>
          <div className="flex-1">
            <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] block">
              العنوان ومقر الشركة
            </span>
            <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F2F2F2] mt-0.5">
              {COMPANY_INFO.location}
            </h3>
            <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-1">
              متاح المعاينة والتشغيل العملي لكافة الماكينات والمناشير.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-[#E5E5E5] dark:border-[#262626] grid grid-cols-2 gap-2">
          <a
            href="https://maps.google.com/?q=Alexandria+Mandara"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-3 flex items-center justify-center gap-1.5 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-medium transition cursor-pointer"
          >
            <Navigation className="w-4 h-4 stroke-[1.75]" />
            <span>خرائط Google</span>
          </a>

          <button
            onClick={handleCopy}
            className="min-h-[48px] px-3 flex items-center justify-center gap-1.5 rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#F2F2F2] hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] text-[13px] font-medium transition cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E]" />
                <span>نسخ العنوان</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2) WhatsApp Direct Button */}
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-5">
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] px-4 py-3 flex items-center justify-between rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] transition"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-5 h-5 stroke-[1.75]" />
            <div className="text-right">
              <span className="text-[13px] opacity-80 block">محادثة واتساب مباشرة:</span>
              <span className="text-[16px] font-bold font-mono dir-ltr">
                {COMPANY_INFO.primaryPhone}
              </span>
            </div>
          </div>
          <span className="text-[13px] font-medium underline">
            إرسال رسالة
          </span>
        </a>
      </div>

      {/* 3) 4 Phone Numbers */}
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-5">
        <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F2F2F2] mb-3 pb-2 border-b border-[#E5E5E5] dark:border-[#262626]">
          أرقام الاتصال المباشر (اضغط للاتصال):
        </h3>

        <div className="space-y-2">
          {COMPANY_INFO.phones.map((phone) => (
            <a
              key={phone.number}
              href={`tel:${phone.number}`}
              className="min-h-[48px] px-4 py-3 flex items-center justify-between rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] transition text-[#111111] dark:text-[#F2F2F2]"
            >
              <div>
                <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] block">
                  {phone.label}
                </span>
                <span className="text-[16px] font-bold font-mono dir-ltr">
                  {phone.number}
                </span>
              </div>

              <div className="w-9 h-9 rounded-full border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8]">
                <Phone className="w-4 h-4 stroke-[1.75]" />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Slogan */}
      <div className="text-center py-2">
        <p className="text-[16px] font-bold text-[#0F3B4C] dark:text-[#7FB4C8]">
          الحق العروض قبل نفاد الكمية!
        </p>
        <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-1">
          شركة الإسكندرية – اشتغل أسرع، انتج أكتر، اكسب أعلى
        </p>
      </div>
    </div>
  );
};
