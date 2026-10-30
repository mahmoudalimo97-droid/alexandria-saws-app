import React from 'react';
import { MessageCircle, Phone, Info } from 'lucide-react';
import { Product, CATEGORIES, formatPrice, COMPANY_INFO } from '../data';

interface CompactPriceListProps {
  products: Product[];
  onOpenDetails: (product: Product) => void;
}

export const CompactPriceList: React.FC<CompactPriceListProps> = ({
  products,
  onOpenDetails,
}) => {
  const handleWhatsApp = (product: Product) => {
    const text = `السلام عليكم ورحمة الله،\nأود الاستفسار والحجز لـ: *${product.name}*\nالسعر المعلن في الكاتلوج: *${formatPrice(product.newPrice)}*`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${COMPANY_INFO.primaryPhone}`;
  };

  return (
    <div className="space-y-2.5">
      {products.map((product) => {
        const cat = CATEGORIES.find(c => c.id === product.category);
        const catColor = cat?.color || '#0F3B4C';
        const hasSavings = product.oldPrice > 0 && product.oldPrice > product.newPrice;
        const savingsAmount = hasSavings ? product.oldPrice - product.newPrice : 0;

        return (
          <div
            key={product.id}
            onClick={() => onOpenDetails(product)}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs hover:shadow-md transition cursor-pointer"
            style={{
              borderRightWidth: '4px',
              borderRightColor: catColor,
            }}
          >
            {/* Right: Product Name & Badges */}
            <div className="flex items-start sm:items-center gap-2.5 flex-1 min-w-0">
              <span className="text-xl sm:text-2xl shrink-0 mt-0.5 sm:mt-0">
                {product.hot ? '⭐' : '💰'}
              </span>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-[#1D6FB8] transition">
                    {product.name}
                  </h4>

                  {product.hot && (
                    <span className="bg-[#F2A900] text-[#0F3B4C] text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                      عرض خاص
                    </span>
                  )}

                  {product.subCategory && (
                    <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded-md">
                      {product.subCategory}
                    </span>
                  )}
                </div>

                {/* Savings Pill or Details Note */}
                <div className="flex items-center gap-2 mt-1">
                  {hasSavings ? (
                    <span className="text-[11px] font-black text-[#1A7F4B] dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-800">
                      وفّر {savingsAmount.toLocaleString('en-US')} ج فوري
                    </span>
                  ) : null}
                  {product.description && (
                    <span className="text-[11px] text-slate-400 truncate max-w-xs hidden md:inline">
                      {product.description}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Middle: Prices */}
            <div className="flex items-baseline justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-slate-800">
              <div className="text-right sm:text-left">
                <div 
                  className="text-xl sm:text-2xl font-black tracking-tight"
                  style={{ color: catColor }}
                >
                  {formatPrice(product.newPrice)}
                </div>

                {product.oldPrice > 0 ? (
                  <div className="text-xs text-slate-400 font-medium">
                    بدلًا من <span className="line-through">{formatPrice(product.oldPrice)}</span>
                  </div>
                ) : (
                  <div className="text-[10px] text-slate-400">سعر نهائي</div>
                )}
              </div>

              {/* Quick Actions (WhatsApp, Call, Details) */}
              <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => handleWhatsApp(product)}
                  className="h-10 px-3 bg-[#1A7F4B] hover:bg-emerald-700 active:scale-95 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-xs"
                  title="طلب سريع على واتساب"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span className="hidden xs:inline">واتساب</span>
                </button>

                <button
                  onClick={handleCall}
                  className="w-10 h-10 bg-[#0F3B4C] hover:bg-[#154e63] active:scale-95 text-white rounded-xl flex items-center justify-center transition"
                  title="اتصال الآن"
                >
                  <Phone className="w-4 h-4 text-[#F2A900]" />
                </button>

                <button
                  onClick={() => onOpenDetails(product)}
                  className="w-10 h-10 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center transition"
                  title="عرض التفاصيل والمواصفات"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
