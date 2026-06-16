"use client";

import { useEffect } from "react";

type Props = { postId: string };

export function ViewCounter({ postId }: Props) {
  useEffect(() => {
    fetch(`/api/views/${postId}`, { method: "POST" }).catch(() => {});
  }, [postId]);

  return null;
}
