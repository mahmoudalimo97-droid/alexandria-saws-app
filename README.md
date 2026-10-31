# 👑 تطبيق وكاتلوج شركة الإسكندرية للمناشير وآلات الألوميتال والـ UPVC

تطبيق متكامل يجمع بين:
1. **تطبيق ويب تقدمي (PWA)** فائق السرعة والخفة، يعمل بدون إنترنت ومعد للنشر التلقائي عبر GitHub Pages.
2. **تطبيق أندرويد حقيقي (Native Android App - APK)** مبني عبر Capacitor 8، مع خط بناء أوتوماتيكي عبر GitHub Actions يُنتج ملف الـ APK ويتيحه للتحميل المباشر فوراً على الهاتف.

- 🏷️ **معرف الحزمة (Package ID):** `com.alexandriasaws.app`
- 🏷️ **اسم التطبيق (App Name):** `Alexandria Saws` / `شركة الإسكندرية للمناشير`
- 🎨 **الهوية البصرية:** مظهر هادئ بلونين (`#0F3B4C` مع الأبيض)، خط تجوال مدمج محلياً 100%، وتصميم مؤطر ومنظم بدقة لشاشات الهواتف.

---

## 🚀 أولاً: حل مشكلة GitHub Pages (`HttpError: Not Found`)

### ❓ سبب المشكلة الأساسي:
رسالة الخطأ:
```text
Error: Get Pages site failed. HttpError: Not Found
```
تحدث لأن أداة `actions/configure-pages` تحاول الاستعلام عن موقع GitHub Pages في مستودعك عبر الـ API، وحينما يكون GitHub Pages غير مفعل بعد أو مضبوطاً على الوضع القديم (Deploy from a branch)، يُرجع خادم GitHub خطأ `404 Not Found`.

### ✅ كيف تم حل المشكلة في المشروع؟
1. **التفعيل التلقائي في الـ Workflow (`.github/workflows/deploy.yml`):**
   تم تزويد خطوة `actions/configure-pages@v4` بخيار `enablement: true`، ليقوم الـ Action بتفعيل GitHub Pages تلقائياً عبر صلاحية `pages: write`.
2. **نظام النشر المزدوج الفوري (Dual Fallback):**
   في حال لم يكن GitHub Pages مفعلاً بنظام Actions بعد، يقوم الـ Workflow تلقائياً بتنفيذ خطوة بديلة عبر `peaceiris/actions-gh-pages` للنشر على فرع `gh-pages`، مما يضمن نجاح النشر 100% تحت أي ظرف.
3. **ضبط مسار الـ Base تلقائياً في Vite:**
   يقوم الـ Workflow بتحديد إذا كان المستودع فرعياً (`/${{ github.event.repository.name }}/`) أو مستودع مستخدم رئيسي (`/`)، مع نسخ `dist/404.html` لدعم مسارات SPA بدون أي شاشة بيضاء.

### 📌 الخطوة الوحيدة المطلوبة منك في إعدادات GitHub:
1. ادخل على مستودعك في GitHub ثم اضغط على **Settings**.
2. من القائمة الجانبية اختر **Pages**.
3. تحت خيار **Build and deployment**:
   - في قائمة **Source**: اختر **`GitHub Actions`**.
4. بمجرد اختيارها، أي عملية Push أو تشغيل يدوي للـ Workflow ستنشر الموقع بنجاح تام وبدون أي أخطاء.

---

## 📱 ثانياً: تطبيق الأندرويد (Android APK) وطريقة التحميل

المشروع يحتوي على كود الأندرويد الأصلي بالكامل داخل مجلد `/android`، ومجهز بخط إنتاج مؤتمت يبني الـ APK تلقائياً في كل مرة ترفع فيها كود أو تعمل Release!

### 📥 1) تحميل ملف الـ APK مباشرة على هاتفك (بدون كمبيوتر):
1. افتح صفحة مستودعك على GitHub من متصفح الهاتف أو الكمبيوتر.
2. اضغط على تبويب **Actions** من شريط المستودع العلوي.
3. اضغط على آخر عملية بناء باسم **Build Android APK**.
4. انزل إلى أسفل الصفحة تحت قسم **Artifacts**.
5. ستجد ملف مضغوط باسم **`Alexandria-Saws-Android-APK`**:
   - اضغط عليه ليتم تحميله فوراً على هاتفك.
   - افتح الملف وستجد بداخله ملف `Alexandria-Saws-debug.apk`.
   - اضغط عليه وثبته على هاتفك ومبروك التطبيق يعمل كبرنامج مثبت على الموبايل!
6. **(اختياري) عبر الـ Releases:**
   - عند إنشاء أي `Release` أو `Tag` في المستودع (مثال: `v1.0.0`)، يقوم الـ Workflow بإرفاق ملف `Alexandria-Saws-debug.apk` مباشرة في صفحة الإصدارات (Releases) لتقوم بالتحميل بضغطة زر واحدة.

---

## 🔐 ثالثاً: إعدادات التوقيع الرقمي (Signing Key) عبر GitHub Secrets

للحصول على نسخة نهائية موقعة (Signed Release APK) جاهزة للنشر على المتاجر دون كتابة أي كلمة سر داخل الكود:

### 1) توليد مفتاح التوقيع (Keystore):
من جهازك (أو من سطر الأوامر)، يمكنك تشغيل أمر:
```bash
keytool -genkey -v -keystore release.keystore -alias alexandriasaws -keyalg RSA -keysize 2048 -validity 10000
```

### 2) تحويل ملف الـ Keystore إلى نص Base64:
- على نظام لينكس أو ماك:
  ```bash
  base64 -w 0 release.keystore > keystore_base64.txt
  ```
- على نظام ويندوز (PowerShell):
  ```powershell
  [Convert]::ToBase64String([IO.File]::ReadAllBytes("release.keystore")) | Out-File -Encoding ASCII keystore_base64.txt
  ```

### 3) إضافة المتغيرات السرية في GitHub Secrets:
1. في صفحة المستودع على GitHub، اذهب إلى: **Settings** -> **Secrets and variables** -> **Actions**.
2. اضغط **New repository secret** وأضف الآتي:
   - `KEYSTORE_BASE64`: محتوى ملف `keystore_base64.txt`.
   - `KEYSTORE_PASSWORD`: كلمة المرور الخاصة بالـ Keystore.
   - `KEY_ALIAS`: الاسم المستعار (مثال: `alexandriasaws`).
   - `KEY_PASSWORD`: كلمة المرور الخاصة بالمفتاح.
3. فور إضافة هذه المتغيرات، سيقوم GitHub Actions في البناء القادم ببناء وتوقيع ملف **`Alexandria-Saws-release.apk`** تلقائياً ودون كشف أي سر.

---

## 💻 رابعاً: البناء والتطوير المحلي عبر Android Studio

إذا أردت تشغيل المشروع أو التعديل عليه من جهاز الكمبيوتر:

### 1) المتطلبات:
- Node.js 18 فما فوق.
- تثبيت Android Studio مع Android SDK 34+.

### 2) خطوات التشغيل:
```bash
# تثبيت الحزم
npm install

# بناء ملفات الويب وتحديث كود الأندرويد
npm run cap:build

# فتح المشروع داخل Android Studio
npx cap open android
```
- سيفتح تطبيق Android Studio تلقائياً، قم بتوصيل هاتفك بكابل USB أو تشغيل الـ Emulator، واضغط على زر **Run ▶** لتشغيل التطبيق وتجربته.

---

## ✏️ خامساً: تعديل وتحديث الأسعار والبيانات

جميع بيانات الكاتلوج والمكائن وأرقام التواصل مجمعة في ملف واحد:
👉 `src/data.ts`

### لتحديث سعر:
ابحث عن المنشار أو الماكينة وعدّل القيمة:
```ts
{
  id: 'saw-thomas-18',
  name: 'منشار توماس 18 بوصة',
  newPrice: 32500, // السعر الحالي الجديد
  oldPrice: 35000, // السعر قبل الخصم (أو 0 إذا لم يوجد خصم)
  hot: true,
}
```

### لنشر التحديث:
```bash
git add src/data.ts
git commit -m "تحديث أسعار الربع الأول 2026"
git push
```
- سيتم تحديث موقع الويب تلقائياً عبر GitHub Pages.
- سيتم بناء نسخة أندرويد جديدة بالأسعار المحدثة فوراً.

---

## 📱 سادساً: هيكل المشروع

```text
├── .github/workflows/
│   ├── deploy.yml            # خط النشر التلقائي لموقع الويب على GitHub Pages
│   └── android-build.yml     # خط بناء تطبيق الأندرويد وإنتاج ملف الـ APK
├── android/                  # مشروع الأندرويد الأصلي (Capacitor Native Android)
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── AndroidManifest.xml # الصلاحيات وإعدادات التطبيق
│   │   │   ├── java/com/alexandriasaws/app/MainActivity.java
│   │   │   └── res/values/strings.xml
│   │   └── build.gradle      # إعدادات Gradle والتوقيع الرقمي
│   └── build.gradle
├── capacitor.config.ts       # إعدادات كاباسيتور وربط التطبيق
├── src/
│   ├── App.tsx               # واجهة التطبيق الثلاثية (الأسعار، الخدمات، التواصل)
│   ├── data.ts               # جميع الأسعار وبيانات الشركة والمنتجات
│   └── main.tsx
├── package.json
└── vite.config.ts
```
