"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignInPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const result = await signIn("credentials", {
      email: form.get("email") as string,
      password: form.get("password") as string,
      redirect: false,
    });

    if (result?.error) {
      setError("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } else {
      router.push("/admin");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-bg p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
          <p className="text-sm text-brand-secondary">لوحة تحكم مؤسسة المنى الإبداعية</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium">البريد الإلكتروني</label>
              <Input name="email" type="email" required placeholder="admin@example.com" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">كلمة المرور</label>
              <Input name="password" type="password" required placeholder="••••••••" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full">دخول</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
