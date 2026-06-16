"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createCategory, deleteCategory, updateCategory } from "@/lib/actions/categories";
import type { Category } from "@prisma/client";

type CategoryWithRelations = Category & { _count: { posts: number }; children: (Category & { _count: { posts: number } })[] };

type Props = { categories: CategoryWithRelations[] };

export function CategoryManager({ categories }: Props) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editParentId, setEditParentId] = useState("");

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await createCategory({ name, description, parentId: parentId || undefined });
    setName("");
    setDescription("");
    setParentId("");
    router.refresh();
  }

  async function handleUpdate(id: string) {
    if (!editName.trim()) return;
    await updateCategory(id, { name: editName, description: editDescription, parentId: editParentId || undefined });
    setEditing(null);
    router.refresh();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل أنت متأكد من حذف هذا القسم؟")) return;
    await deleteCategory(id);
    router.refresh();
  }

  function startEdit(cat: CategoryWithRelations) {
    setEditing(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description || "");
    setEditParentId(cat.parentId || "");
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleCreate} className="space-y-4 rounded-lg border border-brand-border p-4">
        <h2 className="text-xl font-amiri font-bold">قسم جديد</h2>
        <Input placeholder="اسم القسم" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input placeholder="الوصف (اختياري)" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
          className="flex h-10 w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm"
        >
          <option value="">قسم رئيسي</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
        <Button type="submit">إضافة</Button>
      </form>

      <div className="space-y-2">
        <h2 className="text-xl font-amiri font-bold">الأقسام الحالية</h2>
        {categories.map((cat) => (
          <div key={cat.id} className="rounded-lg border border-brand-border p-3">
            {editing === cat.id ? (
              <div className="space-y-3">
                <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="اسم القسم" />
                <Input value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder="الوصف" />
                <select
                  value={editParentId}
                  onChange={(e) => setEditParentId(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm"
                >
                  <option value="">قسم رئيسي</option>
                  {categories.filter((c) => c.id !== cat.id).map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => handleUpdate(cat.id)}>حفظ</Button>
                  <Button variant="outline" size="sm" onClick={() => setEditing(null)}>إلغاء</Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{cat.name}</span>
                    <span className="mr-2 text-xs text-brand-secondary">({cat._count.posts} نصوص)</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => startEdit(cat)}>
                      تعديل
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(cat.id)} className="text-red-600">
                      حذف
                    </Button>
                  </div>
                </div>
                {cat.children.length > 0 && (
                  <div className="mr-4 mt-2 space-y-1">
                    {cat.children.map((child) => (
                      <div key={child.id} className="flex items-center justify-between text-sm">
                        <span>{child.name} <span className="text-xs text-brand-secondary">({child._count.posts})</span></span>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(child.id)} className="text-red-600 text-xs">
                          حذف
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
