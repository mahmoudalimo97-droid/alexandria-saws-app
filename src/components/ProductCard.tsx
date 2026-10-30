import React from 'react';
import { 
  MessageCircle, 
  Phone, 
  Disc, 
  Wrench, 
  Hammer, 
  Flame, 
  Gauge, 
  Package 
} from 'lucide-react';
import { Product, formatPrice, COMPANY_INFO } from '../data';

interface ProductCardProps {
  product: Product;
  onOpenDetails?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
}) => {
  const hasSavings = product.oldPrice > 0 && product.oldPrice > product.newPrice;
  const savingsAmount = hasSavings ? product.oldPrice - product.newPrice : 0;

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const text = `السلام عليكم ورحمة الله،\nأود الاستفسار والحجز بخصوص:\n*${product.name}*\nالسعر المعلن في الكاتلوج: *${formatPrice(product.newPrice)}*`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `tel:${COMPANY_INFO.primaryPhone}`;
  };

  // Specific clean outline machine icon according to product type
  const renderMachineIcon = () => {
    const iconClass = "w-4 h-4 text-[#0F3B4C] dark:text-[#7FB4C8] stroke-[1.75]";
    switch (product.category) {
      case 'saws':
        return <Disc className={iconClass} />;
      case 'mills':
        return <Wrench className={iconClass} />;
      case 'presses':
        return <Hammer className={iconClass} />;
      case 'welding':
        return <Flame className={iconClass} />;
      case 'compressors':
        return <Gauge className={iconClass} />;
      default:
        return <Package className={iconClass} />;
    }
  };

  return (
    <div 
      onClick={() => onOpenDetails && onOpenDetails(product)}
      className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-4 flex flex-col justify-between transition cursor-pointer"
    >
      <div>
        {/* Top Row: Icon + Name on Right, Price on Left */}
        <div className="flex items-start justify-between gap-3">
          {/* Right: Machine Outline Icon + Name */}
          <div className="flex-1 text-right">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[8px] bg-[#E8F0F3] dark:bg-[#1A2D36] flex items-center justify-center shrink-0">
                {renderMachineIcon()}
              </div>

              <h3 className="text-[16px] font-medium text-[#111111] dark:text-[#F2F2F2] leading-snug">
                {product.name}
              </h3>
            </div>

            {/* SubCategory or Hot badge */}
            <div className="mt-1.5 flex items-center gap-2 mr-9">
              {product.subCategory && (
                <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] font-normal">
                  {product.subCategory}
                </span>
              )}
              {product.hot && (
                <span className="text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] bg-[#E8F0F3] dark:bg-[#1A2D36] px-2 py-0.5 rounded-[6px]">
                  عرض خاص
                </span>
              )}
            </div>
          </div>

          {/* Left: New Price in accent color */}
          <div className="text-left shrink-0">
            <div className="text-[22px] font-bold text-[#0F3B4C] dark:text-[#7FB4C8] tracking-tight leading-none">
              {formatPrice(product.newPrice)}
            </div>

            {/* Old Price */}
            {product.oldPrice > 0 && (
              <div className="mt-1 text-[13px] font-normal text-[#6B6B6B] dark:text-[#9E9E9E] line-through">
                {formatPrice(product.oldPrice)}
              </div>
            )}

            {/* Savings Badge */}
            {hasSavings && (
              <div className="mt-1 inline-block text-[13px] font-medium text-[#0F3B4C] dark:text-[#7FB4C8] bg-[#E8F0F3] dark:bg-[#1A2D36] px-2 py-0.5 rounded-[6px]">
                وفّر {savingsAmount.toLocaleString('en-US')} ج
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons: 48px height */}
      <div className="mt-4 pt-3 border-t border-[#E5E5E5] dark:border-[#262626] grid grid-cols-2 gap-2" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={handleWhatsApp}
          className="min-h-[48px] flex items-center justify-center gap-2 rounded-[12px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-medium transition cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 stroke-[1.75]" />
          <span>طلب واتساب</span>
        </button>

        <button
          onClick={handleCall}
          className="min-h-[48px] flex items-center justify-center gap-2 rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] text-[#111111] dark:text-[#F2F2F2] hover:bg-[#F3F3F3] dark:hover:bg-[#1C1C1C] text-[13px] font-medium transition cursor-pointer"
        >
          <Phone className="w-4 h-4 text-[#6B6B6B] dark:text-[#9E9E9E] stroke-[1.75]" />
          <span>اتصال</span>
        </button>
      </div>
    </div>
  );
};
