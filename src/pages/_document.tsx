// Minimal _document to satisfy Next.js 15 build requirements
import { Html, Head, Main, NextScript } from "next/document";

function Document() {
  return (
    <Html lang="ar" dir="rtl">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default Document;
