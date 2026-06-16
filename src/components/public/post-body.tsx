"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

type Props = { content: string };

export function PostBody({ content }: Props) {
  const [sanitized, setSanitized] = useState<string>("");

  useEffect(() => {
    const clean = DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "p", "br", "b", "i", "em", "strong", "u", "s", "del", "ins",
        "h1", "h2", "h3", "h4", "h5", "h6",
        "ul", "ol", "li",
        "blockquote", "pre", "code",
        "a", "img",
        "table", "thead", "tbody", "tr", "th", "td",
        "hr", "div", "span",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "dir", "lang", "target", "rel"],
      ALLOW_DATA_ATTR: false,
      ADD_ATTR: ["target"],
      FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "textarea", "select", "button"],
      FORBID_ATTR: ["style", "onerror", "onload", "onclick", "onmouseover"],
    });
    setSanitized(clean);
  }, [content]);

  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert text-[var(--color-text-primary)] leading-loose
        prose-headings:font-amiri prose-headings:text-[var(--color-text-primary)]
        prose-a:text-brand-gold prose-a:no-underline hover:prose-a:underline
        prose-strong:text-[var(--color-text-primary)]
        prose-blockquote:border-r-2 prose-blockquote:border-brand-gold/30 prose-blockquote:text-[var(--color-text-secondary)] prose-blockquote:pr-4
        prose-code:bg-[var(--doppel-bg)] prose-code:px-2 prose-code:py-0.5 prose-code:rounded
        prose-img:rounded-lg"
      dir="auto"
      dangerouslySetInnerHTML={{ __html: sanitized || content }}
    />
  );
}
