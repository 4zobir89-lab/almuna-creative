# وثيقة متطلبات المنتج (PRD) — منصة "مؤسسة المنى الإبداعية" الرقمية

**الإصدار:** 2.0 | **الحالة:** معتمدة | **آخر تحديث:** 2026-06-05

---

## 1. الرؤية ونطاق المنتج (Product Vision & Scope)

### 1.1 البيان الاستراتيجي
منصة رقمية مؤسسية وأرشيفية لمؤسسة المنى الإبداعية، تعمل كواجهة رسمية للهوية المؤسسية، وكمستودع رقمي موثق للإنتاج الأدبي اليومي، مع الحفاظ على حيوية التفاعل المجتمعي المنبثق من نواة الواتساب.

### 1.2 الأهداف الاستراتيجية (OKRs)
| الهدف (Objective) | النتيجة الرئيسية (Key Result) | المؤشر (KPI) |
|---|---|---|
| ترسيخ الهوية المؤسسية رقمياً | إكمال 100% من صفحات التعريف بالهوية خلال Sprint 1 | 5 صفحات (الرئيسية، عن المؤسسة، الرؤية، الفريق، الشعار) |
| أرشفة كاملة للإنتاج الأدبي | رفع 1000+ عمل أدبي في الشهر الأول من الإطلاق | عدد النصوص المرفوعة / عدد الكتّاب النشطين |
| تصدير الحيوية اليومية من واتساب للمنصة | تكامل RSS/API لجلب 80%+ من المنشورات اليومية آلياً | نسبة المنشورات المترحلة آلياً |
| تمكين الكتّاب من ملفات شخصية تفاعلية | تفعيل 50+ ملفاً شخصياً نشطاً في أول 3 أشهر | عدد الملفات المكتملة / عدد الزيارات لكل ملف |

### 1.3 النطاق (In Scope)
- نظام إدارة محتوى (CMS) بأدوار متعددة (محرر، مدقق، مشرف عام)
- محرك بحث دلالي مع فلترة متعددة الأبعاد (النوع، الكاتب، الدولة، التصنيف)
- أرشيف رقمي بنظام تصنيف هرمي (Dewey-inspired للأدب العربي)
- لوحة تحكم الكاتب (Author Dashboard) لعرض الإحصائيات والأرشيف الشخصي
- واجهة تكامل مع واتساب عبر Zapier/n8n أو API وسيط
- حماية الملكية الفكرية (عدم قابلية التحديد المباشر للنصوص، علامة مائية ديناميكية)
- تجاوب كامل مع الأجهزة (RWD) مع أولوية الجوال (Mobile-First)

### 1.4 خارج النطاق (Out of Scope)
- متجر إلكتروني (يؤجل لـ Phase 2)
- منتدى منفصل (المناقشات تبقى ضمن نظام التعليقات والواتساب)
- تطبيق جوال Native (PWA يغطي الاحتياج في Phase 1)
- دفع مادي للكتّاب (مرحلة تالية بعد إثبات النموذج)

---

## 2. هندسة معمارية المعلومات (Information Architecture)

### 2.1 خريطة الموقع الشجرية (Sitemap)

```
[Root] almuna.org
│
├── [Public - لا يتطلب تسجيل]
│   ├── /
│   │   └── Hero Section (آخر المنشورات، فعالية الأسبوع، كتّاب مميزون)
│   │
│   ├── /about
│   │   ├── الهوية المؤسسية
│   │   ├── الرؤية والرسالة
│   │   ├── الشعار والعلامة التجارية (Asset Kit)
│   │   └── فريق الإدارة
│   │
│   ├── /archive                            [الأرشيف الرئيسي - الصفحة المحورية]
│   │   ├── /archive/poetry                 [شعر - فصيح، عامي، تفعيلة]
│   │   ├── /archive/prose                  [نثر - قصة، مقال، خاطرة، نقد]
│   │   ├── /archive/nasheed                [نشيد]
│   │   ├── /archive/visual                 [فن بصري - خط، رسم، تصميم]
│   │   └── /archive?author={id}&type={}&country={}  [بحث متقدم مع فلترة]
│   │
│   ├── /creators                           [قائمة الكتّاب]
│   │   └── /creators/{slug}                [ملف الكاتب الشخصي العام]
│   │       ├── السيرة المختصرة
│   │       ├── الإحصائيات (عدد النصوص، المشاهدات، التفاعل)
│   │       └── أرشيف النصوص حسب التصنيف
│   │
│   ├── /events                             [فعاليات]
│   │   ├── /events/upcoming                [قادمة]
│   │   ├── /events/past                    [سابقة]
│   │   └── /events/{slug}                  [صفحة فعالية]
│   │
│   ├── /magazine                           [مجلة المؤسسة - إصدارات دورية]
│   │   ├── /magazine/latest
│   │   ├── /magazine/archive
│   │   └── /magazine/{issue-slug}
│   │
│   ├── /contact                            [نموذج التواصل]
│   └── /search                             [صفحة نتائج البحث]
│
├── [Author Dashboard - يتطلب تسجيل دخول]
│   └── /dashboard/author
│       ├── الإحصائيات الشخصية
│       ├── أرشيفي (إدارة نصوصي)
│       ├── إضافة نص جديد (Editor)
│       └── تعديل الملف الشخصي
│
├── [Admin Panel / CMS]          (/admin)
│   ├── لوحة التحكم (Dashboard)
│   ├── إدارة المحتوى
│   │   ├── النصوص (إضافة، تعديل، حذف، تصنيف)
│   │   ├── الكتّاب (اعتماد، تعديل ملفات)
│   │   ├── الفعاليات
│   │   ├── المجلة (إصدارات)
│   │   └── الوسائط (Media Library)
│   ├── إدارة التصنيفات (Taxonomy Manager)
│   ├── إدارة المستخدمين والأدوار
│   ├── إعدادات الموقع
│   ├── سجل النشاطات (Audit Log)
│   └── أدوات التكامل (Webhook/API Import Logs)
│
└── [Static / Meta]
    ├── /privacy-policy
    ├── /terms-of-service
    └── /sitemap.xml, /robots.txt
```

### 2.2 نظام التصنيف الأدبي (Taxonomy)

```
التصنيف الجذري (Root Taxonomy)
├── الشعر
│   ├── الفصيح (عمودي، تفعيلة)
│   ├── العامي (شعبي، زجل، موال)
│   └── قصيدة النثر
│
├── النثر
│   ├── القصة القصيرة
│   ├── الرواية (مقاطع)
│   ├── المقال
│   ├── الخاطرة
│   ├── السيرة / المذكرات
│   └── النقد الأدبي
│
├── النشيد
│   └── (أناشيد بدون موسيقى - حسب تصنيف الكتّاب)
│
├── الفن البصري
│   ├── الخط العربي
│   ├── التصميم الجرافيكي
│   ├── التصوير الفوتوغرافي
│   └── الرسم
│
└── محتوى المؤسسة
    ├── بيانات صحفية
    ├── تقارير فعاليات
    └── إصدارات المجلة
```

كل كيان نصي يدعم الوسوم (Tags) حرة ومرتبطة بدولة الكاتب ونوعه الأدبي في نموذج علائقي (Many-to-Many).

---

## 3. قصص المستخدمين (User Stories) ومسارات التدفق (User Flows)

### 3.1 Epic الأول: القارئ (Reader Experience)

| ID | القصة (User Story) | معايير القبول (Acceptance Criteria) | النقاط |
|---|---|---|---|
| US-RDR-01 | كقارئ، أريد تصفح آخر المنشورات على الصفحة الرئيسية دون تسجيل، لأكتشف محتوى جديداً بسرعة. | 1. عرض آخر 12 منشوراً في Grid متجاوب<br>2. بطاقة كل منشور تحتوي: العنوان، اسم الكاتب، التصنيف، التاريخ، معاينة لأول 30 كلمة<br>3. زر "قراءة المزيد" يوجه لصفحة النص الكامل | 3 |
| US-RDR-02 | كقارئ، أريد البحث عن نص باستخدام كلمة مفتاحية مع تصفية النتائج حسب النوع والدولة والكاتب، لأجد ما يهمني بدقة. | 1. شريط بحث مع Auto-suggest (اقتراح العناوين والكتّاب)<br>2. 4 فلاتر: النوع الأدبي ▼، الكاتب ▼، الدولة ▼، الفترة الزمنية (من - إلى)<br>3. النتائج تُحدّث ديناميكياً (AJAX) دون إعادة تحميل الصفحة<br>4. صفحة نتائج مع Pagination (20 نتيجة/صفحة) | 8 |
| US-RDR-03 | كقارئ، أريد قراءة نص كامل دون إمكانية نسخه أو مشاركته خارجياً، احتراماً لحقوق الكاتب. | 1. تفعيل `user-select: none` CSS مع fallback JS<br>2. تعطيل قائمة السياق (Context Menu) على حاوية النص<br>3. علامة مائية شفافة بخلفية النص تحمل "almuna.org"<br>4. رابط مشاركة آمن (يقود للصفحة فقط وليس للنص المباشر) | 5 |
| US-RDR-04 | كقارئ، أريد تصفح أرشيف الكتّاب ومشاهدة ملفاتهم الشخصية، لاكتشاف كتاب جدد. | 1. صفحة /creators تعرض Grid لبطاقات الكتّاب مع الصورة والاسم والدولة<br>2. الترتيب: حسب الأحدث، أو حسب عدد النصوص، أو أبجدي<br>3. صفحة الكاتب تحتوي على السيرة، قائمة النصوص (مرتبة تاريخياً)<br>4. إظهار عداد: X نص، X مشاهدة إجمالية | 3 |

**تدفق المستخدم (User Flow): القارئ يبحث عن نص شعري لكاتب يمني**
```
الصفحة الرئيسية → شريط البحث ← إدخال "يمني" ← فلترة النوع: "شعر" ←
نتائج البحث (10 نصوص) ← النقر على النص الأول ← صفحة النص الكامل ←
التنقل لملف الكاتب (رابط في الترويسة) ← الاطلاع على أرشيفه
```

### 3.2 Epic الثاني: الكاتب/المبدع (Creator Experience)

| ID | القصة (User Story) | معايير القبول | النقاط |
|---|---|---|---|
| US-CRT-01 | ككاتب أعضاء المؤسسة، أريد تسجيل الدخول بلوحة التحكم الخاصة بي، لأطلع على إحصائياتي النشرية. | 1. تسجيل الدخول عبر (البريد الإلكتروني + كلمة مرور) أو OAuth (Google)<br>2. يتم إرسال رابط تحقق للمستخدمين الجدد عبر البريد<br>3. لوحة تحكم تعرض: عدد النصوص، إجمالي المشاهدات، التوزيع حسب التصنيف (Pie Chart)<br>4. تاريخ انضمامي للمؤسسة | 5 |
| US-CRT-02 | ككاتب، أريد رفع نص جديد مع اختيار تصنيفه ووسومه عبر Editor سهل، لأضيف إبداعي للأرشيف. | 1. محرر نصوص (WYSIWYG) مع دعم التشكيل العربي والقصائد الطويلة<br>2. حقول إجبارية: عنوان النص *، النوع *، التصنيف *، النص الكامل *<br>3. حقل اختياري: دولة النص (تطابق دولة الكاتب تلقائياً، قابل للتعديل)<br>4. خاصية "حفظ كمسودة" قبل النشر (Draft mode)<br>5. معاينة حية (Preview) قبل الإرسال | 8 |
| US-CRT-03 | ككاتب، أريد رؤية كل نصوصي السابقة في صفحة أرشيفي الشخصي مع إمكانية تعديلها أو حذفها، لأني أدير إنتاجي الأدبي. | 1. جدول يعرض: العنوان، التصنيف، التاريخ، حالة النشر (منشور/مسودة)، عدد المشاهدات<br>2. زر "تعديل" يوجه للمحرر مع البيانات المسبقة (Pre-populated)<br>3. زر "حذف" مع تأكيد (Modal: "هل أنت متأكد؟")<br>4. إمكانية تغيير حالة النص من "مسودة" لـ "منشور" والعكس | 3 |

### 3.3 Epic الثالث: الإدارة/المحرر (Admin & Editorial Experience)

| ID | القصة (User Story) | معايير القبول | النقاط |
|---|---|---|---|
| US-ADM-01 | كمشرف، أريد إضافة وتعديل وحذف أي محتوى في المنصة مع سجل تدقيق، لأضمن جودة الأرشفة. | 1. قائمة كاملة بكل المحتوى مع Advanced Filters<br>2. كل تعديل يسجل في Audit Log: {من؟ ماذا؟ متى؟}<br>3. دعم النشر المجدول (Schedule Post)<br>4. Bulk Actions: نشر / إخفاء / تصنيف مجموعة نصوص دفعة واحدة | 8 |
| US-ADM-02 | كمحرر، أريد إدارة الكتّاب (اعتماد، تعليق، تعديل ملفاتهم)، لأني المسؤول عن ضبط جودة الأعضاء. | 1. قائمة الكتّاب مع حالة: {نشط، معلق، بانتظار التحقق}<br>2. إرسال بريد ترحيبي تلقائي عند اعتماد الكاتب<br>3. إمكانية تعديل السيرة الذاتية للكاتب (بموافقته عبر إشعار)<br>4. خاصية "حظر" مع تعطيل فوري للوصول | 5 |
| US-ADM-03 | كمحرر، أريد استيراد منشورات من واتساب آلياً (أو يدوياً عبر رابط)، لأن النشاط اليومي يحدث هناك أولاً. | 1. سير استيراد يدوي: لصق رابط واتساب → معاينة → اختيار التصنيف → نشر<br>2. التكامل الآلي عبر ويبوك (n8n/Zapier): POST إلى /api/import<br>3. كل مستورد يحمل Metadata: {المصدر: واتساب، تاريخ الاستيراد، المستورد}<br>4. فلترة تلقائية للرسائل غير الأدبية (باستخدام نمط RegEx للشعر/النثر) | 13 |
| US-ADM-04 | كمشرف، أريد إدارة التصنيفات الأدبية (إضافة، دمج، إعادة تسمية)، لأن التصنيف يتطور مع نمو المحتوى. | 1. شجرة تصنيفات مع Drag-and-Drop لإعادة الترتيب<br>2. دمج تصنيفين (Merging) مع إعادة توجيه كل النصوص المرتبطة<br>3. حساب عدد النصوص تحت كل تصنيف مباشر<br>4. Soft Delete للتصنيفات مع إمكانية الاسترجاع | 3 |

---

## 4. المتطلبات الوظيفية (Functional Requirements)

### 4.1 FR-01: محرك البحث والفلترة (Search & Filter Engine)
| المعرف | الوصف | الأولوية |
|---|---|---|
| FR-01.1 | بحث نصي كامل (Full-text Search) عبر العناوين والمحتوى وأسماء الكتّاب باستخدام PostgreSQL tsvector أو Elasticsearch | Critical |
| FR-01.2 | Auto-suggest في شريط البحث مع Debounce (300ms) يقترح العناوين والكتّاب | High |
| FR-01.3 | فلترة متعددة المستويات: النوع الأدبي (Checkbox Group)، الكاتب (Dropdown مع بحث)، الدولة (Dropdown)، الفترة (Date Range Picker) | Critical |
| FR-01.4 | تحديث نتائج البحث عبر AJAX بدون إعادة تحميل (History API لتحديث الـ URL) | High |
| FR-01.5 | حفظ آخر 5 عمليات بحث للقارئ في Session Storage | Low |

### 4.2 FR-02: نظام الأرشفة (Archiving System)
| المعرف | الوصف | الأولوية |
|---|---|---|
| FR-02.1 | كل نص يحمل: {id, slug, title, body, type_id, author_id, tags[], country, status, created_at, published_at, view_count} | Critical |
| FR-02.2 | تعريف النصوص كمسودة أو منشورة (Draft/Publish) مع إمكانية الجدولة | High |
| FR-02.3 | إصدار فريد URL لكل نص: `/archive/{type-slug}/{author-slug}/{text-slug}` | Critical |
| FR-02.4 | نظام إصدارات (Versioning) للنصوص - تخزين آخر 5 نسخ لكل تعديل | Medium |

### 4.3 FR-03: نظام إدارة المحتوى (CMS)
| المعرف | الوصف | الأولوية |
|---|---|---|
| FR-03.1 | ثلاث أدوار وصول: {Admin: كامل}, {Editor: إدارة المحتوى+الكتّاب}, {Author: إدارة نصوصه فقط} | Critical |
| FR-03.2 | محرر نصوص غني (Rich Text Editor - اقتراح: TipTap/ProseMirror) مع دعم كامل للتشكيل العربي والقصائد الطويلة دون كسر التنسيق | Critical |
| FR-03.3 | مكتبة وسائط (Media Library) تدعم رفع الصور والملفات مع إعادة تحجيم تلقائي (ImageMagick/Sharp) | High |
| FR-03.4 | دعم النشر المجدول مع Queue خلفية تعمل بـ Cron Job | High |
| FR-03.5 | تصدير المحتوى بصيغ: JSON, XML (لأغراض النسخ الاحتياطي والتكامل) | Medium |

### 4.4 FR-04: نظام التكامل مع واتساب (Community Bridge)
| المعرف | الوصف | الأولوية |
|---|---|---|
| FR-04.1 | API Endpoint: `POST /api/v1/import` يقبل JSON payload مع {author_phone, text_content, type, tags, source_message_id} | High |
| FR-04.2 | نهاية ويبوك (Webhook Receiver) من n8n/Zapier تستقبل المنشورات وتضيفها لـ Queue اعتماد المحرر | High |
| FR-04.3 | خوارزمية تصنيف تلقائي أولي (Auto-tagging) تستخلص التصنيف من النص عبر تحليل لغوي بسيط أو Keyword Matching | Medium |
| FR-04.4 | إشعار للمحرر عند وصول منشور جديد من الواتساب (Notification Bell) | Low |
| FR-04.5 | تسجيل كل محاولات الاستيراد في Import Log مع الحالة: {نجاح، فشل، بانتظار المراجعة} | Medium |

---

## 5. المتطلبات غير الوظيفية (Non-Functional Requirements)

### 5.1 الأداء (Performance)
| المعرف | المقياس | الهدف |
|---|---|---|
| NFR-PRF-01 | زمن تحميل LCP (Largest Contentful Paint) للصفحة الرئيسية | < 2.5 ثانية (جوال) / < 1.5 ثانية (سطح مكتب) |
| NFR-PRF-02 | زمن استجابة API للبحث البسيط (P95) | < 500ms |
| NFR-PRF-03 | زمن استجابة عرض النص الكامل | < 1 ثانية (First Meaningful Paint) |
| NFR-PRF-04 | عدد المستخدمين المتزامنين (Concurrent Users) | دعم 500 مستخدم متزامن في اللحظة (Phase 1) |

### 5.2 التجاوب (Responsiveness)
| المعرف | المقياس | الهدف |
|---|---|---|
| NFR-RSP-01 | دعم جميع أحجام الشاشات (320px - 2560px) بدون كسر التصميم | 100% تغطية |
| NFR-RSP-02 | اختبار على 5 متصفحات رئيسية: Chrome، Firefox، Safari، Edge، Samsung Internet | درجة تشغيل ≥ 95% لكل متصفح |
| NFR-RSP-03 | PWA (Progressive Web App) مع Service Worker للتشغيل دون اتصال لجزء من المحتوى (آخر 20 منشوراً) | High |

### 5.3 الأمان وحماية الملكية الفكرية (Security & IP Protection)
| المعرف | المقياس | الهدف |
|---|---|---|
| NFR-SEC-01 | منع تحديد النصوص: CSS `user-select: none` + JS `document.addEventListener('copy', e => e.preventDefault())` + تعطيل Context Menu | طبقة 1 - لا يمنع المحترف لكن يمنع 95% من المستخدمين |
| NFR-SEC-02 | علامة مائية ديناميكية (Watermark) على خلفية النص: نص شفاف متكرر "almuna.org" بزاوية 45° | Medium |
| NFR-SEC-03 | حماية API بـ Rate Limiting: 100 طلب/دقيقة للضيف، 500 طلب/دقيقة للمستخدم المسجل | Critical |
| NFR-SEC-04 | جميع الطلبات عبر HTTPS مع HSTS header | Critical |
| NFR-SEC-05 | Captcha (reCAPTCHA v3) على نموذج التواصل | High |
| NFR-SEC-06 | تخزين كلمات المرور مُشفّرة بـ bcrypt مع Salt Rounds = 12 | Critical |

### 5.4 التوفر (Availability)
| المعرف | المقياس | الهدف |
|---|---|---|
| NFR-AVL-01 | وقت التشغيل (Uptime) | 99.5% (شهرياً) |
| NFR-AVL-02 | وقت التعافي من العطل (RTO) | < 4 ساعات |
| NFR-AVL-03 | نقطة استرجاع البيانات (RPO) | < 24 ساعة (نسخ احتياطي يومي) |

### 5.5 السيو (SEO)
| المعرف | المقياس | الهدف |
|---|---|---|
| NFR-SEO-01 | صفحات المحتوى الديناميكي تدعم SSR (Server-Side Rendering) أو SSG (Static Site Generation) مع Next.js | High |
| NFR-SEO-02 | كل صفحة محتوى تحمل Meta tags ديناميكية: title, description, OG tags | Critical |
| NFR-SEO-03 | Sitemap.xml يتحدّث آلياً عند كل نشر جديد | High |
| NFR-SEO-04 | Structured Data (JSON-LD) من نوع Article و CreativeWork لكل نص أدبي | Medium |

---

## 6. توجيهات واجهة المستخدم البصرية (UI Directives)

### 6.1 المبادئ البصرية (Visual Principles)
- **الفخامة الأدبية:** تصميم يعكس العمق الثقافي والرصانة الأدبية دون تكلف
- **الأناقة البسيطة (Elegant Minimalism):** مساحات بيضاء (Whitespace) لا تقل عن 40% من مساحة الصفحة
- **التباين المريح:** درجات ألوان دافئة محايدة (Warm Neutrals) مع لمسات من الذهبي أو العنابي للتمييز
- **الطباعة البصريّة:** الخطوط العربية كعنصر تصمييم لا مجرد أداة كتابة

### 6.2 نظام الألوان (Color System)
| الدور (Token) | القيمة (HEX) | الاستخدام |
|---|---|---|
| `--color-bg-primary` | `#0C0A09` | خلفية الصفحة الرئيسية - أسود دافئ |
| `--color-bg-card` | `#1C1917` | خلفية البطاقات والنصوص |
| `--color-text-primary` | `#FAFAF9` | النصوص الأساسية |
| `--color-text-secondary` | `#A8A29E` | النصوص الثانوية (التواريخ، التصنيفات) |
| `--color-accent-primary` | `#EA580C` | البرتقالي - الأزرار، الروابط، العناوين الرئيسية |
| `--color-accent-secondary` | `#F59E0B` | الذهبي - التمييز، الحدود، الأيقونات الرئيسية |
| `--color-border` | `#292524` | الحدود الفاصلة الخفيفة |
| `--color-hover` | `#292524` | تأثير Hover على البطاقات |

### 6.3 الطباعة (Typography)
| العنصر | الخط | الوزن | الحجم (Desktop) | الحجم (Mobile) | الارتفاع السطري |
|---|---|---|---|---|---|
| H1 - العنوان الرئيسي | "Amiri" | Bold (700) | 2.5rem (40px) | 1.75rem (28px) | 1.4 |
| H2 - العنوان الفرعي | "Amiri" | Semi-Bold (600) | 1.75rem (28px) | 1.375rem (22px) | 1.4 |
| H3 - عنوان القسم | "Amiri" | Semi-Bold (600) | 1.375rem (22px) | 1.125rem (18px) | 1.5 |
| متن النص الأدبي | "Amiri" | Regular (400) | 1.25rem (20px) | 1.125rem (18px) | 1.8 |
| متن المقالات | "Tajawal" | Regular (400) | 1rem (16px) | 0.9375rem (15px) | 1.7 |
| التسميات والأزرار | "Tajawal" | Medium (500) | 0.875rem (14px) | 0.875rem (14px) | 1.5 |
| التواريخ والبيانات | "Tajawal" | Light (300) | 0.8125rem (13px) | 0.75rem (12px) | 1.5 |

### 6.4 أحجام وحدة القياس (Spacing Scale)
```
--space-xs: 0.25rem (4px)
--space-sm: 0.5rem (8px)
--space-md: 1rem (16px)
--space-lg: 1.5rem (24px)
--space-xl: 2rem (32px)
--space-2xl: 3rem (48px)
--space-3xl: 4rem (64px)
--space-4xl: 6rem (96px)
```

هامش المحتوى الجانبي: `max(1rem, calc((100vw - 1200px) / 2))` للتركيز على المحتوى في منتصف الصفحة.

### 6.5 تصميم التروسيس (Header & Hero)
- شعار المؤسسة في جهة اليمين (للعربية/اليسار للإنجليزية)
- قائمة تنقل بخلفية شفافة تتحول لخلفية بيضاء (Blur + Dark) عند التمرير (Sticky Header)
- Hero section: تراكب داكن مع تأثيرات ضبابية متحركة (Glow blobs) وإحساس سينمائي عميق
- نص الترحيب في المنتصف: "حيث يلتقي الأدب بالروح"

---

## 7. نموذج البيانات (Data Model)

### 7.1 مخطط قاعدة البيانات العلائقية (ERD)

```sql
-- الكيانات الرئيسية

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'editor', 'author') NOT NULL DEFAULT 'author',
    status ENUM('active', 'suspended', 'pending') NOT NULL DEFAULT 'pending',
    display_name VARCHAR(100) NOT NULL,
    bio TEXT,
    avatar_url VARCHAR(500),
    country VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) UNIQUE NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE texts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    author_id UUID REFERENCES users(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) UNIQUE NOT NULL,
    body TEXT NOT NULL,
    excerpt VARCHAR(500),
    status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
    country VARCHAR(100),
    view_count INT DEFAULT 0,
    published_at TIMESTAMPTZ,
    scheduled_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_author FOREIGN KEY (author_id) REFERENCES users(id)
);

CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL,
    slug VARCHAR(60) UNIQUE NOT NULL
);

CREATE TABLE text_tags (
    text_id UUID REFERENCES texts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (text_id, tag_id)
);

CREATE TABLE events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) UNIQUE NOT NULL,
    description TEXT,
    event_type ENUM('competition', 'workshop', 'reading', 'meeting', 'other'),
    event_date TIMESTAMPTZ NOT NULL,
    location VARCHAR(200),
    cover_image_url VARCHAR(500),
    status ENUM('upcoming', 'past', 'cancelled') DEFAULT 'upcoming',
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_participants (
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    contribution_type VARCHAR(100),
    PRIMARY KEY (event_id, user_id)
);

-- سجل التدقيق (Audit Log)
CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address INET,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE import_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source VARCHAR(50) NOT NULL DEFAULT 'whatsapp',
    source_message_id VARCHAR(200),
    raw_payload JSONB,
    status ENUM('pending', 'approved', 'rejected', 'failed') DEFAULT 'pending',
    text_id UUID REFERENCES texts(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at TIMESTAMPTZ
);

-- Indices
CREATE INDEX idx_texts_status ON texts(status);
CREATE INDEX idx_texts_published_at ON texts(published_at DESC);
CREATE INDEX idx_texts_author ON texts(author_id);
CREATE INDEX idx_texts_category ON texts(category_id);
CREATE INDEX idx_texts_search ON texts USING gin(to_tsvector('arabic', title || ' ' || body));
CREATE INDEX idx_texts_country ON texts(country);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_users_status ON users(status);
```

---

## 8. المواصفات الفنية (Technical Specifications)

### 8.1 الحزمة التقنية المقترحة (Tech Stack)

| الطبقة | التقنية | المبرر |
|---|---|---|
| **Framework** | Next.js 14+ (App Router) | SSR, SSG, API Routes في حزمة واحدة |
| **اللغة** | TypeScript (strict mode) | Type Safety على كامل الـ Stack |
| **قاعدة البيانات** | PostgreSQL 16 | Full-text search العربي, JSONB, ACID |
| **ORM** | Prisma | Type-Safe Queries, Migrations, علاقات قوية |
| **UI Library** | Tailwind CSS + shadcn/ui | تخصيص كامل للهوية البصرية، أداء عالٍ |
| **المحرر** | TipTap (ProseMirror-based) | دعم كامل للنصوص الطويلة والتشكيل العربي |
| **المصادقة** | NextAuth.js (Auth.js) | OAuth + Credentials + JWT |
| **الاستضافة** | Vercel (Production) / Docker + VPS (DR) | Serverless Edge Functions, CDN |
| **CDN والصور** | Cloudinary / imgix | تحويل أحجام الصور، WebP تلقائي، CDN |
| **التخزين المؤقت** | Redis Upstash / Vercel KV | جلسات المستخدم، تسريع الاستعلامات المتكررة |
| **التكامل** | n8n (Self-hosted) | ربط واتساب بالـ API دون كتابة كود |
| **المراقبة** | Sentry (الأخطاء) + PostHog (التحليلات) | مراقبة شاملة مجانية في البداية |
| **CI/CD** | GitHub Actions | اختبارات آلية + Deploy تلقائي |

### 8.2 بنية النظام (System Architecture)

```
[Client Layer]
    │
    ├── Browser (Next.js SSR/CSR)
    ├── Mobile (PWA - Service Worker)
    └── WhatsApp ↔ n8n ↔ REST API
    │
    ▼
[CDN Layer - Vercel Edge / Cloudinary]
    │
    ▼
[Presentation Layer - Next.js App Router]
    ├── Public Pages (SSG/ISR)
    ├── Author Dashboard (CSR with auth)
    └── Admin Panel (CSR with RBAC)
    │
    ▼
[API Layer - Next.js API Routes / tRPC]
    ├── /api/v1/texts (CRUD + Search)
    ├── /api/v1/users (Profile + Auth)
    ├── /api/v1/categories (Taxonomy)
    ├── /api/v1/events
    └── /api/v1/import (Webhook Receiver)
    │
    ▼
[Data Layer]
    ├── PostgreSQL 16 (Primary)
    ├── Redis (Cache + Sessions)
    └── Cloudinary (Media Storage)
```

### 8.3 استراتيجية النشر (Deployment Strategy)
| البيئة | الرابط | الغرض |
|---|---|---|
| Development | `dev.almuna.vercel.app` | التطوير اليومي |
| Staging | `staging.almuna.vercel.app` | اختبار ما قبل الإنتاج |
| Production | `almuna.org` | الإطلاق العام |

**CI/CD Pipeline:**
```
Push to main → GitHub Actions → Lint + Type Check + Unit Tests →
Build → Deploy to Vercel Staging → E2E Tests (Playwright) →
Promotion to Production (Manual Gate)
```

---

## 9. بنود ما قبل الإطلاق (Pre-launch Checklist)

| # | البند | المسؤول | الحالة |
|---|---|---|---|
| 1 | تسجيل النطاق almuna.org | الإدارة | ⬜ |
| 2 | تجهيز الهوية البصرية الكاملة (Logo Kit، Favicon) | المصمم | ⬜ |
| 3 | إنشاء قاعدة البيانات وتشغيل Migrations | المطور | ⬜ |
| 4 | رفع 50 نصاً تجريبياً لاختبار الأرشفة والبحث | المحرر | ⬜ |
| 5 | اختبار التكامل مع واتساب (3 منشورات تجريبية) | المطور | ⬜ |
| 6 | اختبار الأداء (Lighthouse Score ≥ 85) | المطور | ⬜ |
| 7 | تجربة المستخدم: 5 قرّاء حقيقيين (User Acceptance Test) | المصمم | ⬜ |
| 8 | فحص الأمان: OWASP Top 10 scan | المطور | ⬜ |
| 9 | إعداد Google Analytics / Search Console | المسوق | ⬜ |
| 10 | إطلاق تجريبي لمدة أسبوع (Closed Beta) | الإدارة | ⬜ |

---

## 10. خارطة الطريق (Roadmap)

| المرحلة (Phase) | المدة | التسليمات الرئيسية (Deliverables) |
|---|---|---|
| **Phase 1 - النواة (MVP)** | 8 أسابيع | الهوية المؤسسية، الأرشفة، CMS، لوحة الكاتب، البحث الأساسي |
| **Phase 2 - الحيوية** | 4 أسابيع | تكامل واتساب الكامل (API + n8n)، الإشعارات، المجلة الدورية |
| **Phase 3 - العمق** | 6 أسابيع | محرك البحث المتقدم، التصنيفات الديناميكية، لوحة المشرف المتقدمة |
| **Phase 4 - التفاعل** | 4 أسابيع | نظام التعليقات، تفعيل المجتمع، متجر إلكتروني (اختياري) |

---

*انتهت الوثيقة | الإصدار 2.0 - خاصة بمؤسسة المنى الإبداعية | 76 متطلباً موزعاً على 10 أقسام رئيسية*
