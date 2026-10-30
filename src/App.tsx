/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useRef } from 'react';
import { Header } from './components/Header';
import { IntroSplash } from './components/IntroSplash';
import { ThreeTabsNav, MainTabType } from './components/ThreeTabsNav';
import { SearchBar } from './components/SearchBar';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { ServicesTab } from './components/ServicesTab';
import { ContactSection } from './components/ContactSection';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OfflineBanner } from './components/OfflineBanner';
import { PWAInstallBanner } from './components/PWAInstallBanner';
import { 
  PRODUCTS, 
  Product, 
  normalizeArabic, 
  COMPANY_INFO, 
  CATEGORIES 
} from './data';
import { Frown, ChevronDown } from 'lucide-react';

export default function App() {
  // Intro splash: user must click "عرض الأسعار" to enter
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Theme: dark / light
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const toggleDarkMode = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('app_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('app_theme', 'light');
      }
      return next;
    });
  };

  // The 3 main tabs: 'prices' | 'contact' | 'services'
  const [activeMainTab, setActiveMainTab] = useState<MainTabType>('prices');

  // Sub-category and search state for 'prices' tab
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sawsBrandFilter, setSawsBrandFilter] = useState<string>('الكل');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOffersOnly, setShowOffersOnly] = useState(false);

  // Modal details
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Filtered Products for the Prices Tab
  const filteredProducts = useMemo(() => {
    const query = normalizeArabic(searchQuery);

    return PRODUCTS.filter((p) => {
      // Search
      if (query) {
        const nameMatch = normalizeArabic(p.name).includes(query);
        const subCatMatch = p.subCategory ? normalizeArabic(p.subCategory).includes(query) : false;
        if (!nameMatch && !subCatMatch) return false;
      }

      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Saws Brand Filter
      if (selectedCategory === 'saws' && sawsBrandFilter !== 'الكل' && p.category === 'saws') {
        if (p.subCategory !== sawsBrandFilter) return false;
      }

      // Offers only
      if (showOffersOnly) {
        const hasDiscount = p.oldPrice > 0 && p.oldPrice > p.newPrice;
        if (!p.hot && !hasDiscount) return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, sawsBrandFilter, showOffersOnly]);

  const sawsCategory = CATEGORIES.find(c => c.id === 'saws');

  const categoryFilterTabs = [
    { id: 'all', label: 'الكل' },
    { id: 'saws', label: 'المناشير' },
    { id: 'mills', label: 'الفرايز' },
    { id: 'presses', label: 'المكابس' },
    { id: 'welding', label: 'اللحام' },
    { id: 'compressors', label: 'الكمبروسر' },
  ];

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    /* Outer Viewport: Centers and frames the phone screen on all devices */
    <div className="min-h-screen bg-[#F0F2F5] dark:bg-[#07090B] flex items-center justify-center sm:p-4 md:py-6 overflow-x-hidden">
      
      {/* Phone Screen Mockup Frame: Strictly contained, no horizontal overflow or jumping */}
      <div 
        ref={scrollContainerRef}
        className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] sm:max-h-[92vh] sm:h-[844px] bg-white dark:bg-[#0E0E0E] text-[#111111] dark:text-[#F2F2F2] sm:rounded-[38px] sm:border-[8px] sm:border-[#1E293B] dark:sm:border-[#2D3748] sm:shadow-2xl overflow-y-auto overflow-x-hidden relative flex flex-col no-scrollbar transition-colors"
      >
        {/* Top Speaker / Dynamic Island on desktop frame */}
        <div className="hidden sm:flex justify-center pt-2 pb-1 bg-white dark:bg-[#0E0E0E] shrink-0 sticky top-0 z-50 select-none">
          <div className="w-24 h-3.5 bg-[#1E293B] dark:bg-[#2D3748] rounded-full flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-black/40 mr-2"></div>
          </div>
        </div>

        {/* 1) Minimalist White Intro: stays inside the phone frame */}
        {showIntro && <IntroSplash onEnter={() => setShowIntro(false)} />}

        {/* Offline Alert */}
        <OfflineBanner />

        {/* Clean Top Header */}
        <Header
          isDark={isDark}
          onToggleDark={toggleDarkMode}
          onNavigateHome={() => {
            setActiveMainTab('prices');
            setSelectedCategory('all');
            setSearchQuery('');
            scrollToTop();
          }}
        />

        {/* PWA Install / Update Notification Banner */}
        <PWAInstallBanner />

        {/* 2) The 3 Clean Tabs Side-by-Side: [ الأسعار | التواصل | الخدمات ] */}
        <ThreeTabsNav
          activeTab={activeMainTab}
          onTabChange={(tab) => {
            setActiveMainTab(tab);
            scrollToTop();
          }}
        />

        {/* Main Content Area: Fitted directly to the phone screen with 0 horizontal spill */}
        <main className="flex-1 w-full px-3.5 pt-4 pb-20">
          
          {/* ============================================================= */}
          {/* TAB 1: الأسعار (Prices) */}
          {/* ============================================================= */}
          {activeMainTab === 'prices' && (
            <div className="space-y-3.5">
              {/* Search Bar */}
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                showOffersOnly={showOffersOnly}
                onToggleOffersOnly={setShowOffersOnly}
                resultsCount={filteredProducts.length}
              />

              {/* Category Filter: Clean 3x2 Grid fitting 100% inside screen width with zero scrolling */}
              <div className="grid grid-cols-3 gap-1.5 py-1">
                {categoryFilterTabs.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setSawsBrandFilter('الكل');
                      }}
                      className={`min-h-[38px] px-2 rounded-[10px] text-[13px] text-center transition cursor-pointer border ${
                        isSelected
                          ? 'bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] border-transparent font-bold'
                          : 'border-[#E5E5E5] dark:border-[#262626] text-[#6B6B6B] dark:text-[#9E9E9E] hover:text-[#111111] dark:hover:text-white font-medium bg-white dark:bg-[#141414]'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>

              {/* Saws Brand Sub-Filter (Drop-down selector fitting 100% inside width) */}
              {selectedCategory === 'saws' && sawsCategory?.subCategories && (
                <div className="py-2 px-1 border-t border-[#E5E5E5] dark:border-[#262626] flex items-center justify-between gap-2">
                  <span className="text-[13px] text-[#6B6B6B] dark:text-[#9E9E9E] shrink-0 font-medium">
                    ماركة المنشار:
                  </span>
                  <div className="relative flex-1">
                    <select
                      value={sawsBrandFilter}
                      onChange={(e) => setSawsBrandFilter(e.target.value)}
                      aria-label="ماركة المنشار"
                      className="w-full min-h-[38px] px-3 py-1.5 rounded-[10px] bg-white dark:bg-[#141414] border border-[#E5E5E5] dark:border-[#262626] text-[13px] font-medium text-[#111111] dark:text-[#F2F2F2] focus:outline-none cursor-pointer text-right appearance-none"
                    >
                      {sawsCategory.subCategories.map((brand) => (
                        <option key={brand} value={brand} className="bg-white dark:bg-[#141414] text-[#111111] dark:text-[#F2F2F2]">
                          {brand}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-[#6B6B6B] dark:text-[#9E9E9E]">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              )}

              {/* Product Cards List */}
              <div className="space-y-3 pt-1">
                {filteredProducts.map((p) => (
                  <ProductCard 
                    key={p.id} 
                    product={p} 
                    onOpenDetails={setSelectedProduct} 
                  />
                ))}

                {filteredProducts.length === 0 && (
                  <div className="bg-white dark:bg-[#141414] rounded-[12px] border border-[#E5E5E5] dark:border-[#262626] p-6 text-center my-4">
                    <Frown className="w-8 h-8 text-[#6B6B6B] dark:text-[#9E9E9E] mx-auto mb-2" />
                    <h3 className="text-[15px] font-medium text-[#111111] dark:text-[#F2F2F2]">
                      لم نجد نتائج مطابقة لـ "{searchQuery}"
                    </h3>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSawsBrandFilter('الكل');
                        setShowOffersOnly(false);
                      }}
                      className="mt-3 min-h-[40px] px-4 rounded-[10px] bg-[#0F3B4C] dark:bg-[#7FB4C8] text-white dark:text-[#0E0E0E] text-[13px] font-medium"
                    >
                      عرض جميع المنتجات
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ============================================================= */}
          {/* TAB 2: التواصل (Contact) */}
          {/* ============================================================= */}
          {activeMainTab === 'contact' && (
            <ContactSection />
          )}

          {/* ============================================================= */}
          {/* TAB 3: الخدمات (Services: توصيل، شحن، تقسيط، هدايا) */}
          {/* ============================================================= */}
          {activeMainTab === 'services' && (
            <ServicesTab />
          )}
        </main>

        {/* Floating WhatsApp Action Button: Pinned neatly inside the phone frame */}
        <FloatingWhatsApp />

        {/* Product Details Modal: Opens strictly inside the phone frame */}
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOpenGifts={() => {
            setSelectedProduct(null);
            setActiveMainTab('services');
            scrollToTop();
          }}
        />

        {/* Clean Minimal Footer */}
        <footer className="border-t border-[#E5E5E5] dark:border-[#262626] py-4 px-3 text-center shrink-0 mt-auto bg-white dark:bg-[#0E0E0E]">
          <div className="w-full text-[12px] text-[#6B6B6B] dark:text-[#9E9E9E]">
            <div className="font-bold text-[#111111] dark:text-[#F2F2F2] mb-0.5">
              {COMPANY_INFO.name}
            </div>
            <div className="font-mono dir-ltr">
              {COMPANY_INFO.primaryPhone}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
