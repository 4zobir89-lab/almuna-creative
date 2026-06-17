"use client";

import { useState, useEffect } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";

type Props = {
  postId: string;
  postTitle: string;
};

export function FavoriteButton({ postId, postTitle }: Props) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const favorites = JSON.parse(localStorage.getItem("almuna-favorites") || "[]");
      setIsFavorite(favorites.some((f: { id: string }) => f.id === postId));
    } catch {}
  }, [postId]);

  const toggleFavorite = () => {
    try {
      const favorites = JSON.parse(localStorage.getItem("almuna-favorites") || "[]");
      let newFavorites;
      if (isFavorite) {
        newFavorites = favorites.filter((f: { id: string }) => f.id !== postId);
      } else {
        newFavorites = [...favorites, { id: postId, title: postTitle, addedAt: new Date().toISOString() }];
      }
      localStorage.setItem("almuna-favorites", JSON.stringify(newFavorites));
      setIsFavorite(!isFavorite);
      window.dispatchEvent(new CustomEvent("favorites-changed"));
    } catch {}
  };

  if (!mounted) {
    return (
      <button className="flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-secondary)]" aria-label="حفظ">
        <Bookmark className="w-4 h-4" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleFavorite}
      className={`flex h-9 w-9 items-center justify-center rounded-md transition-colors ${
        isFavorite
          ? "text-[var(--accent)] bg-[var(--doppel-bg)]"
          : "text-[var(--color-text-secondary)] hover:bg-[var(--doppel-bg)] hover:text-[var(--accent)]"
      }`}
      aria-label={isFavorite ? "إزالة من المفضلة" : "حفظ في المفضلة"}
    >
      {isFavorite ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
    </button>
  );
}
