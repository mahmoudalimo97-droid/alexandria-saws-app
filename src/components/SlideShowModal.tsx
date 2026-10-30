import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ChevronRight, 
  ChevronLeft, 
  MessageCircle, 
  Phone, 
  BookOpen, 
  Layers
} from 'lucide-react';
import { CATALOG_SLIDES, COMPANY_INFO, Product, PRODUCTS, formatPrice, resolveAssetUrl } from '../data';

interface SlideShowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSlideIndex?: number;
  onSelectProduct?: (product: Product) => void;
}

export const SlideShowModal: React.FC<SlideShowModalProps> = ({
  isOpen,
  onClose,
  initialSlideIndex = 0,
  onSelectProduct,
}) => {
  const [mode, setMode] = useState<'booklet' | 'products'>('booklet');
  const [currentIndex, setCurrentIndex] = useState(initialSlideIndex);

  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialSlideIndex);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, initialSlideIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') {
        handleNext();
      } else if (e.key === 'ArrowRight') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, mode]);

  if (!isOpen) return null;

  const totalSlides = mode === 'booklet' ? CATALOG_SLIDES.length : PRODUCTS.length;

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 45;

    if (diff > minSwipeDistance) {
      handleNext();
    } else if (diff < -minSwipeDistance) {
      handlePrev();
    }

    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  const currentBookletSlide = CATALOG_SLIDES[currentIndex] || CATALOG_SLIDES[0];
  const currentProduct = PRODUCTS[currentIndex] || PRODUCTS[0];

  const handleWhatsAppSlide = () => {
    let text = '';
    if (mode === 'booklet') {
      text = `السلام عليكم ورحمة الله،\nأود الاستفسار بخصوص صفحة (${currentBookletSlide.title} - ص ${currentIndex + 1}) في الكاتلوج.`;
    } else {
      text = `السلام عليكم ورحمة الله،\nأود الاستفسار والحجز لـ: *${currentProduct.name}* بسعر: *${formatPrice(currentProduct.newPrice)}*.`;
    }
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col bg-[#0E0E0E] text-[#F2F2F2] select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Controls Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#262626]">
        {/* Mode switch */}
        <div className="flex items-center gap-1 border border-[#262626] rounded-[8px] p-0.5">
          <button
            onClick={() => { setMode('booklet'); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-[6px] text-[13px] font-medium transition cursor-pointer ${
              mode === 'booklet' ? 'bg-[#7FB4C8] text-[#0E0E0E]' : 'text-[#9E9E9E] hover:text-white'
            }`}
          >
            صفحات الكاتلوج (10)
          </button>
          <button
            onClick={() => { setMode('products'); setCurrentIndex(0); }}
            className={`px-3 py-1 rounded-[6px] text-[13px] font-medium transition cursor-pointer ${
              mode === 'products' ? 'bg-[#7FB4C8] text-[#0E0E0E]' : 'text-[#9E9E9E] hover:text-white'
            }`}
          >
            المنتجات (32)
          </button>
        </div>

        {/* Counter and Close */}
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-mono text-[#9E9E9E]">
            {currentIndex + 1} / {totalSlides}
          </span>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-[8px] border border-[#262626] text-[#9E9E9E] hover:text-white flex items-center justify-center transition cursor-pointer"
            title="إغلاق"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Slide Carousel Area */}
      <div className="relative flex-1 flex items-center justify-center p-4 overflow-hidden">
        {/* Navigation arrows (Simple outline, 48px size) */}
        <button
          onClick={handlePrev}
          className="absolute right-3 z-30 w-12 h-12 rounded-[12px] border border-[#262626] bg-[#141414] text-white flex items-center justify-center transition cursor-pointer"
          title="السابق"
        >
          <ChevronRight className="w-6 h-6 stroke-[1.75]" />
        </button>

        <button
          onClick={handleNext}
          className="absolute left-3 z-30 w-12 h-12 rounded-[12px] border border-[#262626] bg-[#141414] text-white flex items-center justify-center transition cursor-pointer"
          title="التالي"
        >
          <ChevronLeft className="w-6 h-6 stroke-[1.75]" />
        </button>

        {/* Slide Display Container */}
        <div className="w-full max-w-lg h-full flex items-center justify-center">
          {mode === 'booklet' ? (
            <div className="w-full max-h-full flex flex-col items-center justify-center">
              <div className="rounded-[12px] overflow-hidden border border-[#262626] bg-[#141414] max-h-[70vh] flex items-center justify-center">
                <img
                  src={resolveAssetUrl(currentBookletSlide.image)}
                  alt={currentBookletSlide.title}
                  className="w-auto h-auto max-h-[68vh] object-contain"
                />
              </div>

              <div className="mt-3 text-center">
                <h4 className="text-[16px] font-medium text-white">
                  {currentBookletSlide.title}
                </h4>
                <p className="text-[13px] text-[#9E9E9E] mt-0.5">
                  {currentBookletSlide.subtitle}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full max-w-sm bg-[#141414] rounded-[12px] border border-[#262626] p-5 text-[#F2F2F2]">
              <div className="flex items-center justify-between text-[13px] text-[#9E9E9E] mb-3">
                <span>{currentProduct.subCategory || 'الماكينات'}</span>
                <span>{currentIndex + 1} من {totalSlides}</span>
              </div>

              <h3 className="text-[22px] font-bold text-white mb-3">
                {currentProduct.name}
              </h3>

              <div className="p-4 rounded-[12px] bg-[#1C1C1C] border border-[#262626] mb-4 flex items-center justify-between">
                <span className="text-[13px] text-[#9E9E9E]">السعر:</span>
                <div className="text-left">
                  <span className="text-[22px] font-bold text-[#7FB4C8]">
                    {formatPrice(currentProduct.newPrice)}
                  </span>
                  {currentProduct.oldPrice > 0 && (
                    <span className="block text-[13px] text-[#9E9E9E] line-through">
                      {formatPrice(currentProduct.oldPrice)}
                    </span>
                  )}
                </div>
              </div>

              {currentProduct.description && (
                <p className="text-[13px] text-[#9E9E9E] leading-relaxed">
                  {currentProduct.description}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Slide Bottom Action Footer (48px height) */}
      <div className="px-4 py-3 border-t border-[#262626] flex items-center justify-between gap-3">
        <span className="text-[13px] text-[#9E9E9E] hidden sm:inline">
          اسحب يمين أو شمال للتقليب
        </span>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleWhatsAppSlide}
            className="flex-1 sm:flex-none min-h-[48px] px-5 rounded-[12px] bg-[#7FB4C8] text-[#0E0E0E] text-[13px] font-medium flex items-center justify-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 stroke-[1.75]" />
            <span>طلب واتساب</span>
          </button>

          <a
            href={`tel:${COMPANY_INFO.primaryPhone}`}
            className="min-h-[48px] px-4 rounded-[12px] border border-[#262626] text-white text-[13px] font-medium flex items-center justify-center gap-1.5"
          >
            <Phone className="w-4 h-4 stroke-[1.75]" />
            <span>اتصال</span>
          </a>
        </div>
      </div>
    </div>
  );
};
