/**
 * ============================================================================
 * ملف بيانات كاتلوج شركة الإسكندرية للمناشير وآلات الألوميتال والـ UPVC
 * ============================================================================
 * 
 * مرحباً بك! هذا الملف مخصص لك لتعديل الأسعار أو إضافة منتجات جديدة بكل سهولة
 * دون الحاجة لتعديل كود التطبيق.
 * 
 * 📌 كيف تعدل سعر منتج؟
 * ابحث عن اسم المنتج تحته، وقم بتغيير رقم `newPrice` (السعر الجديد) 
 * أو `oldPrice` (السعر القديم). إذا لم يكن هناك سعر قديم، اجعل قيمته 0.
 * 
 * 📌 كيف تضيف علامة "عرض مميز" (hot)؟
 * اجعل `hot: true` للمنتج الذي تريده.
 * 
 * 📌 كيف تضيف صورة لمنتج؟
 * ضع ملف الصورة في المجلد `public/images/` مثلاً `thomas-18.jpg`
 * ثم اكتب المسار هكذا: `image: "/images/thomas-18.jpg"`
 * إذا تركت الصورة فارغة `image: ""` سيظهر التطبيق تلقائياً أيقونة أنيقة بلون القسم.
 */

export interface Product {
  id: string;
  name: string;
  category: 'saws' | 'mills' | 'presses' | 'welding' | 'compressors';
  subCategory?: string; // ماركة المنشار (توماس وخميس، الإتقان السوري 2026، إلخ)
  newPrice: number;
  oldPrice: number;
  hot?: boolean;
  image?: string;
  gallery?: string[];
  description?: string;
  features?: string[];
}

export interface CategoryInfo {
  id: 'saws' | 'mills' | 'presses' | 'welding' | 'compressors';
  name: string;
  shortName: string;
  subtitle: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  subCategories?: string[];
  slideImage?: string;
}

export const COMPANY_INFO = {
  name: 'شركة الإسكندرية للمناشير وآلات الألوميتال والـ UPVC',
  tagline: 'اشتغل أسرع – انتج أكتر – اكسب أعلى',
  subtitle: 'كاتلوج الأسعار الرسمي المعتمد',
  warranty: 'ضمان 5 سنوات على كل منشار',
  location: 'الإسكندرية – المندرة – بجوار قسم ثالث المنتزه',
  addressShort: 'الإسكندرية – المندرة',
  primaryPhone: '01229455338',
  facebookPhotosUrl: 'https://www.facebook.com/ahmd.alamyr.834389/photos',
  phones: [
    { number: '01229455338', label: 'الرقم الرئيسي والواتساب', isPrimary: true },
    { number: '01005709766', label: 'مبيعات وحجوزات', isPrimary: false },
    { number: '01098150452', label: 'استفسارات فنية وأسعار', isPrimary: false },
    { number: '01505917011', label: 'خدمة العملاء والشحن', isPrimary: false },
  ],
  whatsappNumber: '201229455338',
  whatsappUrl: 'https://wa.me/201229455338',
  services: [
    'توصيل يومي لجميع المحافظات',
    'شحن سريع وآمن حتى باب الورشة',
    'دفع كاش أو تقسيط ميسر',
    'قطع غيار أصلية وصيانة دورية معتمدة'
  ],
  giftsWithSaw: [
    'صينية هدية',
    'سندو مقاس هدية',
    'مسطرة تسليخ',
    'زيت تبريد',
    'شهادة ضمان معتمدة 5 سنوات'
  ],
  callToAction: 'الحق العروض قبل نفاد الكمية!'
};

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'saws',
    name: 'المناشير',
    shortName: 'مناشير',
    subtitle: 'مناشير قص ألوميتال وUPVC يدوية وأوتوماتيك ودبل هيد',
    color: '#0F3B4C',
    bgColor: 'bg-[#0F3B4C]',
    borderColor: 'border-[#0F3B4C]',
    icon: 'disc',
    subCategories: [
      'الكل',
      'مناشير توماس وخميس',
      'مناشير الإتقان السوري موديل 2026',
      'مناشير بدر',
      'مناشير سيمبلكس',
      'مناشير BSM',
      'دبل هيد',
      'مناشير أتيك'
    ],
    slideImage: '/assets/aistudio/catalog_02_cbba6703.png'
  },
  {
    id: 'mills',
    name: 'الفرايز',
    shortName: 'فرايز',
    subtitle: 'فريزات تفريز وسحب ألوميتال ومفصلات بقاعدة وبدون',
    color: '#0F3B4C',
    bgColor: 'bg-[#0F3B4C]',
    borderColor: 'border-[#0F3B4C]',
    icon: 'wrench',
    slideImage: '/assets/aistudio/catalog_06_54424a79.png'
  },
  {
    id: 'presses',
    name: 'المكابس',
    shortName: 'مكابس',
    subtitle: 'مكابس تجميع مجمعة ومتعددة يدوية وهوائية وهيدروليك',
    color: '#0F3B4C',
    bgColor: 'bg-[#0F3B4C]',
    borderColor: 'border-[#0F3B4C]',
    icon: 'hammer',
    slideImage: '/assets/aistudio/catalog_07_dcad5157.png'
  },
  {
    id: 'welding',
    name: 'ماكينات اللحام',
    shortName: 'لحام UPVC',
    subtitle: 'ماكينات لحام زوايا UPVC رأس واحدة ورأسين بجودة أوروبية',
    color: '#0F3B4C',
    bgColor: 'bg-[#0F3B4C]',
    borderColor: 'border-[#0F3B4C]',
    icon: 'flame',
    slideImage: '/assets/aistudio/catalog_08_f56102e0.png'
  },
  {
    id: 'compressors',
    name: 'الكمبروسر والهدايا',
    shortName: 'كمبروسر',
    subtitle: 'كمبروسرات هواء قوية 100 و 200 لتر + باقة الهدايا المجانية',
    color: '#0F3B4C',
    bgColor: 'bg-[#0F3B4C]',
    borderColor: 'border-[#0F3B4C]',
    icon: 'gauge',
    slideImage: '/assets/aistudio/catalog_09_6cc03710.png'
  }
];

export const PRODUCTS: Product[] = [
  // =========================================================================
  // 1) قسم المناشير (لون #1D6FB8)
  // =========================================================================
  // --- مناشير توماس وخميس ---
  {
    id: 'saw-thomas-18',
    name: 'منشار توماس 18 بوصة',
    category: 'saws',
    subCategory: 'مناشير توماس وخميس',
    newPrice: 32500,
    oldPrice: 35000,
    hot: false,
    image: '',
    description: 'منشار توماس 18 بوصة دقيق لقص قطاعات الألوميتال بزوايا حادة وثابتة، موتور عزم قوي مع ضمان 5 سنوات وباقة الهدايا كاملة.',
    features: ['قرص 18 بوصة', 'زوايا 45 و 90 درجة ثابتة', 'محرك صناعي معمر', 'شامل باقة الهدايا والضمان']
  },
  {
    id: 'saw-khamis-top-18',
    name: 'منشار خميس أعلى إصدار 18 بوصة',
    category: 'saws',
    subCategory: 'مناشير توماس وخميس',
    newPrice: 42000,
    oldPrice: 45000,
    hot: false,
    image: '',
    description: 'أعلى إصدار من مناشير خميس الشهيرة، ثبات فائق على الطاولة وسرعة في تنفيذ الطلبيات في الورش والمصانع.',
    features: ['إصدار ممتاز معزز بالكامل', 'عزم محرك إضافي', 'تثبيت هوائي قوي', 'ضمان 5 سنوات معتمد']
  },
  {
    id: 'saw-khamis-modified',
    name: 'منشار خميس المعدل',
    category: 'saws',
    subCategory: 'مناشير توماس وخميس',
    newPrice: 57000,
    oldPrice: 60000,
    hot: false,
    image: '',
    description: 'النسخة المعدلة خصيصاً لتحمل ضغط العمل الشاق لساعات طويلة متواصلة، تقطيع ناعم بدون رايش.',
    features: ['تعديل احترافي لنظام التبريد', 'أقصى ثبات للزوايا', 'تحمل ورديات عمل كاملة']
  },
  {
    id: 'saw-khamis-hadaba',
    name: 'منشار خميس الهضبة',
    category: 'saws',
    subCategory: 'مناشير توماس وخميس',
    newPrice: 50500,
    oldPrice: 0,
    hot: false,
    image: '',
    description: 'منشار خميس موديل الهضبة المعروف بصلابته الميكانيكية العالية وقدرته على استيعاب القطاعات الثقيلة.',
    features: ['هيكل حديد صلب مقاوم للاهتزاز', 'دقة قص متناهية', 'سهولة الصيانة وقطع غيار متوفرة']
  },
  {
    id: 'saw-khamis-auto',
    name: 'منشار خميس أوتوماتيك',
    category: 'saws',
    subCategory: 'مناشير توماس وخميس',
    newPrice: 72500,
    oldPrice: 78000,
    hot: false,
    image: '',
    description: 'منشار أوتوماتيكي متكامل بحركة صعود وهبوط آلية لتوفير الوقت والمجهود وزيادة الإنتاجية للضعف.',
    features: ['صعود وهبوط هيدروليكي/هوائي أوتوماتيكي', 'حساسات أمان للمشغل', 'سرعة إنجاز مضاعفة']
  },
  {
    id: 'saw-khamis-etqan-syrian',
    name: 'الإتقان السوري',
    category: 'saws',
    subCategory: 'مناشير توماس وخميس',
    newPrice: 40000,
    oldPrice: 45000,
    hot: false,
    image: '',
    description: 'منشار الإتقان السوري ذو الصيت الواسع في الجودة ودقة القياسات واللمسة النهائية الناعمة للقطاع.',
    features: ['صناعة دقيقة متقنة', 'خامات أصلية عالية الجودة', 'أداء ناعم بدون اهتزاز']
  },

  // --- مناشير الإتقان السوري موديل 2026 ---
  {
    id: 'saw-etqan-2026-18',
    name: 'منشار الإتقان السوري 18 بوصة',
    category: 'saws',
    subCategory: 'مناشير الإتقان السوري موديل 2026',
    newPrice: 47500,
    oldPrice: 55000,
    hot: false,
    image: '',
    description: 'أحدث موديل 2026 للإتقان السوري، تحديث كامل للمنظومة الحركية وقوة التثبيت، خصم 7,500 جنيه لفترة محدودة.',
    features: ['موديل 2026 الحديث', 'شاسيه مقوى مانع للانحراف', 'توفير 7,500 ج فوري', 'ضمان 5 سنوات']
  },
  {
    id: 'saw-etqan-2026-20',
    name: 'منشار الإتقان السوري 20 بوصة',
    category: 'saws',
    subCategory: 'مناشير الإتقان السوري موديل 2026',
    newPrice: 57500,
    oldPrice: 60000,
    hot: false,
    image: '',
    description: 'قطر قرص 20 بوصة يسمح بقص أضخم قطاعات الستائر والواجهات المعمارية الكبيرة بكل راحة وسلاسة.',
    features: ['قرص عملاق 20 بوصة', 'عمق قص واسع للقطاعات الكبيرة', 'محرك ثقيل معزول ضد الأتربة']
  },

  // --- مناشير بدر ---
  {
    id: 'saw-badr-new',
    name: 'بدر الجديد',
    category: 'saws',
    subCategory: 'مناشير بدر',
    newPrice: 53000,
    oldPrice: 60000,
    hot: false,
    image: '',
    description: 'منشار ماركة بدر الجديد كلياً، تكنولوجيا حديثة في ضبط الزوايا والمحافظة على الصينية من التآكل.',
    features: ['توفير 7,000 ج', 'طاولة متسعة ومسطرة معايرة دقيقة', 'نظام تشحيم مدمج']
  },
  {
    id: 'saw-badr-thuraya',
    name: 'بدر الثريا',
    category: 'saws',
    subCategory: 'مناشير بدر',
    newPrice: 80000,
    oldPrice: 85000,
    hot: false,
    image: '',
    description: 'موديل الثريا الممتاز من مصانع بدر، كفاءة لا تضاهى مع ثبات الزوايا 45 درجة بدقة المليمتر.',
    features: ['تصميم عالي التحمل', 'أداء هادئ قليل الضوضاء', 'مناسب لخطوط الإنتاج السريعة']
  },
  {
    id: 'saw-badr-auto',
    name: 'بدر أوتوماتيك',
    category: 'saws',
    subCategory: 'مناشير بدر',
    newPrice: 147500,
    oldPrice: 150000,
    hot: false,
    image: '',
    description: 'ماكينة قص أوتوماتيكية ثقيلة من بدر، تحكم كامل في سرعة النزول وارتفاع الصينية بحماية متطورة.',
    features: ['أوتوماتيك بالكامل', 'تحكم هوائي مزدوج بالبساتم', 'طاولة قياس وتغذية']
  },

  // --- مناشير سيمبلكس ---
  {
    id: 'saw-simplex-18-manual',
    name: 'منشار سيمبلكس 18 بوصة يدوي',
    category: 'saws',
    subCategory: 'مناشير سيمبلكس',
    newPrice: 77500,
    oldPrice: 80000,
    hot: false,
    image: '',
    description: 'سيمبلكس اليدوي 18 بوصة بجودة تصنيع فائقة ومعايير عالمية لعمر افتراضي يدوم لعشرات السنين.',
    features: ['جسم زهر متين', 'موتور أوروبي المواصفات', 'توجيه يدوي ناعم للغاية']
  },
  {
    id: 'saw-simplex-semi-auto',
    name: 'منشار سيمبلكس نصف أوتوماتيك',
    category: 'saws',
    subCategory: 'مناشير سيمبلكس',
    newPrice: 87500,
    oldPrice: 90000,
    hot: false,
    image: '',
    description: 'نصف أوتوماتيك يجمع بين مرونة التحكم اليدوي وسرعة الكبس والتثبيت الهوائي التلقائي.',
    features: ['نصف أوتوماتيك ذكي', 'كبس هوائي للقطاع قبل القص', 'أمان عالي للعامل']
  },
  {
    id: 'saw-simplex-full-auto',
    name: 'منشار سيمبلكس أوتوماتيك كامل',
    category: 'saws',
    subCategory: 'مناشير سيمبلكس',
    newPrice: 92500,
    oldPrice: 95000,
    hot: false,
    image: '',
    description: 'الماكينة الرائدة من سيمبلكس بنظام أوتوماتيكي متكامل، إنتاجية خيالية وتشغيل بنقرة زر واحدة.',
    features: ['أوتوماتيك كامل دورة متكاملة', 'أعلى طاقة إنتاجية باليوم', 'دقة قص ليزرية']
  },

  // --- مناشير BSM ---
  {
    id: 'saw-bsm-20',
    name: 'منشار BSM 20 بوصة',
    category: 'saws',
    subCategory: 'مناشير BSM',
    newPrice: 127500,
    oldPrice: 130000,
    hot: false,
    image: '',
    description: 'منشار BSM الشهير قرص 20 بوصة، مواصفات تصدير وتحمل فائق للأعمال الثقيلة والقطاعات الضخمة.',
    features: ['قرص 20 بوصة صناعي', 'تثبيت هوائي مزدوج رأسي وأفقي', 'طاولة متسعة']
  },
  {
    id: 'saw-bsm-auto-20',
    name: 'منشار BSM أوتوماتيك 20 بوصة',
    category: 'saws',
    subCategory: 'مناشير BSM',
    newPrice: 167500,
    oldPrice: 170000,
    hot: false,
    image: '',
    description: 'أعلى فئات BSM، تشغيل أوتوماتيكي كامل لقرص 20 بوصة، مع صمامات تحكم دقيقة في سرعة التغذية.',
    features: ['أوتوماتيك كامل مع تحكم بالسرعة', 'أمان وغطاء واقي أوتوماتيكي', 'ضمان وصيانة شاملة']
  },

  // --- دبل هيد ---
  {
    id: 'saw-double-head',
    name: 'منشار دبل هيد',
    category: 'saws',
    subCategory: 'دبل هيد',
    newPrice: 1352500,
    oldPrice: 1550000,
    hot: false,
    image: '',
    description: 'منشار رأسين (Double Head) متطور لقص طرفي القطاع في نفس اللحظة بزوايا 45 و 90 درجة بدقة رقمية، مصمم للمصانع والإنتاج الضخم.',
    features: ['رأسين قص متزامنين', 'شاشة تحكم رقمية للمقاسات', 'توفير 197,500 ج عرض خاص', 'إنتاجية تضاعف الورشة 10 مرات']
  },

  // --- مناشير أتيك ---
  {
    id: 'saw-atek-vertical',
    name: 'منشار أتيك الرأسي',
    category: 'saws',
    subCategory: 'مناشير أتيك',
    newPrice: 122100,
    oldPrice: 129600,
    hot: false,
    image: '',
    description: 'منشار أتيك الرأسي التركي، حركة صعود من الأسفل للأعلى بنعومة متناهية تضمن عدم تجريح الألوميتال.',
    features: ['نظام قص صاعد من الأسفل', 'أعلى معايير الأمان', 'سطح طاولة ألومنيوم معالج']
  },
  {
    id: 'saw-atek-vertical-base-auto',
    name: 'منشار أتيك الرأسي بالقاعدة أوتوماتيك',
    category: 'saws',
    subCategory: 'مناشير أتيك',
    newPrice: 176100,
    oldPrice: 183600,
    hot: false,
    image: '',
    description: 'منشار أتيك الرأسي المزود بقاعدة مصنعية متينة ونظام تشغيل أوتوماتيكي مع تبريد رذاذي هوائي مدمج.',
    features: ['قاعدة أصلية مع أدراج تجميع الرايش', 'أوتوماتيك بالكامل', 'نظام رش رذاذ تبريد متطور']
  },

  // =========================================================================
  // 2) قسم الفرايز (لون #0F8B8D)
  // =========================================================================
  {
    id: 'mill-fitt',
    name: 'فريزة فيت',
    category: 'mills',
    newPrice: 35000,
    oldPrice: 37000,
    hot: false,
    image: '',
    description: 'فريزة فيت الاقتصادية العملية لتفريز الكوالين والاسبتوليت والفتحات في قطاعات الألوميتال والـ UPVC.',
    features: ['سرعة دوران عالية للدرفيل', 'تفريز دقيق وناعم', 'سعر اقتصادي منافس']
  },
  {
    id: 'mill-sawas',
    name: 'فريزة السواس',
    category: 'mills',
    newPrice: 41000,
    oldPrice: 45000,
    hot: false,
    image: '',
    description: 'فريزة السواس المعروفة بالثبات وسهولة حركة يد التوجيه وقوة موتور العزم.',
    features: ['يد توجيه مريحة وسلسة', 'شابلونة متعددة الفتحات', 'توفير 4,000 ج']
  },
  {
    id: 'mill-badr-no-base',
    name: 'فريزة بدر بدون قاعدة',
    category: 'mills',
    newPrice: 44500,
    oldPrice: 45000,
    hot: false,
    image: '',
    description: 'فريزة بدر الأصلية بدون قاعدة، توضع على أي طاولة ورشة، موفرة للمساحة وأداؤها قوي جداً.',
    features: ['حجم مدمج للورش الصغيرة', 'موتور قوي عالي السرعة', 'تثبيت قطاع قوي']
  },
  {
    id: 'mill-badr-with-base',
    name: 'فريزة بدر بالقاعدة',
    category: 'mills',
    newPrice: 50000,
    oldPrice: 52000,
    hot: false,
    image: '',
    description: 'فريزة بدر كاملة بقاعدتها الأصلية المتينة، ارتفاع مريح للعامل وسهولة في تنظيف رايش الألمنيوم.',
    features: ['قاعدة حديدية أصلية', 'ارتفاع مريح ومريح للظهر', 'ثبات إضافي يمنع الرعشة']
  },
  {
    id: 'mill-retim-turkish',
    name: 'فريزة رتيم التركي',
    category: 'mills',
    newPrice: 47500,
    oldPrice: 48000,
    hot: false,
    image: '',
    description: 'فريزة رتيم صناعة تركية معتمدة، جلب نحاس وحركة زلقة عالية الجودة ودرفيل تفريز أصلي.',
    features: ['صناعة تركية معتمدة', 'شابلونة تفريز ستانلس متينة', 'دقة تفريز الكوالين 100%']
  },
  {
    id: 'mill-atek',
    name: 'فريزة أتيك',
    category: 'mills',
    newPrice: 92800,
    oldPrice: 95300,
    hot: false,
    image: '',
    description: 'فريزة أتيك الاحترافية، تفريز مائي وتبريد هوائي مع بنطة تفريز أصلية وشابلونة دقيقة.',
    features: ['مواصفات مصانع كبرى', 'تثبيت هوائي فوري للقطاع', 'عمر افتراضي طويل للبنطة']
  },
  {
    id: 'mill-atek-with-base',
    name: 'فريزة أتيك بالقاعدة',
    category: 'mills',
    newPrice: 145100,
    oldPrice: 152600,
    hot: false,
    image: '',
    description: 'أعلى فئات الفرايز من شركة أتيك مع القاعدة الأصلية ونظام تبريد وشفط رايش متطور.',
    features: ['توفير 7,500 ج', 'قاعدة صناعية معززة', 'أعلى دقة ومستوى أمان']
  },
  {
    id: 'mill-atek-hinges',
    name: 'فريزة مفصلات أتيك',
    category: 'mills',
    newPrice: 59000,
    oldPrice: 60000,
    hot: false,
    image: '',
    description: 'فريزة مخصصة لتفريز وتخريم المفصلات والسكاكات بسرعة هائلة وتكرار متطابق في كل قطاع.',
    features: ['تفريز مفصلات سريع ودقيق', 'تكرار ثابت 100%', 'توفير وقت التجميع']
  },

  // =========================================================================
  // 3) قسم المكابس (لون #2E7D32)
  // =========================================================================
  {
    id: 'press-combined-manual',
    name: 'مكبس مجمع يدوي',
    category: 'presses',
    newPrice: 5500,
    oldPrice: 6500,
    hot: false,
    image: '',
    description: 'مكبس يدوي لتخريم وتجميع قطاعات الألوميتال، خفيف وعملي واقتصادي ومثالي للورش الناشئة.',
    features: ['سهل الحمل والنقل', 'سكاكين صلب معالجة ضد التآكل', 'توفير 1,000 ج']
  },
  {
    // تنبيه خاص بالمتطلبات: السعر القديم أقل من الجديد (15500 < 17000)، يعرض بدون سعر قديم وبدون شارة توفير
    id: 'press-zamzam-multi',
    name: 'مكبس متعدد زمزم',
    category: 'presses',
    newPrice: 17000,
    oldPrice: 15500,
    hot: false,
    image: '',
    description: 'مكبس متعدد المهام ماركة زمزم، يفتح ويخرم عدة قطاعات شائعة في السوق المصري بدقة عالية.',
    features: ['متعدد الوظائف لمختلف القطاعات', 'تصميم متوازن وقوي', 'سعر ثابت ممتاز']
  },
  {
    id: 'press-deyaa-multi',
    name: 'مكبس متعدد الضياء',
    category: 'presses',
    newPrice: 14500,
    oldPrice: 16000,
    hot: false,
    image: '',
    description: 'مكبس الضياء المتعدد لجميع تفاصيل السعد، الجامبو، والتانجو مع تشطيب فتحات خالي من الرايش.',
    features: ['توفير 1,500 ج', 'يد ضغط طويلة سهلة الاستخدام', 'سكاكين صلب صلبة جداً']
  },
  {
    id: 'press-zamzam-auto',
    name: 'مكبس متعدد زمزم أوتوماتيك',
    category: 'presses',
    newPrice: 34500,
    oldPrice: 35000,
    hot: false,
    image: '',
    description: 'مكبس هوائي أوتوماتيك بدواسة قدم يعمل بضغط الهواء من الكمبروسر، راحة تامة للعامل وضغط متزن.',
    features: ['تشغيل بدواسة قدم هوائية', 'بستم هواء قوي 8 بار', 'إنتاج سريع بدون مجهود عضلي']
  },
  {
    id: 'press-saqr-multi',
    name: 'مكبس متعدد الصقر',
    category: 'presses',
    newPrice: 24500,
    oldPrice: 28000,
    hot: true,
    image: '',
    description: 'عرض مميز على مكبس الصقر الشهير! خامات فولاذية ثقيلة تخدم ورشتك لسنوات طويلة دون تآكل.',
    features: ['عرض خاص وخصم 3,500 ج', 'صلابة فائقة وسكاكين حادة جداً', 'أكثر المكابس مبيعاً في مصر']
  },
  {
    id: 'press-sakhra',
    name: 'مكبس الصخرة',
    category: 'presses',
    newPrice: 38500,
    oldPrice: 48000,
    hot: true,
    image: '',
    description: 'عرض جبار على مكبس الصخرة العملاق بتوفير 9,500 جنيه! أعلى صلابة وضغط هائل لكافة القطاعات الثقيلة.',
    features: ['عرض خاص وخصم 9,500 ج', 'هيكل صخري ثقيل جداً', 'مناسب للمشاريع الضخمة والقطاعات الخاصة']
  },

  // =========================================================================
  // 4) قسم ماكينات اللحام (لون #B8860B)
  // =========================================================================
  {
    id: 'weld-smart',
    name: 'ماكينة لحام سمارت',
    category: 'welding',
    newPrice: 117500,
    oldPrice: 120000,
    hot: false,
    image: '',
    description: 'ماكينة لحام زوايا قطاعات UPVC رأس واحدة ذكية، سخان تفلون حراري مع تحكم رقمي بدرجة الحرارة.',
    features: ['تحكم حراري رقمي دقيق', 'لحام قوي متين لا ينكسر', 'توفير 2,500 ج']
  },
  {
    id: 'weld-anar',
    name: 'ماكينة لحام أنار',
    category: 'welding',
    newPrice: 127500,
    oldPrice: 130000,
    hot: false,
    image: '',
    description: 'ماكينة لحام أنار التركية المعروفة بصلابة هيكلها ونعومة أداء بساتم الكبس الهوائية.',
    features: ['بساتم هواء قوية للتثبيت المتزن', 'عزل حراري ممتاز للسخان', 'ضمان وصيانة معتمدة']
  },
  {
    id: 'weld-sonmez',
    name: 'ماكينة لحام سونميز',
    category: 'welding',
    newPrice: 127500,
    oldPrice: 135000,
    hot: false,
    image: '',
    description: 'ماكينة سونميز التركية الأصلية، دقة زاوية اللحام 90 درجة مع تسخين متجانس على كامل المقطع.',
    features: ['توفير 7,500 ج', 'صناعة تركية أصلية', 'سخان مطلي بتفلون عالي الجودة']
  },
  {
    id: 'weld-bsm-turkish',
    name: 'ماكينة لحام BSM التركي',
    category: 'welding',
    newPrice: 127500,
    oldPrice: 133000,
    hot: false,
    image: '',
    description: 'ماكينة لحام BSM التركي معتمدة لأعلى مواصفات اللحام والصلابة لمصانع وورش الـ UPVC.',
    features: ['توفير 5,500 ج', 'قطع غيار وسخانات متوفرة دائماً', 'سرعة إنجاز الدورة في دقيقتين']
  },
  {
    id: 'weld-badr',
    name: 'ماكينة لحام بدر',
    category: 'welding',
    newPrice: 112500,
    oldPrice: 130000,
    hot: false,
    image: '',
    description: 'عرض خصم كبير 17,500 جنيه على ماكينة لحام بدر! أفضل قيمة مقابل سعر للحام الزوايا بدقة تامة.',
    features: ['أكبر خصم: وفّر 17,500 ج فوري!', 'تجميع ولحام قطاعات UPVC بكفاءة', 'سهلة الضبط والمعايرة']
  },
  {
    id: 'weld-atek',
    name: 'ماكينة لحام أتيك',
    category: 'welding',
    newPrice: 142500,
    oldPrice: 150000,
    hot: false,
    image: '',
    description: 'ماكينة لحام أتيك للمصانع وخطوط الإنتاج السريعة، لوحة تحكم إلكترونية ومقاييس زمنية وضغط دقيقة.',
    features: ['توفير 7,500 ج', 'تحكم إلكتروني بزمن الذوبان والكبس', 'أعلى درجة نقاء وجودة للحام']
  },

  // =========================================================================
  // 5) قسم الكمبروسر (لون #2F5D8A)
  // =========================================================================
  {
    id: 'comp-100l-italian',
    name: 'كمبروسر 100 لتر إيطالي',
    category: 'compressors',
    newPrice: 18500,
    oldPrice: 20000,
    hot: false,
    image: '',
    description: 'كمبروسر هواء 100 لتر رأس إيطالي أصلي، شحن هواء سريع وضغط 8 إلى 10 بار يكفي ورشة كاملة مع بساتم المكابس والمناشير.',
    features: ['رأس كمبروسر إيطالي أصلي', 'سعة خزان 100 لتر سميك معتمد', 'شحن هواء سريع وهادئ', 'توفير 1,500 ج']
  },
  {
    id: 'comp-200l',
    name: 'كمبروسر 200 لتر',
    category: 'compressors',
    newPrice: 28500,
    oldPrice: 38000,
    hot: false,
    image: '',
    description: 'عرض هائل بتوفير 9,500 جنيه على كمبروسر 200 لتر الثقيل! مصمم لمد خطوط الهواء لعدة ماكينات في آن واحد.',
    features: ['توفير ضخم 9,500 ج فوري!', 'خزان سعة 200 لتر للمصانع والورش الكبيرة', 'موتور حصان عالي العزم', 'محبسين هواء للتوزيع المتعدد']
  }
];

/**
 * ============================================================================
 * صور ومعرض معدات شركة الإسكندرية للمناشير
 * ============================================================================
 * 
 * 📌 كيف تضيف صور جديدة لمعرض "صور المعدات"؟
 * 1. ضع الصورة في مجلد public/images/ أو في أي سيرفر خارجي (رابط URL مباشر).
 * 2. أضف عنصراً جديداً إلى مصفوفة CATALOG_SLIDES بالأسفل مع:
 *    - page: رقم ترتيبي للصورة
 *    - title: اسم الماكينة أو المنشار
 *    - subtitle: تفاصيل الموديل (مثل: يدوي، أوتوماتيك، دبل هيد)
 *    - image: المسار مثل '/images/my-saw.jpg' أو الرابط المباشر
 *    - categoryTarget: القسم ('saws' للمناشير، 'mills' للفرايز، 'presses' للمكابس، 'welding' للحام، 'compressors' للكمبروسر)
 *    - description: وصف موجز للماكينة
 */
export interface EquipmentPhoto {
  page: number;
  title: string;
  subtitle: string;
  image: string;
  categoryTarget: 'all' | 'saws' | 'mills' | 'presses' | 'welding' | 'compressors' | 'contact';
  subCategory?: string;
  description?: string;
}

export const CATALOG_SLIDES: EquipmentPhoto[] = [
  {
    page: 1,
    title: 'الغلاف والترحيب',
    subtitle: 'شركة الإسكندرية لماكينات الألوميتال والـ UPVC',
    image: '/assets/aistudio/catalog_01_d1de2ca1.png',
    categoryTarget: 'all',
    description: 'الغلاف الرسمي لكاتلوج الأسعار - ضمان 5 سنوات على كل منشار'
  },
  {
    page: 2,
    title: 'مناشير توماس وخميس',
    subtitle: 'أسعار خاصة – الكمية محدودة',
    image: '/assets/aistudio/catalog_02_cbba6703.png',
    categoryTarget: 'saws',
    subCategory: 'مناشير توماس وخميس',
    description: 'منشار توماس 18، خميس أعلى إصدار، خميس المعدل، الهضبة، خميس أوتوماتيك، الإتقان السوري'
  },
  {
    page: 3,
    title: 'الإتقان السوري وبدر',
    subtitle: 'موديل 2026 + مناشير بدر',
    image: '/assets/aistudio/catalog_03_4dd77143.png',
    categoryTarget: 'saws',
    subCategory: 'مناشير الإتقان السوري موديل 2026',
    description: 'الإتقان السوري 18 و 20 بوصة، بدر الجديد، بدر الثريا، بدر أوتوماتيك'
  },
  {
    page: 4,
    title: 'سيمبلكس و BSM',
    subtitle: 'يدوي – نصف أوتوماتيك – أوتوماتيك',
    image: '/assets/aistudio/catalog_04_dfcec478.png',
    categoryTarget: 'saws',
    subCategory: 'مناشير سيمبلكس',
    description: 'سيمبلكس 18 بوصة يدوي ونصف وكامل أوتوماتيك، ومناشير BSM 20 بوصة'
  },
  {
    page: 5,
    title: 'دبل هيد وأتيك',
    subtitle: 'للمصانع والإنتاج الكبير',
    image: '/assets/aistudio/catalog_05_69a16efb.png',
    categoryTarget: 'saws',
    subCategory: 'دبل هيد',
    description: 'منشار دبل هيد العملاق، ومناشير أتيك الرأسية العادية وبالقاعدة الأوتوماتيك'
  },
  {
    page: 6,
    title: 'أسعار الفرايز',
    subtitle: 'فريزات ألوميتال و UPVC',
    image: '/assets/aistudio/catalog_06_54424a79.png',
    categoryTarget: 'mills',
    description: 'فريزة فيت، السواس، بدر بقاعدة وبدون، رتيم التركي، أتيك، وفريزة مفصلات أتيك'
  },
  {
    page: 7,
    title: 'أسعار المكابس',
    subtitle: 'مجمّع ومتعدد (يدوي وأوتوماتيك)',
    image: '/assets/aistudio/catalog_07_dcad5157.png',
    categoryTarget: 'presses',
    description: 'مكبس مجمع يدوي، زمزم متعدد، الضياء، زمزم أوتوماتيك، وعروض الصقر والصخرة'
  },
  {
    page: 8,
    title: 'ماكينات اللحام',
    subtitle: 'سمارت – أنار – سونميز – BSM – بدر – أتيك',
    image: '/assets/aistudio/catalog_08_f56102e0.png',
    categoryTarget: 'welding',
    description: 'ماكينات لحام زوايا UPVC برؤوس مفردة وتكنولوجيا لحام أوروبية وتركية'
  },
  {
    page: 9,
    title: 'الكمبروسر والهدايا',
    subtitle: 'كمبروسر 100 و 200 لتر + باقة الهدايا',
    image: '/assets/aistudio/catalog_09_6cc03710.png',
    categoryTarget: 'compressors',
    description: 'كمبروسرات إيطالية قوية + 5 هدايا مجانية مع كل منشار وشهادة ضمان 5 سنوات'
  },
  {
    page: 10,
    title: 'للتواصل والحجز',
    subtitle: 'اتصل أو ابعت واتساب دلوقتي',
    image: '/assets/aistudio/catalog_10_3d96af03.png',
    categoryTarget: 'contact',
    description: 'أرقام الشركة، العنوان بالمندرة، الشحن لجميع المحافظات، وشعارنا: اشتغل أسرع'
  }
];

/**
 * دالة تطبيع وبحث النصوص العربية:
 * تتجاهل التشكيل والهمزات (أ، إ، آ، ا)، التاء المربوطة (ة/ه)، الياء والألف المقصورة (ى/ي)
 */
export function normalizeArabic(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670\u0640]/g, '') // حذف التشكيل والتطويل
    .replace(/[أإآا]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/[ىي]/g, 'ي')
    .toLowerCase()
    .trim();
}

/**
 * دالة تنسيق الأرقام الإنجليزية بفواصل الآلاف مع الرمز "ج"
 * مثال: 32500 -> "32,500 ج"
 */
export function formatPrice(price: number): string {
  if (price === undefined || price === null || isNaN(price)) return '0 ج';
  return price.toLocaleString('en-US') + ' ج';
}

/**
 * دالة لمعالجة مسارات الصور والملفات الثابتة مع مسار الأساس (Vite Base)
 * لضمان عمل الصور على GitHub Pages https://user.github.io/repo/
 */
export function resolveAssetUrl(path: string | undefined): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const base = import.meta.env.BASE_URL || '/';
  const cleanBase = base.endsWith('/') ? base : base + '/';
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return cleanBase + cleanPath;
}

