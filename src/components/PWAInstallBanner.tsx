import React, { useState } from 'react';
import { Download, RefreshCw, X, Share2, PlusSquare } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallBanner: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install, hasUpdate, updateApp } = usePWAInstall();
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // If already installed in standalone mode and no update, show nothing
  if (isInstalled && !hasUpdate) {
    return null;
  }

  // If dismissed by user during this session and no update
  if (dismissed && !hasUpdate) {
    return null;
  }

  return (
    <>
      {/* 1) Update Available Bar */}
      {hasUpdate && (
        <div className="bg-[#E8F0F3] dark:bg-[#1A2D36] border-b border-[#0F3B4C]/20 dark:border-[#7FB4C8]/30 px-4 py-2.5">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3 text-[13px]">
            <div className="flex items-center gap-2 text-[#0F3B4C] dark:text-[#7FB4C8] font-medium">
              <RefreshCw className="w-4 h-4 animate-spin text-[#0F3B4C] dark:text-[#7FB4C8]" />
              <span>يوجد تحديث جديد للأسعار</span>
            </div>
            <button
              onClick={updateApp}
              className="min-h-[36px] px-3.5 rounded-[8px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-medium cursor-pointer transition active:scale-95"
            >
              تحديث الآن
            </button>
          </div>
        </div>
      )}

      {/* 2) PWA Install Prompt Bar (Only if not standalone and installable / iOS) */}
      {!isInstalled && !dismissed && (isInstallable || isIOS) && (
        <div className="bg-white dark:bg-[#141414] border-b border-[#E5E5E5] dark:border-[#262626] px-4 py-2.5 transition">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-right">
              <div className="w-8 h-8 rounded-[8px] bg-[#E8F0F3] dark:bg-[#1A2D36] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8] shrink-0">
                <Download className="w-4 h-4 stroke-[2]" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-[#111111] dark:text-[#F2F2F2]">
                  تثبيت الكاتلوج على هاتفك
                </div>
                <div className="text-[11px] text-[#6B6B6B] dark:text-[#9E9E9E]">
                  لتصفح الأسعار أوفلاين كأي تطبيق
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isInstallable && (
                <button
                  onClick={install}
                  className="min-h-[36px] px-3 rounded-[8px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[12px] font-medium transition cursor-pointer"
                >
                  تثبيت التطبيق
                </button>
              )}

              {isIOS && (
                <button
                  onClick={() => setShowIOSModal(true)}
                  className="min-h-[36px] px-3 rounded-[8px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[12px] font-medium transition cursor-pointer"
                >
                  طريقة التثبيت
                </button>
              )}

              <button
                onClick={() => setDismissed(true)}
                className="w-8 h-8 rounded-[8px] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white transition"
                title="إخفاء"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3) iOS Safari Step-by-Step Modal */}
      {showIOSModal && (
        <div 
          className="fixed sm:absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => setShowIOSModal(false)}
        >
          <div 
            className="w-full max-w-sm bg-white dark:bg-[#141414] rounded-[16px] border border-[#E5E5E5] dark:border-[#262626] p-5 text-right text-[#111111] dark:text-[#F2F2F2]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5E5] dark:border-[#262626]">
              <h3 className="text-[16px] font-bold">تثبيت التطبيق على آيفون</h3>
              <button 
                onClick={() => setShowIOSModal(false)}
                className="w-8 h-8 rounded-full border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-center text-[#6B6B6B]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-3 text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#E8F0F3] dark:bg-[#1A2D36] text-[#0F3B4C] dark:text-[#7FB4C8] flex items-center justify-center font-bold shrink-0 text-[12px]">
                  1
                </div>
                <div className="flex-1">
                  <span>اضغط على زر <strong>المشاركة</strong></span>
                  <div className="inline-flex items-center gap-1 mx-1.5 px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#1C1C1C]">
                    <Share2 className="w-3.5 h-3.5 text-[#0F3B4C] dark:text-[#7FB4C8]" />
                  </div>
                  <span>في شريط Safari بالأسفل.</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#E8F0F3] dark:bg-[#1A2D36] text-[#0F3B4C] dark:text-[#7FB4C8] flex items-center justify-center font-bold shrink-0 text-[12px]">
                  2
                </div>
                <div className="flex-1">
                  <span>مرّر القائمة واضغط على <strong>إضافة إلى الشاشة الرئيسية</strong></span>
                  <div className="inline-flex items-center gap-1 mx-1.5 px-1.5 py-0.5 rounded border border-[#E5E5E5] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#1C1C1C]">
                    <PlusSquare className="w-3.5 h-3.5 text-[#0F3B4C] dark:text-[#7FB4C8]" />
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded-full bg-[#E8F0F3] dark:bg-[#1A2D36] text-[#0F3B4C] dark:text-[#7FB4C8] flex items-center justify-center font-bold shrink-0 text-[12px]">
                  3
                </div>
                <div className="flex-1">
                  <span>اضغط <strong>إضافة (Add)</strong> في الأعلى ليظهر الكاتلوج كأيقونة تطبيق على هاتفك.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowIOSModal(false)}
              className="mt-5 w-full min-h-[44px] rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-medium cursor-pointer"
            >
              تم الفهم
            </button>
          </div>
        </div>
      )}
    </>
  );
};
