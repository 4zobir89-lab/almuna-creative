// Minimal _error page to prevent Next.js 15 prerender bug
// See: https://nextjs.org/docs/messages/no-document-import-in-page
import type { NextPageContext } from "next";

function ErrorPage({ statusCode }: { statusCode: number }) {
  return (
    <div style={{ padding: "2rem", textAlign: "center", fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {statusCode ? `خطأ ${statusCode}` : "خطأ في الخادم"}
      </h1>
      <p>عذراً، حدث خطأ غير متوقع.</p>
    </div>
  );
}

ErrorPage.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
