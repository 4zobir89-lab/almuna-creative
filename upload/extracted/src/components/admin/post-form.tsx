"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { createPost, updatePost } from "@/lib/actions/posts";
import { postSchema, type PostInput } from "@/lib/schemas/posts";
import { zodResolver } from "@/lib/zod-resolver";
import { useToast } from "@/components/ui/toast";
import type { Category, Tag } from "@prisma/client";

type Props = {
  post?: PostInput & { id: string };
  categories: Category[];
  tags: Tag[];
};

export function PostForm({ post, categories, tags }: Props) {
  const router = useRouter();
  const toast = useToast();
  const [selectedTags, setSelectedTags] = useState<string[]>(post?.tags || []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PostInput>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: post?.title || "",
      body: post?.body || "",
      excerpt: post?.excerpt || "",
      categoryId: post?.categoryId || "",
      status: (post?.status as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT",
      country: post?.country || "",
      scheduledAt: post?.scheduledAt || "",
      tags: post?.tags || [],
    },
  });

  async function onSubmit(data: PostInput) {
    try {
      data.tags = selectedTags;
      if (post?.id) {
        await updatePost(post.id, data);
        toast.show("تم تحديث النص بنجاح", "success");
      } else {
        await createPost(data);
        toast.show("تم نشر النص بنجاح", "success");
      }
      router.push("/admin/posts");
      router.refresh();
    } catch {
      toast.show("حدث خطأ أثناء حفظ النص", "error");
    }
  }

  function toggleTag(tagId: string) {
    setSelectedTags((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  }

  const inputClass = "flex h-10 w-full rounded-md border border-brand-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent";
  const errorClass = "text-xs text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">العنوان</label>
            <Input {...register("title")} placeholder="عنوان النص" />
            {errors.title && <p className={errorClass}>{errors.title.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">المحتوى</label>
            <textarea
              {...register("body")}
              rows={15}
              className="w-full rounded-md border border-brand-border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="اكتب النص هنا…"
            />
            {errors.body && <p className={errorClass}>{errors.body.message}</p>}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">المقدمة (اختياري)</label>
            <textarea
              {...register("excerpt")}
              rows={3}
              className="w-full rounded-md border border-brand-border bg-white p-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
              placeholder="نص قصير يلخص المحتوى"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium">القسم</label>
              <select {...register("categoryId")} className={inputClass}>
                <option value="">بدون قسم</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">الحالة</label>
              <select {...register("status")} className={inputClass}>
                <option value="DRAFT">مسودة</option>
                <option value="PUBLISHED">منشور</option>
                <option value="ARCHIVED">مؤرشف</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium">الدولة</label>
              <Input {...register("country")} placeholder="مصر، السعودية، …" />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">الوسوم</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => toggleTag(tag.id)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    selectedTags.includes(tag.id)
                      ? "bg-brand-accent text-white"
                      : "bg-brand-hover text-brand-primary hover:bg-brand-border"
                  }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">تاريخ الجدولة (اختياري)</label>
              <Input {...register("scheduledAt")} type="datetime-local" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "جاري الحفظ…" : post?.id ? "تحديث" : "نشر"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          إلغاء
        </Button>
      </div>
    </form>
  );
}
