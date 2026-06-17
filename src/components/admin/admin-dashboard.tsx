"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Users,
  Calendar,
  BookMarked,
  Settings,
  LogOut,
  ExternalLink,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  Search,
  Loader2,
} from "lucide-react";
import Link from "next/link";

const tabs = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "posts", label: "النصوص", icon: FileText },
  { id: "authors", label: "الكتّاب", icon: Users },
  { id: "events", label: "الفعاليات", icon: Calendar },
  { id: "magazines", label: "المجلة", icon: BookMarked },
  { id: "settings", label: "الإعدادات", icon: Settings },
];

// Fallback data
const fallbackPosts = [
  { id: "1", title: "تلويحة من شرفة الغيب", author: "وسيم الزبيري", category: "شعر فصيح", views: 1240, status: "PUBLISHED", publishedAt: new Date().toISOString() },
  { id: "2", title: "أصداء الصمت في أروقة الروح", author: "د. خالد القاضي", category: "نقد أدبي", views: 856, status: "PUBLISHED", publishedAt: new Date(Date.now() - 86400000).toISOString() },
  { id: "3", title: "ظلال النور", author: "شذى المالكي", category: "القصة القصيرة", views: 2045, status: "PUBLISHED", publishedAt: new Date(Date.now() - 172800000).toISOString() },
  { id: "4", title: "همسات تحت ضوء القمر", author: "أحمد الرويلي", category: "خاطرة", views: 1532, status: "PUBLISHED", publishedAt: new Date(Date.now() - 259200000).toISOString() },
];

const fallbackAuthors = [
  { id: "1", name: "وسيم الزبيري", country: "اليمن", postCount: 87, status: "ACTIVE" },
  { id: "2", name: "د. خالد القاضي", country: "السعودية", postCount: 42, status: "ACTIVE" },
  { id: "3", name: "شذى المالكي", country: "الإمارات", postCount: 35, status: "ACTIVE" },
  { id: "4", name: "أحمد الرويلي", country: "الأردن", postCount: 28, status: "ACTIVE" },
  { id: "5", name: "فاطمة الحسيني", country: "البحرين", postCount: 19, status: "ACTIVE" },
  { id: "6", name: "عبدالله الشمري", country: "الكويت", postCount: 24, status: "ACTIVE" },
];

const fallbackEvents = [
  { id: "1", title: "أمسية شعرية: أناشيد الغياب", eventDate: new Date(Date.now() + 7 * 86400000).toISOString(), location: "الرياض", eventType: "READING", status: "UPCOMING" },
  { id: "2", title: "ورشة كتابة القصة القصيرة", eventDate: new Date(Date.now() + 14 * 86400000).toISOString(), location: "عدن", eventType: "WORKSHOP", status: "UPCOMING" },
  { id: "3", title: "مسابقة الإبداع الأدبي الثانية", eventDate: new Date(Date.now() + 30 * 86400000).toISOString(), location: "إلكتروني", eventType: "COMPETITION", status: "UPCOMING" },
  { id: "4", title: "لقاء شهري: نقد تجربة شعرية", eventDate: new Date(Date.now() - 7 * 86400000).toISOString(), location: "بث مباشر", eventType: "MEETING", status: "PAST" },
];

const fallbackMagazines = [
  { id: "1", title: "العدد الأول: أناشيد الفجر", issueNumber: 1, publishedAt: new Date(Date.now() - 90 * 86400000).toISOString(), status: "PUBLISHED" },
  { id: "2", title: "العدد الثاني: مرايا الروح", issueNumber: 2, publishedAt: new Date(Date.now() - 30 * 86400000).toISOString(), status: "PUBLISHED" },
  { id: "3", title: "العدد الثالث: ظلال الكلمة", issueNumber: 3, publishedAt: new Date().toISOString(), status: "PUBLISHED" },
];

type Props = {
  onLogout: () => void;
};

export function AdminDashboard({ onLogout }: Props) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex">
      {/* Sidebar */}
      <aside className={`fixed lg:sticky top-0 right-0 h-screen w-64 bg-[var(--color-surface)] border-l border-[var(--color-border)] z-50 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}`}>
        <div className="p-5 border-b border-[var(--color-border)]">
          <div className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 rounded-md overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo-almuna-small.png" alt="المنى" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-amiri text-sm font-bold text-[var(--color-text-primary)]">لوحة التحكم</p>
              <p className="text-[10px] text-[var(--accent)]">المنى الإبداعية</p>
            </div>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${activeTab === tab.id ? "bg-[var(--accent)]/10 text-[var(--accent)] font-medium" : "text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)]"}`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-3 border-t border-[var(--color-border)] space-y-1">
          <Link href="/" target="_blank" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] transition-colors">
            <ExternalLink className="w-4 h-4" />
            عرض الموقع
          </Link>
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors">
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-5 py-3 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 text-[var(--color-text-primary)]">
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <h1 className="font-amiri text-lg font-bold text-[var(--color-text-primary)]">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <div className="text-xs text-[var(--color-text-tertiary)]">
            {new Date().toLocaleDateString("ar-SA", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </header>

        <div className="p-5">
          {activeTab === "dashboard" && <DashboardView />}
          {activeTab === "posts" && <PostsView />}
          {activeTab === "authors" && <AuthorsView />}
          {activeTab === "events" && <EventsView />}
          {activeTab === "magazines" && <MagazinesView />}
          {activeTab === "settings" && <SettingsView />}
        </div>
      </main>
    </div>
  );
}

// === Generic data fetcher hook ===
function useApiData<T>(endpoint: string, fallback: T[]) {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/${endpoint}`);
      if (res.ok) {
        const json = await res.json();
        if (Array.isArray(json) && json.length > 0) {
          setData(json);
        }
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// === Dashboard View ===
function DashboardView() {
  const [stats, setStats] = useState({ posts: 318, authors: 45, events: 3, magazines: 3 });
  const { data: recentPosts } = useApiData("posts", fallbackPosts);

  useEffect(() => {
    fetch("/api/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {});
  }, []);

  const statCards = [
    { label: "نصوص منشورة", value: stats.posts, icon: FileText },
    { label: "كتّاب نشطون", value: stats.authors, icon: Users },
    { label: "فعاليات قادمة", value: stats.events, icon: Calendar },
    { label: "إصدارات المجلة", value: stats.magazines, icon: BookMarked },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5"
          >
            <stat.icon className="w-6 h-6 text-[var(--accent)] mb-3" />
            <div className="font-ruqaa text-3xl font-bold text-[var(--color-text-primary)] mb-1">
              {typeof stat.value === "number" ? stat.value.toLocaleString("ar-EG") : stat.value}
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5">
        <h3 className="font-amiri text-lg font-bold text-[var(--color-text-primary)] mb-4">آخر النصوص المنشورة</h3>
        <div className="space-y-3">
          {recentPosts.slice(0, 5).map((post: any) => (
            <div key={post.id} className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">{post.title}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">{post.author} · {post.category}</p>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
                <span>{post.views || 0} مشاهدة</span>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600">
                  {post.status === "PUBLISHED" ? "منشور" : post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// === Posts View ===
function PostsView() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { data: posts, loading, refetch } = useApiData("posts", fallbackPosts);

  const filtered = posts.filter((p: any) =>
    p.title?.includes(search) || p.author?.includes(search)
  );

  const handleCreate = async (formData: any) => {
    setSubmitting(true);
    try {
      await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setShowModal(false);
      refetch();
    } catch {
      // Error
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-tertiary)]" />
          <input
            type="text"
            placeholder="بحث في النصوص..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-card-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
          />
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors whitespace-nowrap"
        >
          <Plus className="w-4 h-4" />
          نص جديد
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" />
        </div>
      ) : (
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[600px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-tertiary)]">
                <th className="text-right p-4 font-medium">العنوان</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">الكاتب</th>
                <th className="text-right p-4 font-medium hidden md:table-cell">التصنيف</th>
                <th className="text-right p-4 font-medium hidden lg:table-cell">المشاهدات</th>
                <th className="text-right p-4 font-medium">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((post: any) => (
                <tr key={post.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--doppel-bg)]">
                  <td className="p-4 text-[var(--color-text-primary)] font-medium">{post.title}</td>
                  <td className="p-4 text-[var(--color-text-secondary)] hidden sm:table-cell">{post.author}</td>
                  <td className="p-4 text-[var(--color-text-secondary)] hidden md:table-cell">{post.category}</td>
                  <td className="p-4 text-[var(--color-text-secondary)] hidden lg:table-cell">{post.views || 0}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--accent)] transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-[var(--color-text-tertiary)] hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <Modal title="إضافة نص جديد" onClose={() => setShowModal(false)}>
            <PostForm onSubmit={handleCreate} submitting={submitting} authors={fallbackAuthors.map((a) => a.name)} />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// === Authors View ===
function AuthorsView() {
  const { data: authors, loading } = useApiData("authors", fallbackAuthors);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">إجمالي: {authors.length} كاتب</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          كاتب جديد
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {authors.map((author: any) => (
            <div key={author.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-bold">
                  {author.name?.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-[var(--color-text-primary)] text-sm">{author.name}</p>
                  <p className="text-xs text-[var(--color-text-tertiary)]">{author.country || "—"}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--color-text-tertiary)]">{author.postCount || 0} نص</span>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600">{author.status === "ACTIVE" ? "نشط" : author.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// === Events View ===
function EventsView() {
  const { data: events, loading } = useApiData("events", fallbackEvents);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">إجمالي: {events.length} فعالية</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          فعالية جديدة
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden overflow-x-auto">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-[var(--color-border)] text-[var(--color-text-tertiary)]">
                <th className="text-right p-4 font-medium">العنوان</th>
                <th className="text-right p-4 font-medium hidden sm:table-cell">التاريخ</th>
                <th className="text-right p-4 font-medium hidden md:table-cell">المكان</th>
                <th className="text-right p-4 font-medium">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event: any) => (
                <tr key={event.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--doppel-bg)]">
                  <td className="p-4 text-[var(--color-text-primary)] font-medium">{event.title}</td>
                  <td className="p-4 text-[var(--color-text-secondary)] hidden sm:table-cell">
                    {event.eventDate ? new Date(event.eventDate).toLocaleDateString("ar-SA") : "—"}
                  </td>
                  <td className="p-4 text-[var(--color-text-secondary)] hidden md:table-cell">{event.location || "—"}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-xs ${event.status === "UPCOMING" ? "bg-green-500/10 text-green-600" : "bg-gray-500/10 text-gray-500"}`}>
                      {event.status === "UPCOMING" ? "قادمة" : event.status === "PAST" ? "سابقة" : event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// === Magazines View ===
function MagazinesView() {
  const { data: magazines, loading } = useApiData("magazines", fallbackMagazines);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">إجمالي: {magazines.length} إصدار</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          إصدار جديد
        </button>
      </div>
      {loading ? (
        <div className="flex justify-center py-12"><Loader2 className="w-6 h-6 text-[var(--accent)] animate-spin" /></div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {magazines.map((mag: any) => (
            <div key={mag.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-[var(--accent)] font-medium">العدد {mag.issueNumber}</span>
                <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-600 text-xs">{mag.status === "PUBLISHED" ? "منشور" : mag.status}</span>
              </div>
              <h3 className="font-amiri text-base font-bold text-[var(--color-text-primary)] mb-2">{mag.title}</h3>
              <p className="text-xs text-[var(--color-text-tertiary)]">
                {mag.publishedAt ? new Date(mag.publishedAt).toLocaleDateString("ar-SA") : "—"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// === Settings View ===
function SettingsView() {
  const [settings, setSettings] = useState({
    siteName: "مؤسسة المنى الإبداعية",
    siteDescription: "منصة أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير",
    adminEmail: "info@almuna.org",
    postsPerPage: "12",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.siteName) setSettings(d);
      })
      .catch(() => {});
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Error
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-6">
        <h3 className="font-amiri text-lg font-bold text-[var(--color-text-primary)] mb-4">إعدادات الموقع</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">اسم الموقع</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">وصف الموقع</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={2}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">بريد الإدارة</label>
            <input
              type="email"
              value={settings.adminEmail}
              onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">عدد النصوص لكل صفحة</label>
            <input
              type="number"
              value={settings.postsPerPage}
              onChange={(e) => setSettings({ ...settings, postsPerPage: e.target.value })}
              className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saved ? "تم الحفظ ✓" : "حفظ الإعدادات"}
        </button>
      </div>
    </div>
  );
}

// === Modal ===
function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] sticky top-0 bg-[var(--color-surface)] z-10">
          <h2 className="font-amiri text-lg font-bold text-[var(--color-text-primary)]">{title}</h2>
          <button onClick={onClose} className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </motion.div>
    </motion.div>
  );
}

// === Post Form ===
function PostForm({ onSubmit, submitting, authors }: { onSubmit: (data: any) => void; submitting: boolean; authors: string[] }) {
  const [form, setForm] = useState({
    title: "",
    author: authors[0] || "",
    category: "شعر فصيح",
    excerpt: "",
    body: "",
    status: "PUBLISHED",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">عنوان النص *</label>
        <input
          type="text"
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="أدخل عنوان النص"
          className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">الكاتب *</label>
          <select
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
          >
            {authors.map((a) => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">التصنيف *</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
          >
            <option>شعر فصيح</option>
            <option>نقد أدبي</option>
            <option>القصة القصيرة</option>
            <option>خاطرة</option>
            <option>مقال</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">مقتطف</label>
        <textarea
          value={form.excerpt}
          onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          rows={2}
          placeholder="مقتطف قصير..."
          className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">النص الكامل *</label>
        <textarea
          required
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          rows={8}
          placeholder="اكتب النص هنا..."
          className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none font-amiri text-base leading-relaxed"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
        >
          {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          نشر النص
        </button>
        <button
          type="button"
          onClick={() => onSubmit({ ...form, status: "DRAFT" })}
          className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-border)] text-sm font-medium rounded-md hover:border-[var(--accent)] transition-colors text-[var(--color-text-primary)]"
        >
          حفظ كمسودة
        </button>
      </div>
    </form>
  );
}
