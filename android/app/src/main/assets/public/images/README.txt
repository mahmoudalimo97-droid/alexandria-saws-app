دليل إضافة ورفع صور المنتجات لكاتلوج شركة الإسكندرية
=============================================================

أهلاً بك! لإضافة صور حقيقية للمناشير والماكينات، اتبع هذه الخطوات البسيطة:

1) مكان وضع الصور:
--------------------
ضع ملفات الصور داخل هذا المجلد مباشرة:
public/images/

مثال:
public/images/thomas-18.jpg
public/images/badr-auto.jpg
public/images/press-saqr.jpg


2) كيفية تسمية الصور المقترحة:
-----------------------------
يُفضل دائماً تسمية الصور بالإنجليزية بحروف صغيرة وبدون مسافات (استخدم الشرطة -):

- منشار توماس 18:       thomas-18.jpg
- منشار خميس أعلى إصدار: khamis-top.jpg
- منشار خميس المعدل:     khamis-modified.jpg
- منشار خميس الهضبة:     khamis-hadaba.jpg
- منشار خميس أوتوماتيك:  khamis-auto.jpg
- الإتقان السوري:        etqan-syrian.jpg
- الإتقان السوري 18:      etqan-2026-18.jpg
- الإتقان السوري 20:      etqan-2026-20.jpg
- بدر الجديد:            badr-new.jpg
- بدر الثريا:            badr-thuraya.jpg
- بدر أوتوماتيك:         badr-auto.jpg
- سيمبلكس يدوي:          simplex-manual.jpg
- سيمبلكس نصف أوتوماتيك: simplex-semi.jpg
- سيمبلكس أوتوماتيك:     simplex-auto.jpg
- منشار BSM 20:          bsm-20.jpg
- منشار BSM أوتوماتيك:   bsm-auto.jpg
- دبل هيد:              double-head.jpg
- منشار أتيك الرأسي:     atek-vertical.jpg
- أتيك الرأسي بالقاعدة:   atek-auto.jpg

- فريزة فيت:             mill-fitt.jpg
- فريزة السواس:          mill-sawas.jpg
- فريزة بدر بدون قاعدة:  mill-badr-no-base.jpg
- فريزة بدر بالقاعدة:    mill-badr-base.jpg
- فريزة رتيم التركي:     mill-retim.jpg
- فريزة أتيك:            mill-atek.jpg
- فريزة أتيك بالقاعدة:   mill-atek-base.jpg
- فريزة مفصلات أتيك:     mill-hinges.jpg

- مكبس مجمع يدوي:        press-manual.jpg
- مكبس متعدد زمزم:       press-zamzam.jpg
- مكبس متعدد الضياء:     press-deyaa.jpg
- مكبس زمزم أوتوماتيك:   press-zamzam-auto.jpg
- مكبس متعدد الصقر:      press-saqr.jpg
- مكبس الصخرة:           press-sakhra.jpg

- ماكينة لحام سمارت:     weld-smart.jpg
- ماكينة لحام أنار:      weld-anar.jpg
- ماكينة لحام سونميز:    weld-sonmez.jpg
- ماكينة لحام BSM التركي: weld-bsm.jpg
- ماكينة لحام بدر:       weld-badr.jpg
- ماكينة لحام أتيك:      weld-atek.jpg

- كمبروسر 100 لتر:       comp-100.jpg
- كمبروسر 200 لتر:       comp-200.jpg


3) ربط الصورة بالمنتج في ملف src/data.ts:
----------------------------------------
افتح ملف `src/data.ts` وابحث عن المنتج، ثم ضع المسار في خانة image:
مثال:
{
  id: 'saw-thomas-18',
  name: 'منشار توماس 18 بوصة',
  ...
  image: '/images/thomas-18.jpg',
}

ملاحظة: إذا لم تضع صورة لأي منتج (تركته image: '')، التطبيق لن يتعطل ولن تظهر صورة مكسورة،
بل سيعرض تلقائياً كارت جرافيكي فخم بلون القسم وشعار أنيق.
