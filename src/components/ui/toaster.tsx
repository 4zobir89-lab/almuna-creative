"use client"

import { useToast } from "@/hooks/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  if (toasts.length === 0) return null

  return (
    <>
      {toasts.map(function ({ id, title, description }) {
        return (
          <div
            key={id}
            className="fixed bottom-4 right-4 z-[100] max-w-sm rounded-lg border border-[var(--color-border)] bg-[var(--color-card-bg)] p-4 shadow-lg"
          >
            {title && (
              <div className="font-amiri font-bold text-[var(--color-text-primary)]">
                {title}
              </div>
            )}
            {description && (
              <div className="mt-1 text-sm text-[var(--color-text-secondary)]">
                {description}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}
