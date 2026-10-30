import React from 'react';
import { X, MessageCircle, Phone, Check, Package } from 'lucide-react';
import { Product, formatPrice, COMPANY_INFO, resolveAssetUrl } from '../data';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onOpenGifts: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onOpenGifts,
}) => {
  if (!product) return null;

  const hasSavings = product.oldPrice > 0 && product.oldPrice > product.newPrice;
  const savingsAmount = hasSavings ? product.oldPrice - product.newPrice : 0;

  const handleWhatsApp = () => {
    const text = `السلام عليكم ورحمة الله،\nأود الاستفسار والحجز بخصوص:\n*${product.name}*\nالسعر المعلن: *${formatPrice(product.newPrice)}*`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${COMPANY_INFO.primaryPhone}`;
  };

  return (
    <div 
      className="fixed sm:absolute inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] overflow-hidden my-auto text-[#111111] dark:text-[#F2F2F2]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 left-3 z-20 w-9 h-9 rounded-full bg-white dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] hover:text-[#111111] dark:hover:text-white flex items-center justify-center transition"
          title="إغلاق"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Product Image / Placeholder */}
        {product.image ? (
          <div className="aspect-4/3 bg-[#F3F3F3] dark:bg-[#1C1C1C] overflow-hidden">
            <img 
              src={resolveAssetUrl(product.image)} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="aspect-4/3 bg-[#F3F3F3] dark:bg-[#1C1C1C] flex flex-col items-center justify-center p-6 text-center border-b border-[#E5E5E5] dark:border-[#262626]">
            <Package className="w-12 h-12 text-[#6B6B6B] dark:text-[#9E9E9E] stroke-[1.5] mb-2" />
            <span className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2]">{product.name}</span>
          </div>
        )}

        {/* Content */}
        <div className="p-5">
          {/* Subcategory */}
          {product.subCategory && (
            <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] block mb-1">
              {product.subCategory}
            </span>
          )}

          <h2 className="text-[22px] font-bold text-[#111111] dark:text-[#F2F2F2]">
            {product.name}
          </h2>

          {/* Price Box */}
          <div className="mt-4 p-4 rounded-[12px] bg-[#F8FAFC] dark:bg-[#1A1A1A] border border-[#E5E5E5] dark:border-[#262626] flex items-center justify-between">
            <div>
              <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] block">السعر:</span>
              <div className="text-[22px] font-bold text-[#0F3B4C] dark:text-[#7FB4C8] tracking-tight">
                {formatPrice(product.newPrice)}
              </div>
            </div>

            <div className="text-left">
              {product.oldPrice > 0 && (
                <div className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] line-through">
                  {formatPrice(product.oldPrice)}
                </div>
              )}
              {hasSavings && (
                <div className="mt-1 inline-block text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] bg-[#E8F0F3] dark:bg-[#1A2D36] px-2.5 py-0.5 rounded-[6px]">
                  وفّر {savingsAmount.toLocaleString('en-US')} ج
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          {product.description && (
            <p className="mt-4 text-[16px] font-normal text-[#6B6B6B] dark:text-[#9E9E9E] leading-relaxed">
              {product.description}
            </p>
          )}

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <div className="mt-4 pt-3 border-t border-[#E5E5E5] dark:border-[#262626]">
              <span className="text-[13px] font-medium text-[#6B6B6B] dark:text-[#9E9E9E] block mb-2">
                المواصفات:
              </span>
              <ul className="space-y-2">
                {product.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-[13px] text-[#111111] dark:text-[#F2F2F2]">
                    <div className="w-4 h-4 rounded-full border border-[#0F3B4C] dark:border-[#7FB4C8] flex items-center justify-center text-[#0F3B4C] dark:text-[#7FB4C8] shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[2]" />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Saw Gifts Note */}
          {product.category === 'saws' && (
            <div 
              onClick={onOpenGifts}
              className="mt-4 p-3 rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] bg-[#F8FAFC] dark:bg-[#1A1A1A] flex items-center justify-between cursor-pointer"
            >
              <div>
                <span className="text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] block">
                  شامل باقة 5 هدايا مجانية
                </span>
                <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E]">
                  صينية، سندو، مسطرة، زيت، وضمان 5 سنوات
                </span>
              </div>
              <span className="text-[13px] underline text-[#0F3B4C] dark:text-[#7FB4C8]">
                عرض الهدايا
              </span>
            </div>
          )}
        </div>

        {/* Footer Actions (48px height) */}
        <div className="p-4 border-t border-[#E5E5E5] dark:border-[#262626] grid grid-cols-2 gap-2">
          <button
            onClick={handleWhatsApp}
            className="min-h-[48px] flex items-center justify-center gap-2 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[16px] font-medium transition cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 stroke-[1.75]" />
            <span>طلب واتساب</span>
          </button>

          <button
            onClick={handleCall}
            className="min-h-[48px] flex items-center justify-center gap-2 rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#F2F2F2] hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] text-[16px] font-medium transition cursor-pointer"
          >
            <Phone className="w-4 h-4 stroke-[1.75]" />
            <span>اتصال الآن</span>
          </button>
        </div>
      </div>
    </div>
  );
};
