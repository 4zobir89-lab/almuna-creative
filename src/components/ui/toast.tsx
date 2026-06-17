"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { useState, useCallback, createContext, useContext } from "react";

type ToastType = "success" | "error" | "info";

type ToastItem = {
  id: string;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  show: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType>({ show: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const show = useCallback((message: string, type: ToastType = "info") => {
    const id = Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const remove = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const colorMap: Record<ToastType, string> = {
    success: "border-green-500/40 bg-green-500/10",
    error: "border-red-500/40 bg-red-500/10",
    info: "border-orange-500/40 bg-orange-500/10",
  };

  return (
    <ToastContext.Provider value={{ show }}>
      <ToastPrimitive.Provider swipeDirection="right">
        {children}
        <ToastPrimitive.Viewport className="fixed bottom-6 left-1/2 z-[100] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2" />
        {toasts.map((toast) => (
          <ToastPrimitive.Root
            key={toast.id}
            open
            onOpenChange={() => remove(toast.id)}
            className={`rounded-xl border px-5 py-3 text-sm font-medium backdrop-blur-xl shadow-2xl ${colorMap[toast.type]} text-white data-[state=open]:animate-slide-up data-[state=closed]:animate-fade-in`}
          >
            <ToastPrimitive.Description>{toast.message}</ToastPrimitive.Description>
          </ToastPrimitive.Root>
        ))}
      </ToastPrimitive.Provider>
    </ToastContext.Provider>
  );
}
