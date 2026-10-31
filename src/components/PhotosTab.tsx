import React, { useState, useEffect, useCallback } from 'react';
import { 
  Camera, 
  ExternalLink, 
  Copy, 
  Check, 
  MessageCircle, 
  ChevronLeft, 
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  Maximize2,
  Image as ImageIcon,
  AlertCircle,
  RefreshCw,
  Frown,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, resolveAssetUrl } from '../data';
import { 
  EQUIPMENT_GALLERY, 
  EQUIPMENT_CATEGORIES_FILTER, 
  EquipmentCategory, 
  EquipmentPhotoItem 
} from '../equipmentPhotos';

interface PhotosTabProps {
  onGoToPrices?: () => void;
}

export const PhotosTab: React.FC<PhotosTabProps> = ({ onGoToPrices }) => {
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<EquipmentCategory>('all');
  
  // Lightbox state
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  
  // Loading & Error states per image
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [retryKeys, setRetryKeys] = useState<Record<string, number>>({});

  const photosUrl = COMPANY_INFO.facebookPhotosUrl;

  const handleCopyLink = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(photosUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleRetryImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFailedImages((prev) => ({ ...prev, [id]: false }));
    setLoadedImages((prev) => ({ ...prev, [id]: false }));
    setRetryKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  // Filter photos according to selected category
  const filteredPhotos = EQUIPMENT_GALLERY.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    setZoomLevel(1);
  };

  const closeLightbox = useCallback(() => {
    setActiveLightboxIndex(null);
    setZoomLevel(1);
  }, []);

  const nextImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev !== null ? (prev + 1) % filteredPhotos.length : null
    );
    setZoomLevel(1);
  }, [activeLightboxIndex, filteredPhotos.length]);

  const prevImage = useCallback(() => {
    if (activeLightboxIndex === null) return;
    setActiveLightboxIndex((prev) => 
      prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : null
    );
    setZoomLevel(1);
  }, [activeLightboxIndex, filteredPhotos.length]);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activeLightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') prevImage(); // In RTL, right arrow goes to previous
      if (e.key === 'ArrowLeft') nextImage();  // In RTL, left arrow goes to next
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, closeLightbox, nextImage, prevImage]);

  const currentPhoto: EquipmentPhotoItem | null = 
    activeLightboxIndex !== null ? filteredPhotos[activeLightboxIndex] : null;

  return (
    <div className="space-y-3.5">
      {/* 1) Hero Header Card */}
      <div className="bg-white dark:bg-[#141414] rounded-[16px] border border-[#E5E5E5] dark:border-[#262626] p-4 text-center">
        <div className="w-12 h-12 rounded-[12px] bg-[#E8F0F3] dark:bg-[#152730] text-[#0F3B4C] dark:text-[#7FB4C8] flex items-center justify-center mx-auto mb-3">
          <Camera className="w-6 h-6 stroke-[1.75]" />
        </div>
        
        <h2 className="text-[17px] font-bold text-[#111111] dark:text-[#F2F2F2] mb-1">
          معرض صور معدات شركة الإسكندرية
        </h2>
        
        <p className="text-[12.5px] text-[#6B6B6B] dark:text-[#9E9E9E] leading-relaxed max-w-[340px] mx-auto mb-3.5">
          صور حقيقية معتمدة لجميع ماكينات ومناشير ومكابس الألوميتال والـ UPVC من واقع المستودع وورش العمل الفعلية.
        </p>

        {/* Quick Action buttons */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={handleCopyLink}
            className="min-h-[36px] px-3 rounded-[10px] border border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white text-[12px] font-medium flex items-center justify-center gap-1.5 transition cursor-pointer bg-[#FAFAFA] dark:bg-[#1A1A1A]"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400 stroke-[2.5]" />
                <span className="text-green-600 dark:text-green-400 font-bold">تم نسخ الرابط!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ رابط الألبوم</span>
              </>
            )}
          </button>

          <a
            href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، محتاج صور وفيديوهات حية إضافية للمعدات من شركة الإسكندرية للمناشير')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[36px] px-3 rounded-[10px] border border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white text-[12px] font-medium flex items-center justify-center gap-1.5 transition bg-[#FAFAFA] dark:bg-[#1A1A1A]"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>طلب صور وفيديو واتساب</span>
          </a>
        </div>
      </div>

      {/* 2) Gallery Categories Filter */}
      <div className="bg-white dark:bg-[#141414] rounded-[14px] border border-[#E5E5E5] dark:border-[#262626] p-2.5">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-[12px] font-bold text-[#6B6B6B] dark:text-[#9E9E9E]">
            تصنيف صور المعدات:
          </span>
          <span className="text-[11px] font-mono text-[#0F3B4C] dark:text-[#7FB4C8] font-bold">
            {filteredPhotos.length} صورة
          </span>
        </div>
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 gap-1.5">
          {EQUIPMENT_CATEGORIES_FILTER.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveLightboxIndex(null);
                }}
                className={`min-h-[36px] px-1.5 rounded-[8px] text-[11.5px] text-center transition cursor-pointer border ${
                  isSelected
                    ? 'bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] border-transparent font-bold'
                    : 'border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white font-medium bg-[#FAFAFA] dark:bg-[#1A1A1A]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3) Grid Gallery (Responsive 2 cols on mobile, 3 on tablet/desktop) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-[12.5px] font-bold text-[#111111] dark:text-[#F2F2F2]">
            معرض المعدات الحقيقية
          </span>
          <span className="text-[11px] text-[#6B6B6B] dark:text-[#9E9E9E]">
            انقر على أي صورة لتكبيرها
          </span>
        </div>

        {/* Empty state when no photos match */}
        {filteredPhotos.length === 0 && (
          <div className="bg-white dark:bg-[#141414] rounded-[14px] border border-[#E5E5E5] dark:border-[#262626] p-6 text-center">
            <Frown className="w-8 h-8 text-[#6B6B6B] dark:text-[#9E9E9E] mx-auto mb-2" />
            <h3 className="text-[14px] font-bold text-[#111111] dark:text-[#F2F2F2] mb-1">
              لا توجد صور في هذا القسم حالياً
            </h3>
            <p className="text-[12px] text-[#6B6B6B] dark:text-[#9E9E9E] mb-3">
              يمكنك اختيار تصنيف آخر أو استعراض جميع الصور.
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="min-h-[38px] px-4 rounded-[10px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[12px] font-bold cursor-pointer"
            >
              عرض جميع الصور
            </button>
          </div>
        )}

        {/* The Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
          {filteredPhotos.map((item, index) => {
            const rawUrl = resolveAssetUrl(item.image);
            const retryKey = retryKeys[item.id] || 0;
            const imageUrl = retryKey > 0 ? `${rawUrl}?retry=${retryKey}` : rawUrl;
            const isLoaded = loadedImages[item.id];
            const hasError = failedImages[item.id];

            return (
              <div
                key={item.id}
                onClick={() => !hasError && openLightbox(index)}
                className={`group bg-white dark:bg-[#141414] rounded-[14px] border border-[#E5E5E5] dark:border-[#262626] overflow-hidden transition-all flex flex-col shadow-xs ${
                  hasError ? 'cursor-default' : 'hover:border-[#0F3B4C] dark:hover:border-[#7FB4C8] cursor-pointer'
                }`}
              >
                {/* Image Container with Aspect Ratio */}
                <div className="relative aspect-[4/5] bg-[#F8F9FA] dark:bg-[#1E1E1E] overflow-hidden flex items-center justify-center">
                  
                  {/* Loading State / Shimmer Skeleton */}
                  {!isLoaded && !hasError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F3F4F6] dark:bg-[#1F2937] animate-pulse p-3 text-center">
                      <ImageIcon className="w-8 h-8 text-gray-400 mb-1" />
                      <span className="text-[10px] text-gray-500">جاري تحميل الصورة...</span>
                    </div>
                  )}

                  {/* Error State if Image Fails to Load */}
                  {hasError && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-3 text-center bg-[#FFF8F8] dark:bg-[#1C1515]">
                      <AlertCircle className="w-7 h-7 text-amber-600 mb-1" />
                      <p className="text-[11px] font-bold text-[#111111] dark:text-white mb-0.5">
                        تعذر تحميل الصورة
                      </p>
                      <p className="text-[9.5px] text-[#6B6B6B] dark:text-gray-400 mb-2">
                        يمكنك إعادة المحاولة أو فتح الألبوم على فيسبوك
                      </p>
                      <button
                        onClick={(e) => handleRetryImage(item.id, e)}
                        className="min-h-[28px] px-2.5 rounded-[6px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[10.5px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>إعادة المحاولة</span>
                      </button>
                    </div>
                  )}

                  {/* Real Equipment Photo from assets/equipment */}
                  {!hasError && (
                    <img
                      src={imageUrl}
                      alt={item.title}
                      loading="lazy"
                      onLoad={() => {
                        setLoadedImages((prev) => ({ ...prev, [item.id]: true }));
                        setFailedImages((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      onError={() => {
                        setFailedImages((prev) => ({ ...prev, [item.id]: true }));
                        setLoadedImages((prev) => ({ ...prev, [item.id]: false }));
                      }}
                      className={`w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  )}

                  {/* Badge: Category label */}
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-0.5 rounded-[6px] text-[10px] font-bold bg-[#0F3B4C]/90 text-white backdrop-blur-xs shadow-xs">
                      {item.categoryLabel}
                    </span>
                  </div>

                  {/* Number Badge */}
                  <div className="absolute bottom-2 left-2">
                    <span className="px-1.5 py-0.5 rounded-[4px] text-[9.5px] font-mono bg-black/60 text-white backdrop-blur-xs">
                      #{item.number}
                    </span>
                  </div>

                  {/* Tap to Zoom Overlay on Hover */}
                  {!hasError && (
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-white/90 text-[#0F3B4C] flex items-center justify-center shadow-md">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Info */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-[12.5px] font-bold text-[#111111] dark:text-[#F2F2F2] line-clamp-1 mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] dark:text-[#9E9E9E] line-clamp-1 leading-tight">
                      {item.subtitle}
                    </p>
                  </div>
                  
                  <div className="mt-2 pt-2 border-t border-[#E5E5E5] dark:border-[#262626] flex items-center justify-between text-[11px] text-[#0F3B4C] dark:text-[#7FB4C8] font-medium">
                    <span>{hasError ? 'غير متاحة' : 'تكبير الصورة'}</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4) REQUIRED FACEBOOK PROMINENT BUTTON (رابعًا: زر فيسبوك) */}
      <div className="bg-white dark:bg-[#141414] rounded-[16px] border border-[#E5E5E5] dark:border-[#262626] p-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <Sparkles className="w-4 h-4 text-[#0F3B4C] dark:text-[#7FB4C8]" />
          <h4 className="text-[14px] font-bold text-[#111111] dark:text-[#F2F2F2]">
            المزيد من صور المعدات وتسليمات الورش
          </h4>
        </div>
        
        <p className="text-[12px] text-[#6B6B6B] dark:text-[#9E9E9E] mb-3 leading-relaxed max-w-[340px] mx-auto">
          لمشاهدة أحدث صور المعدات الجديدة وعمليات التحميل اليومية وفيديوهات التجربة المباشرة:
        </p>

        {/* The Exact Requested Button */}
        <a
          href={photosUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full min-h-[48px] px-4 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] font-bold text-[14px] flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition shadow-sm cursor-pointer"
        >
          <span>عرض المزيد من صور المعدات</span>
          <ExternalLink className="w-4 h-4 stroke-[2]" />
        </a>
      </div>

      {/* 5) Live Video & Custom Workshop Request Card */}
      <div className="bg-[#E8F0F3] dark:bg-[#152730] rounded-[16px] border border-[#0F3B4C]/20 dark:border-[#7FB4C8]/30 p-4 text-center">
        <h4 className="text-[13.5px] font-bold text-[#0F3B4C] dark:text-[#7FB4C8] mb-1">
          محتاج فيديو تشغيل حي لماكينة معينة؟
        </h4>
        <p className="text-[12px] text-[#111111] dark:text-[#E0E0E0] mb-3">
          تواصل معنا على واتساب وسنقوم بتصوير الماكينة وتجربتها بالفيديو خصيصاً لك من المستودع.
        </p>
        <a
          href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent('السلام عليكم، محتاج فيديو تشغيل وصور حية لماكينة من شركة الإسكندرية للمناشير')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[42px] px-4 rounded-[10px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-bold inline-flex items-center justify-center gap-2 transition"
        >
          <MessageCircle className="w-4 h-4 stroke-[2]" />
          <span>طلب فيديو أو صور حية بالواتساب</span>
        </a>
      </div>

      {/* 6) Return to Prices shortcut */}
      {onGoToPrices && (
        <div className="pt-1 text-center">
          <button
            onClick={onGoToPrices}
            className="text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] hover:underline inline-flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>العودة لجدول أسعار الماكينات</span>
          </button>
        </div>
      )}

      {/* ===================================================================== */}
      {/* 7) LIGHTBOX MODAL (تكبير الصور والتنقل بينها) */}
      {/* ===================================================================== */}
      {currentPhoto && activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col justify-between"
          role="dialog"
          aria-modal="true"
          aria-label={currentPhoto.title}
        >
          {/* Top Bar: Title, Zoom Controls, Close */}
          <div className="p-3 bg-black/60 border-b border-white/10 flex items-center justify-between text-white select-none">
            <div className="flex items-center gap-2 min-w-0 pr-1">
              <span className="text-[11px] font-mono bg-white/15 px-2 py-0.5 rounded-[6px] shrink-0">
                {activeLightboxIndex + 1} / {filteredPhotos.length}
              </span>
              <div className="truncate">
                <h3 className="text-[13px] font-bold truncate leading-tight">
                  {currentPhoto.title}
                </h3>
                <p className="text-[11px] text-gray-400 truncate">
                  {currentPhoto.subtitle}
                </p>
              </div>
            </div>

            {/* Zoom Controls + Close */}
            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={handleZoomIn}
                title="تكبير"
                aria-label="تكبير الصورة"
                className="w-8 h-8 rounded-[8px] bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                onClick={handleZoomOut}
                title="تصغير"
                aria-label="تصغير الصورة"
                disabled={zoomLevel <= 1}
                className="w-8 h-8 rounded-[8px] bg-white/10 hover:bg-white/20 disabled:opacity-30 flex items-center justify-center cursor-pointer text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              {zoomLevel > 1 && (
                <button
                  onClick={handleResetZoom}
                  title="إعادة ضبط الحجم"
                  aria-label="إعادة ضبط حجم الصورة"
                  className="w-8 h-8 rounded-[8px] bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer text-white"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}

              <button
                onClick={closeLightbox}
                title="إغلاق"
                aria-label="إغلاق عارض الصور"
                className="w-8 h-8 rounded-[8px] bg-white/15 hover:bg-red-600/80 flex items-center justify-center cursor-pointer text-white mr-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Center Image Container with Zoom & Navigation */}
          <div className="relative flex-1 flex items-center justify-center overflow-auto p-2 select-none">
            {/* Prev Image (RTL aware - visually to the right) */}
            <button
              onClick={prevImage}
              aria-label="الصورة السابقة"
              className="absolute right-2 sm:right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image with Zoom Scale & Double-Tap to Toggle Zoom */}
            <div 
              className="max-w-full max-h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
              onDoubleClick={() => setZoomLevel((prev) => (prev > 1 ? 1 : 2))}
            >
              <img
                src={resolveAssetUrl(currentPhoto.image)}
                alt={currentPhoto.title}
                className="max-h-[68dvh] max-w-[92vw] sm:max-w-[420px] object-contain rounded-[10px] shadow-2xl"
              />
            </div>

            {/* Next Image (RTL aware - visually to the left) */}
            <button
              onClick={nextImage}
              aria-label="الصورة التالية"
              className="absolute left-2 sm:left-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center cursor-pointer shadow-lg active:scale-95 transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Actions Bar */}
          <div className="p-3 bg-black/75 border-t border-white/10 space-y-2">
            {currentPhoto.description && (
              <p className="text-[12px] text-gray-300 text-center line-clamp-2 px-2">
                {currentPhoto.description}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2 max-w-[400px] mx-auto">
              <a
                href={photosUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] px-3 rounded-[10px] bg-white text-[#111111] hover:bg-gray-100 font-bold text-[12px] flex items-center justify-center gap-1.5 transition cursor-pointer"
              >
                <span>المزيد على فيسبوك</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`السلام عليكم، استفسار بخصوص صور ومواصفات: ${currentPhoto.title} - ${currentPhoto.subtitle}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[40px] px-3 rounded-[10px] bg-[#0F3B4C] hover:bg-[#154E64] text-white font-bold text-[12px] flex items-center justify-center gap-1.5 transition cursor-pointer border border-white/20"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>استفسار واتساب</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
