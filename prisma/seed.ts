import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@almuna.org" },
    update: {},
    create: {
      email: "admin@almuna.org",
      passwordHash: adminPassword,
      name: "وسيم الزبيري",
      bio: "مؤسس مؤسسة المنى الإبداعية. شاعر وكاتب يمني.",
      country: "اليمن",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });

  const author2 = await prisma.user.upsert({
    where: { email: "khaled@almuna.org" },
    update: {},
    create: {
      email: "khaled@almuna.org",
      passwordHash: adminPassword,
      name: "د. خالد القاضي",
      bio: "ناقد أدبي وأكاديمي متخصص في الأدب العربي الحديث.",
      country: "السعودية",
      role: "AUTHOR",
      status: "ACTIVE",
    },
  });

  const author3 = await prisma.user.upsert({
    where: { email: "shatha@almuna.org" },
    update: {},
    create: {
      email: "shatha@almuna.org",
      passwordHash: adminPassword,
      name: "شذى المالكي",
      bio: "كاتبة قصة قصيرة وروائية. حائزة على جوائز أدبية متعددة.",
      country: "الإمارات",
      role: "AUTHOR",
      status: "ACTIVE",
    },
  });

  // Create categories
  const categories = [
    { name: "الشعر والفصاحة", slug: "poetry", description: "ديوان الشعر الفصيح والعامي، قصائد عمودية وتفعيلة ونثر", sortOrder: 1 },
    { name: "النثر والقصة", slug: "prose", description: "القصة القصيرة، الرواية، المقال، الخاطرة، والسيرة الذاتية", sortOrder: 2 },
    { name: "دراسات نقدية", slug: "critique", description: "نقد أدبي ودراسات نقدية تعنى بالتحليل والتفكيك", sortOrder: 3 },
    { name: "الفن البصري", slug: "visual-arts", description: "الخط العربي، التصميم الجرافيكي، التصوير، والرسم", sortOrder: 4 },
    { name: "النشيد", slug: "nasheed", description: "أناشيد وكلمات ملهمة بلا موسيقى", sortOrder: 5 },
    { name: "إصدارات المجلة", slug: "magazine", description: "إصدارات المجلة الدورية لمؤسسة المنى", sortOrder: 6 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  // Create sample posts
  const posts = [
    {
      title: "تلويحة من شرفة الغيب",
      slug: "wave-from-unseen",
      excerpt: "نص شعري ينسج من خيوط الغياب معطفاً للذكرى، حيث تتلاقى أطياف الماضي على شرفة الحنين وتتلاشى المسافات بين الحلم والواقع المتشظي.",
      body: "<p>على شرفة الغيبِ وقفتُ، أرقبُ طلائمَ الفجرِ وهي تتسللُ من خلفِ التلال. كان النسيمُ يحملُ همساتِ الزمنِ، يوزّعها على الجدرانِ العتيقة كأنها أسرارٌ لا تُقال.</p><p>غيبٌ يلوّحُ، وذاكرةٌ تنحني تحتَ ثقلِ الحنين، وأنا بينهما كطيفٍ لا يُدركُ نفسه. قلتُ: يا ليلُ، أَطلْ سراحَ نجومكَ، فلعلّ منها ما يهتدي إلى ثغرٍ غابَ، أو يدٍ رحلت.</p><blockquote>والبينُ يضحكُ في الظلامِ، حيناً... ويعودُ يبكي حينَ يقرعُ بابنا</blockquote><p>هكذا تُولدُ القصيدةُ من رحمِ الفراغ، تلويحةً من شرفةٍ لا ندري أين تقع، سوى أننا نجلسُ على عتبتها كل ليلة، ننتظرُ ما لا يأتي.</p>",
      authorEmail: "admin@almuna.org",
      categorySlug: "poetry",
    },
    {
      title: "أصداء الصمت في أروقة الروح",
      slug: "echoes-of-silence",
      excerpt: "مقالة نقدية تتناول تجليات الصمت في الأدب، وكيف تحول الغياب إلى لغة تنطق بأعمق المشاعر الإنسانية.",
      body: "<p>الصمتُ في الأدبِ ليس غياباً، بل حضورٌ من نوعٍ آخر. حضورٌ يتسللُ من بين السطور، ويسكنُ الفراغاتِ بين الكلمات. عندما يصمتُ النص، فإنه ينطقُ بما تعجزُ عنه الحروف.</p><p>في الأدب العربي، شكّل الصمتُ محطةً تأمليةً عميقة. من صمتِ أبي تمامِ في مرثيتهِ، إلى صمتِ المتنبي حين واجهَ سيف الدولةِ، وصولاً إلى صمتِ أدونيسَ أمامَ خرابِ المدن.</p><p>الصمتُ إذن لغةٌ، بل هو اللغةُ الأم. كل ما عداها ترجمةٌ، وكلُّ ترجمةٍ خيانة.</p>",
      authorEmail: "khaled@almuna.org",
      categorySlug: "critique",
    },
    {
      title: "ظلال النور",
      slug: "shadows-of-light",
      excerpt: "قصة قصيرة تستكشف التناقضات النفسية لبطل يبحث عن هويته في مدينة لا تنام، حيث تختلط الأضواء بظلال الماضي العتيق.",
      body: "<p>في المدينةِ التي لا تنام، كانَ يسيرُ وحيداً. ظلالُ النورِ ترتمي على واجهاتِ المباني، ترسمُ ملامحَه المتعبة. كان يبحثُ عن شيءٍ لا يعرفُه، ربما عن نفسه.</p><p>توقفتْ سيارةٌ أمامَه. انفتحَ بابُها. صوتٌ أنثويٌّ ناداه باسمٍ لم يسمعْه منذُ زمن. هل هي هي؟ أم شبحٌ من ماضيه البعيد؟</p><p>صعدَ إلى السيارة. غاصَ في عطرٍ يعرفُه. نظرَ إلى وجهها، فلم يرَ سوى ظلالِ النورِ تنعكسُ على عينيها. كانت المدينةُ لا تنام، لكنه هو من استيقظ.</p>",
      authorEmail: "shatha@almuna.org",
      categorySlug: "prose",
    },
    {
      title: "همسات تحت ضوء القمر",
      slug: "moonlit-whispers",
      excerpt: "خاطرة شعرية تفيض رقة وعذوبة، تستحضر ليالي الصيف البعيدة وأحلام الطفولة التي رحلت مع أول خيوط الفجر.",
      body: "<p>تحتَ ضوءِ القمر، تهمسُ الأشياءُ بأسرارها. الريحُ تروي للورقِ قصصاً لا يسمعها أحد. النجومُ ترمشُ كعيونِ أطفالٍ نائمين.</p><p>ليالي الصيفِ البعيدة، أحلامُ الطفولةِ التي رحلتْ مع أولِ خيوطِ الفجر. كنتُ أعدُّ النجوم، فأنامُ قبلَ أن أنتهي. كنتُ أتمنى لو يطولُ الليل، فلا يأتيَ الفجرُ بقطعِه.</p><p>اليوم، بعدَ سنوات، أعودُ لأهمسَ للقمر: أينَ أحلامي الصغيرة؟ فيجيبُ بصمتٍ يفهمُه القلب.</p>",
      authorEmail: "admin@almuna.org",
      categorySlug: "poetry",
    },
    {
      title: "في مدحِ الصحراء",
      slug: "praise-of-desert",
      excerpt: "نص أدبي يحتفي بالصحراء كرمزٍ للصفاء والتجرد، وكفضاءٍ تتكشف فيه حقيقة الإنسان.",
      body: "<p>الصحراءُ مدرسةٌ صامتة. تُعلّمُكَ الصبرَ، والتأملَ، والتجرّد. فيها تسقطُ الأقنعة، وتبقى الحقيقةُ عاريةً كالرمال.</p><p>من الصحراءِ جاءَ الشعرُ العربيُّ الأول. من رمالها ولدَ المعلقات، ومن صمتها وُلدت أعظمُ القصائد. ليست الصحراءُ فراغاً، بل امتلاءً بصمتٍ من نوعٍ آخر.</p><p>فيها، حيثُ لا شيءَ سوى الرمالِ والسماء، تكتشفُ أنكَ أنتَ أيضاً رملةٌ في كونٍ واسع. وأنَّ أعظمَ الحكمةِ هي أن تقبلَ هذه الحقيقة.</p>",
      authorEmail: "khaled@almuna.org",
      categorySlug: "prose",
    },
  ];

  for (const post of posts) {
    const author = await prisma.user.findUnique({ where: { email: post.authorEmail } });
    const category = await prisma.category.findUnique({ where: { slug: post.categorySlug } });
    if (!author || !category) continue;

    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {},
      create: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        authorId: author.id,
        categoryId: category.id,
        status: "PUBLISHED",
        publishedAt: new Date(),
      },
    });
  }

  // Create sample events
  const events = [
    {
      title: "أمسية شعرية: أناشيد الغياب",
      slug: "poetry-evening-1",
      description: "أمسية شعرية تجمع نخبة من شعراء المؤسسة لقراءة نصوصهم الأخيرة.",
      eventType: "READING",
      eventDate: new Date(Date.now() + 7 * 86400000),
      location: "قاعة الملك فهد الثقافية - الرياض",
      status: "UPCOMING",
      createdById: admin.id,
    },
    {
      title: "ورشة كتابة القصة القصيرة",
      slug: "workshop-1",
      description: "ورشة مكثفة لتقنيات كتابة القصة القصيرة بإشراف د. خالد القاضي.",
      eventType: "WORKSHOP",
      eventDate: new Date(Date.now() + 14 * 86400000),
      location: "مقر المؤسسة - عدن",
      status: "UPCOMING",
      createdById: admin.id,
    },
    {
      title: "مسابقة الإبداع الأدبي الثانية",
      slug: "competition-2",
      description: "مسابقة سنوية في الشعر والقصة والمقال. جوائز قيمة للفائزين الثلاثة الأوائل.",
      eventType: "COMPETITION",
      eventDate: new Date(Date.now() + 30 * 86400000),
      location: "إلكتروني",
      status: "UPCOMING",
      createdById: admin.id,
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }

  // Create sample magazines
  const magazines = [
    {
      title: "العدد الأول: أناشيد الفجر",
      slug: "issue-1",
      description: "العدد الافتتاحي لمجلة المنى، يحتوي على نخبة من النصوص الشعرية والنثرية.",
      issueNumber: 1,
      publishedAt: new Date(Date.now() - 90 * 86400000),
    },
    {
      title: "العدد الثاني: مرايا الروح",
      slug: "issue-2",
      description: "العدد الثاني يضم أعمالاً من ٢٤ كاتباً وكاتبة في مختلف الأجناس الأدبية.",
      issueNumber: 2,
      publishedAt: new Date(Date.now() - 30 * 86400000),
    },
    {
      title: "العدد الثالث: ظلال الكلمة",
      slug: "issue-3",
      description: "العدد الأحدث، ملف خاص عن النقد الأدبي وتجلياته المعاصرة.",
      issueNumber: 3,
      publishedAt: new Date(),
    },
  ];

  for (const mag of magazines) {
    await prisma.magazine.upsert({
      where: { slug: mag.slug },
      update: {},
      create: mag,
    });
  }

  console.log("✅ Database seeded successfully!");
  console.log("👤 Admin login: admin@almuna.org / admin123");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
