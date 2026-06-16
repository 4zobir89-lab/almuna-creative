"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

type SiteSettings = {
  site_name?: string;
  site_description?: string;
  contact_email?: string;
  facebook_url?: string;
  twitter_url?: string;
};

type Props = { settings: SiteSettings };

export function SettingsForm({ settings }: Props) {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    form.forEach((value, key) => { data[key] = value as string; });

    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardContent className="space-y-4 p-6">
          <div>
            <label className="mb-1 block text-sm font-medium">اسم الموقع</label>
            <Input name="site_name" defaultValue={settings.site_name || "مؤسسة المنى الإبداعية"} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">الوصف</label>
            <textarea name="site_description" defaultValue={settings.site_description || ""} rows={3}
              className="w-full rounded-md border border-brand-border bg-white p-3 text-sm" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">البريد الإلكتروني للتواصل</label>
            <Input name="contact_email" defaultValue={settings.contact_email || ""} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">رابط فيسبوك</label>
            <Input name="facebook_url" defaultValue={settings.facebook_url || ""} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">رابط تويتر</label>
            <Input name="twitter_url" defaultValue={settings.twitter_url || ""} />
          </div>
          <Button type="submit">حفظ الإعدادات</Button>
        </CardContent>
      </Card>
    </form>
  );
}
