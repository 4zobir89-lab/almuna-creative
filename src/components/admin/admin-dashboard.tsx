"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";

// === Default data (used as fallback) ===
const defaultPosts = [
  { id: "1", title: "تلويحة من شرفة الغيب", author: "وسيم الزبيري", category: "شعر فصيح", date: "2026-06-17", views: 1240, status: "منشور" },
  { id: "2", title: "أصداء الصمت في أروقة الروح", author: "د. خالد القاضي", category: "نقد أدبي", date: "2026-06-16", views: 856, status: "منشور" },
  { id: "3", title: "ظلال النور", author: "شذى المالكي", category: "القصة القصيرة", date: "2026-06-15", views: 2045, status: "منشور" },
  { id: "4", title: "همسات تحت ضوء القمر", author: "أحمد الرويلي", category: "خاطرة", date: "2026-06-14", views: 1532, status: "منشور" },
];

const defaultAuthors = [
  { id: "1", name: "وسيم الزبيري", country: "اليمن", posts: 87, status: "نشط" },
  { id: "2", name: "د. خالد القاضي", country: "السعودية", posts: 42, status: "نشط" },
  { id: "3", name: "شذى المالكي", country: "الإمارات", posts: 35, status: "نشط" },
  { id: "4", name: "أحمد الرويلي", country: "الأردن", posts: 28, status: "نشط" },
  { id: "5", name: "فاطمة الحسيني", country: "البحرين", posts: 19, status: "نشط" },
  { id: "6", name: "عبدالله الشمري", country: "الكويت", posts: 24, status: "نشط" },
];

const defaultEvents = [
  { id: "1", title: "أمسية شعرية: أناشيد الغياب", date: "2026-06-24", location: "الرياض", type: "أمسية قراءة", status: "قادمة" },
  { id: "2", title: "ورشة كتابة القصة القصيرة", date: "2026-07-01", location: "عدن", type: "ورشة", status: "قادمة" },
  { id: "3", title: "مسابقة الإبداع الأدبي الثانية", date: "2026-07-17", location: "إلكتروني", type: "مسابقة", status: "قادمة" },
  { id: "4", title: "لقاء شهري: نقد تجربة شعرية", date: "2026-06-10", location: "بث مباشر", type: "لقاء", status: "سابقة" },
];

const defaultMagazines = [
  { id: "1", title: "العدد الأول: أناشيد الفجر", number: "1", date: "2026-03-19", status: "منشور" },
  { id: "2", title: "العدد الثاني: مرايا الروح", number: "2", date: "2026-05-18", status: "منشور" },
  { id: "3", title: "العدد الثالث: ظلال الكلمة", number: "3", date: "2026-06-17", status: "منشور" },
];

const tabs = [
  { id: "dashboard", label: "لوحة التحكم", icon: LayoutDashboard },
  { id: "posts", label: "النصوص", icon: FileText },
  { id: "authors", label: "الكتّاب", icon: Users },
  { id: "events", label: "الفعاليات", icon: Calendar },
  { id: "magazines", label: "المجلة", icon: BookMarked },
  { id: "settings", label: "الإعدادات", icon: Settings },
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
      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen w-64 bg-[var(--color-surface)] border-l border-[var(--color-border)] z-50 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
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
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm transition-colors ${
                activeTab === tab.id
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] font-medium"
                  : "text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] hover:text-[var(--color-text-primary)]"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 inset-x-0 p-3 border-t border-[var(--color-border)] space-y-1">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            عرض الموقع
          </Link>
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            تسجيل الخروج
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[var(--color-surface)] border-b border-[var(--color-border)] px-5 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 text-[var(--color-text-primary)]"
          >
            <LayoutDashboard className="w-5 h-5" />
          </button>
          <h1 className="font-amiri text-lg font-bold text-[var(--color-text-primary)]">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h1>
          <div className="text-xs text-[var(--color-text-tertiary)]">
            {new Date().toLocaleDateString("ar-SA", { weekday: "long", day: "numeric", month: "long" })}
          </div>
        </header>

        {/* Content */}
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

// === Dashboard View ===
function DashboardView() {
  const stats = [
    { label: "نصوص منشورة", value: "٣١٨", icon: FileText, color: "text-[var(--accent)]" },
    { label: "كتّاب نشطون", value: "٤٥", icon: Users, color: "text-[var(--accent-secondary)]" },
    { label: "فعاليات قادمة", value: "٣", icon: Calendar, color: "text-[var(--accent)]" },
    { label: "إصدارات المجلة", value: "٣", icon: BookMarked, color: "text-[var(--accent-secondary)]" },
  ];

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5"
          >
            <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
            <div className="font-ruqaa text-3xl font-bold text-[var(--color-text-primary)] mb-1">
              {stat.value}
            </div>
            <div className="text-xs text-[var(--color-text-tertiary)]">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Recent activity */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5">
        <h3 className="font-amiri text-lg font-bold text-[var(--color-text-primary)] mb-4">
          آخر النصوص المنشورة
        </h3>
        <div className="space-y-3">
          {defaultPosts.map((post) => (
            <div
              key={post.id}
              className="flex items-center justify-between py-2 border-b border-[var(--color-border)] last:border-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--color-text-primary)] truncate">
                  {post.title}
                </p>
                <p className="text-xs text-[var(--color-text-tertiary)]">
                  {post.author} · {post.category}
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs text-[var(--color-text-tertiary)] flex-shrink-0">
                <span>{post.views} مشاهدة</span>
                <span className="px-2 py-0.5 rounded bg-[var(--success)]/10 text-[var(--success)]">
                  {post.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "إضافة نص", icon: Plus, color: "var(--accent)" },
          { label: "إضافة كاتب", icon: Users, color: "var(--accent-secondary)" },
          { label: "إضافة فعالية", icon: Calendar, color: "var(--accent)" },
          { label: "إصدار مجلة", icon: BookMarked, color: "var(--accent-secondary)" },
        ].map((action, i) => (
          <button
            key={i}
            className="flex items-center gap-2 p-4 bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg hover:border-[var(--accent)] transition-colors text-sm text-[var(--color-text-primary)]"
          >
            <action.icon className="w-4 h-4" style={{ color: action.color }} />
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// === Posts View ===
function PostsView() {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = defaultPosts.filter((p) =>
    p.title.includes(search) || p.author.includes(search)
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
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

      {/* Table */}
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
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
            {filtered.map((post) => (
              <tr key={post.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--doppel-bg)] transition-colors">
                <td className="p-4 text-[var(--color-text-primary)] font-medium">{post.title}</td>
                <td className="p-4 text-[var(--color-text-secondary)] hidden sm:table-cell">{post.author}</td>
                <td className="p-4 text-[var(--color-text-secondary)] hidden md:table-cell">{post.category}</td>
                <td className="p-4 text-[var(--color-text-secondary)] hidden lg:table-cell">{post.views}</td>
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

      {/* Add modal */}
      <AnimatePresence>
        {showModal && (
          <Modal title="إضافة نص جديد" onClose={() => setShowModal(false)}>
            <PostForm />
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}

// === Authors View ===
function AuthorsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">إجمالي: {defaultAuthors.length} كاتب</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          كاتب جديد
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultAuthors.map((author) => (
          <div key={author.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] font-bold">
                {author.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-[var(--color-text-primary)] text-sm">{author.name}</p>
                <p className="text-xs text-[var(--color-text-tertiary)]">{author.country}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-tertiary)]">{author.posts} نص</span>
              <span className="px-2 py-0.5 rounded bg-[var(--success)]/10 text-[var(--success)]">{author.status}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// === Events View ===
function EventsView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">إجمالي: {defaultEvents.length} فعالية</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          فعالية جديدة
        </button>
      </div>
      <div className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] text-[var(--color-text-tertiary)]">
              <th className="text-right p-4 font-medium">العنوان</th>
              <th className="text-right p-4 font-medium hidden sm:table-cell">التاريخ</th>
              <th className="text-right p-4 font-medium hidden md:table-cell">المكان</th>
              <th className="text-right p-4 font-medium">الحالة</th>
            </tr>
          </thead>
          <tbody>
            {defaultEvents.map((event) => (
              <tr key={event.id} className="border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--doppel-bg)]">
                <td className="p-4 text-[var(--color-text-primary)] font-medium">{event.title}</td>
                <td className="p-4 text-[var(--color-text-secondary)] hidden sm:table-cell">{event.date}</td>
                <td className="p-4 text-[var(--color-text-secondary)] hidden md:table-cell">{event.location}</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    event.status === "قادمة"
                      ? "bg-[var(--success)]/10 text-[var(--success)]"
                      : "bg-[var(--color-text-tertiary)]/10 text-[var(--color-text-tertiary)]"
                  }`}>
                    {event.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// === Magazines View ===
function MagazinesView() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--color-text-secondary)]">إجمالي: {defaultMagazines.length} إصدار</p>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Plus className="w-4 h-4" />
          إصدار جديد
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {defaultMagazines.map((mag) => (
          <div key={mag.id} className="bg-[var(--color-card-bg)] border border-[var(--color-border)] rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-[var(--accent)] font-medium">العدد {mag.number}</span>
              <span className="px-2 py-0.5 rounded bg-[var(--success)]/10 text-[var(--success)] text-xs">{mag.status}</span>
            </div>
            <h3 className="font-amiri text-base font-bold text-[var(--color-text-primary)] mb-2">{mag.title}</h3>
            <p className="text-xs text-[var(--color-text-tertiary)]">{mag.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// === Settings View ===
function SettingsView() {
  const [settings, setSettings] = useState({
    siteName: "مؤسسة المنى الإبداعية",
    siteDescription: "منصة أدبية عربية تحتفي بالكلمة الجميلة والفكر المستنير",
    adminEmail: "info@almuna.org",
    adminPassword: "almuna2026",
    postsPerPage: "12",
    enableComments: true,
    enableRegistration: false,
  });

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
            <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">كلمة مرور الإدارة</label>
            <input
              type="text"
              value={settings.adminPassword}
              onChange={(e) => setSettings({ ...settings, adminPassword: e.target.value })}
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
          <div className="flex items-center justify-between py-2">
            <label className="text-sm text-[var(--color-text-primary)]">تفعيل التعليقات</label>
            <button
              onClick={() => setSettings({ ...settings, enableComments: !settings.enableComments })}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.enableComments ? "bg-[var(--accent)]" : "bg-[var(--color-border)]"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.enableComments ? "right-0.5" : "right-5"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <label className="text-sm text-[var(--color-text-primary)]">تفعيل التسجيل</label>
            <button
              onClick={() => setSettings({ ...settings, enableRegistration: !settings.enableRegistration })}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                settings.enableRegistration ? "bg-[var(--accent)]" : "bg-[var(--color-border)]"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  settings.enableRegistration ? "right-0.5" : "right-5"
                }`}
              />
            </button>
          </div>
        </div>
        <button className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Save className="w-4 h-4" />
          حفظ الإعدادات
        </button>
      </div>
    </div>
  );
}

// === Modal Component ===
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
function PostForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">عنوان النص *</label>
        <input
          type="text"
          placeholder="أدخل عنوان النص"
          className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">الكاتب *</label>
          <select className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]">
            {defaultAuthors.map((a) => (
              <option key={a.id}>{a.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">التصنيف *</label>
          <select className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)]">
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
          rows={2}
          placeholder="مقتطف قصير من النص..."
          className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-[var(--color-text-secondary)] mb-2">النص الكامل *</label>
        <textarea
          rows={8}
          placeholder="اكتب النص هنا..."
          className="w-full px-4 py-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-sm text-[var(--color-text-primary)] focus:outline-none focus:border-[var(--accent)] resize-none font-amiri text-base leading-relaxed"
        />
      </div>
      <div className="flex items-center gap-3 pt-2">
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-medium rounded-md hover:bg-[var(--accent-hover)] transition-colors">
          <Save className="w-4 h-4" />
          نشر النص
        </button>
        <button className="flex items-center gap-2 px-5 py-2.5 border border-[var(--color-border)] text-sm font-medium rounded-md hover:border-[var(--accent)] transition-colors text-[var(--color-text-primary)]">
          حفظ كمسودة
        </button>
      </div>
    </div>
  );
}
