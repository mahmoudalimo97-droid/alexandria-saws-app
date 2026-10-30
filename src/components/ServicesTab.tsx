import React from 'react';
import { Truck, ShieldCheck, CreditCard, Check, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data';

export const ServicesTab: React.FC = () => {
  const handleWhatsApp = () => {
    const text = `السلام عليكم ورحمة الله،\nأود الاستفسار بخصوص خدمات الشحن والتوصيل وأنظمة الكاش والتقسيط في شركة الإسكندرية.`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* 3 Main Services Requested */}
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-5">
        <h2 className="text-[22px] font-bold text-[#111111] dark:text-[#F2F2F2] mb-4 pb-2 border-b border-[#E5E5E5] dark:border-[#262626]">
          الخدمات
        </h2>

        <div className="space-y-3">
          {/* Service 1: توصيل يومي */}
          <div className="flex items-start gap-3 p-3.5 rounded-[12px] bg-[#F8FAFC] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#262626]">
            <div className="w-10 h-10 rounded-[8px] bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center shrink-0 text-[#0F3B4C] dark:text-[#7FB4C8]">
              <Truck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F2F2F2]">
                توصيل يومي
              </h3>
              <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-0.5">
                توصيل فوري لجميع محافظات ومراكز جمهورية مصر العربية.
              </p>
            </div>
          </div>

          {/* Service 2: شحن سريع وآمن */}
          <div className="flex items-start gap-3 p-3.5 rounded-[12px] bg-[#F8FAFC] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#262626]">
            <div className="w-10 h-10 rounded-[8px] bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center shrink-0 text-[#0F3B4C] dark:text-[#7FB4C8]">
              <ShieldCheck className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F2F2F2]">
                شحن سريع وآمن
              </h3>
              <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-0.5">
                شحن وتغليف محكم حتى باب الورشة مع إمكانية المعاينة والتشغيل قبل الاستلام.
              </p>
            </div>
          </div>

          {/* Service 3: كاش وتقسيط */}
          <div className="flex items-start gap-3 p-3.5 rounded-[12px] bg-[#F8FAFC] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#262626]">
            <div className="w-10 h-10 rounded-[8px] bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center shrink-0 text-[#0F3B4C] dark:text-[#7FB4C8]">
              <CreditCard className="w-5 h-5 stroke-[1.75]" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F2F2F2]">
                كاش وتقسيط
              </h3>
              <p className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] mt-0.5">
                أنظمة وتسهيلات دفع مرنة ومتعددة تناسب جميع أصحاب الورش والمصانع.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Gifts & Warranty Section */}
      <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 sm:p-5">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E5E5E5] dark:border-[#262626]">
          <h3 className="text-[16px] font-bold text-[#111111] dark:text-[#F2F2F2]">
            هدايا مجانية مع كل منشار
          </h3>
          <span className="text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] bg-[#E8F0F3] dark:bg-[#1A2D36] px-2.5 py-0.5 rounded-[6px]">
            ضمان 5 سنوات
          </span>
        </div>

        <div className="divide-y divide-[#E5E5E5] dark:divide-[#262626]">
          {COMPANY_INFO.giftsWithSaw.map((gift, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full border border-[#0F3B4C] dark:border-[#7FB4C8] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8] shrink-0">
                  <Check className="w-3 h-3 stroke-[2]" />
                </div>
                <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">
                  {gift}
                </span>
              </div>
              <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
                مجانًا
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={handleWhatsApp}
          className="mt-5 w-full min-h-[48px] px-6 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[16px] font-medium flex items-center justify-center gap-2 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 stroke-[1.75]" />
          <span>استفسر عن الخدمات والتقسيط</span>
        </button>
      </div>
    </div>
  );
};
