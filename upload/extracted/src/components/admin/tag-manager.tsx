"use client";

import { useState, useOptimistic, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/toast";

type TagRow = { id: string; name: string; slug: string; _count: { posts: number } };
type Props = { tags: TagRow[] };

export function TagManager({ tags: serverTags }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [newTag, setNewTag] = useState("");

  const [optimisticTags, addOptimisticTag] = useOptimistic(
    serverTags,
    (state, action: { type: "add"; tag: TagRow } | { type: "delete"; id: string }) => {
      if (action.type === "add") return [...state, action.tag];
      return state.filter((t) => t.id !== action.id);
    },
  );

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTag.trim()) return;
    const slug = newTag.trim().toLowerCase().replace(/\s+/g, "-");
    const tempId = `temp-${Date.now()}`;

    addOptimisticTag({ type: "add", tag: { id: tempId, name: newTag.trim(), slug, _count: { posts: 0 } } });
    setNewTag("");

    const res = await fetch("/api/tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newTag.trim(), slug }),
    });
    if (res.ok) {
      router.refresh();
    } else {
      toast.show("فشل إضافة الوسم", "error");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("حذف هذا الوسم؟")) return;
    addOptimisticTag({ type: "delete", id });
    const res = await fetch(`/api/tags?id=${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      toast.show("فشل حذف الوسم", "error");
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleCreate} className="flex gap-2">
        <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="وسم جديد" />
        <Button type="submit">إضافة</Button>
      </form>

      <div className="flex flex-wrap gap-2">
        {optimisticTags.map((tag) => (
          <div key={tag.id} className="flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/50 px-3 py-1">
            <span className="text-sm">{tag.name}</span>
            <span className="text-xs text-brand-secondary">({tag._count.posts})</span>
            <button onClick={() => handleDelete(tag.id)} className="text-red-500 hover:text-red-700 text-xs mr-1">
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
