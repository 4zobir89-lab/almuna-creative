"use client";

import { useState } from "react";
import { Share2, Link2, Check } from "lucide-react";

type Props = {
  title: string;
  slug: string;
};

export function ShareButtons({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);

  const url = typeof window !== "undefined" ? `${window.location.origin}/posts/${slug}` : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = [
    {
      name: "واتساب",
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: "hover:text-[#25D366]",
    },
    {
      name: "تويتر",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: "hover:text-[#1DA1F2]",
    },
    {
      name: "فيسبوك",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: "hover:text-[#1877F2]",
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="flex items-center gap-1">
      {shareLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.name}
          className={`flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] ${link.color} transition-colors text-xs`}
        >
          {link.name.charAt(0)}
        </a>
      ))}
      <button
        onClick={copyLink}
        aria-label="نسخ الرابط"
        className={`flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] hover:text-[var(--accent)] transition-colors ${
          copied ? "text-[var(--success)]" : ""
        }`}
      >
        {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
      </button>
    </div>
  );
}
