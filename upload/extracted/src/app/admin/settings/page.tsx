import { prisma } from "@/lib/db";
import { SettingsForm } from "@/components/admin/settings-form";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-3xl font-amiri font-bold">الإعدادات</h1>
      <SettingsForm settings={settingsMap} />
    </div>
  );
}
