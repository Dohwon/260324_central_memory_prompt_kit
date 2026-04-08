import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { GoogleSignInButton } from "@/components/google-signin-button";
import { authOptions, getViewerFlags, isAuthConfigured } from "@/lib/auth";
import { getPromptBySlug, getSalesUrl } from "@/lib/prompt-store";

export async function generateMetadata({ params }) {
  const awaited = await params;
  const prompt = getPromptBySlug(awaited.slug);

  if (!prompt) {
    return { title: "Prompt Not Found" };
  }

  return {
    title: `${prompt.title} | Prompt Vault Board`,
    description: prompt.description
  };
}

export default async function PromptDetailPage({ params }) {
  const awaited = await params;
  const prompt = getPromptBySlug(awaited.slug);
  const session = await getServerSession(authOptions);
  const viewer = getViewerFlags(session?.user?.email);
  const salesUrl = getSalesUrl();

  if (!prompt) {
    notFound();
  }

  return (
    <div className="detail-layout">
      <div className="container detail-grid">
        <section className="detail-card">
          <div className="detail-header">
            <div className="detail-meta-row">
              <span className="pill">{prompt.category}</span>
              <span className={viewer.hasVaultAccess ? "access-pill access-pill--open" : "access-pill access-pill--locked"}>
                {viewer.hasVaultAccess ? "Vault unlocked" : "Buyer only"}
              </span>
              {prompt.tags.map((tag) => (
                <span className="pill" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <div>
              <h1 className="detail-title">{prompt.title}</h1>
              <p className="muted">{prompt.description}</p>
            </div>
            <div className="detail-meta-row">
              <div className="price-stack">
                <span className="price-caption">Access Model</span>
                <strong className="detail-price">{prompt.priceLabel}</strong>
              </div>
              <div className="price-stack">
                <span className="price-caption">Ideal Buyer</span>
                <strong>{prompt.idealBuyer}</strong>
              </div>
            </div>
          </div>

          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {viewer.hasVaultAccess ? prompt.content : prompt.teaser}
            </ReactMarkdown>
          </div>
        </section>

        {viewer.hasVaultAccess ? (
          <aside className="vault-card">
            <p className="kicker">Vault Access</p>
            <h2 className="section-title">전체 본문 열람 가능</h2>
            <ul className="vault-list">
              <li>현재 계정은 구매자 또는 관리자 목록에 포함되어 있습니다.</li>
              <li>이 화면에서는 Markdown 원문 전체가 노출됩니다.</li>
              <li>판매형 상세 페이지를 유지하면서 본문 접근만 분리했습니다.</li>
            </ul>
            <div className="locked-card__actions">
              <Link className="primary-link" href="/">
                다른 프롬프트 보기
              </Link>
            </div>
          </aside>
        ) : session?.user?.email ? (
          <aside className="locked-card">
            <p className="kicker">Locked Detail</p>
            <h2 className="section-title">구매자 승인 전입니다</h2>
            <p className="muted">
              지금은 티저만 보이는 상태입니다. 구매 후 이 계정 이메일이 구매자 목록에
              등록되면 전체 본문이 열립니다.
            </p>
            <div className="locked-card__actions">
              <Link className="primary-link" href={salesUrl}>
                구매 문의하기
              </Link>
              <Link className="ghost-link" href="/login">
                계정 다시 확인
              </Link>
            </div>
          </aside>
        ) : (
          <aside className="locked-card">
            <p className="kicker">Buyer Gate</p>
            <h2 className="section-title">로그인 후 구매 여부를 확인합니다</h2>
            <p className="muted">
              게시판 구조는 공개하고, 본문은 구매자 전용으로 잠그는 흐름입니다. 먼저
              Google 로그인으로 계정을 확인하세요.
            </p>
            <div className="locked-card__actions">
              <GoogleSignInButton configured={isAuthConfigured()} />
              <Link className="ghost-link" href={salesUrl}>
                구매 문의
              </Link>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
