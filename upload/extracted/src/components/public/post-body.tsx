"use client";

import DOMPurify from "dompurify";

type Props = { content: string };

export function PostBody({ content }: Props) {
  const sanitized = DOMPurify.sanitize(content, {
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
    ALLOWED_URI_REGEXP: /^(?:(?:https?|ftp|mailto):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:-]|$))/i,
    ALLOW_DATA_ATTR: false,
    ADD_ATTR: ["target"],
    FORBID_TAGS: ["style", "script", "iframe", "object", "embed", "form", "input", "textarea", "select", "button"],
    FORBID_ATTR: ["style", "onerror", "onload", "onclick", "onmouseover"],
  });

  return (
    <div
      className="prose prose-lg max-w-none dark:prose-invert"
      dir="auto"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
