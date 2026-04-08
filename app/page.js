import Link from "next/link";
import { getServerSession } from "next-auth";

import { PromptBoardCard } from "@/components/prompt-board-card";
import { authOptions, getViewerFlags, isAuthConfigured } from "@/lib/auth";
import { getPromptCatalog, getVaultStats } from "@/lib/prompt-store";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const viewer = getViewerFlags(session?.user?.email);
  const prompts = getPromptCatalog();
  const stats = getVaultStats();

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-card">
            <span className="eyebrow">Prompt Vault Board</span>
            <h1 className="hero-title">
              프롬프트 저장소와
              <br />
              판매 전략을
              <br />
              한 화면에.
            </h1>
            <p className="hero-copy">
              문서형 프롬프트를 상품처럼 진열하고, 상세 본문은 로그인한 구매자에게만
              열어주는 보드입니다. 지금 단계에서는 Google OAuth와 구매자 이메일
              화이트리스트로 접근을 제어합니다.
            </p>
            <div className="hero-actions">
              <Link className="primary-link" href="#prompt-board">
                프롬프트 보드 보기
              </Link>
              <Link className="ghost-link" href="/login">
                구매자 로그인
              </Link>
            </div>
            <div className="hero-notes">
              <div className="hero-note">
                <strong>문서형 상품</strong>
                <span>Markdown 기반 프롬프트를 상품 카드처럼 진열합니다.</span>
              </div>
              <div className="hero-note">
                <strong>구매자 전용 상세</strong>
                <span>클릭 전엔 설명만, 승인된 계정만 전체 본문을 봅니다.</span>
              </div>
              <div className="hero-note">
                <strong>Google OAuth</strong>
                <span>구글 로그인으로 진입 장벽을 낮추고 구매자 확인을 단순화합니다.</span>
              </div>
              <div className="hero-note">
                <strong>Railway Ready</strong>
                <span>Next.js standalone 출력으로 바로 배포 가능한 구조입니다.</span>
              </div>
            </div>
          </div>

          <aside className="stats-card">
            <span className="eyebrow">Vault Snapshot</span>
            <div className="stat-grid">
              <div className="stat-panel">
                <strong className="stat-number">{stats.promptCount}</strong>
                <span className="stat-label">현재 등록된 프롬프트</span>
              </div>
              <div className="stat-panel">
                <strong className="stat-number">{stats.categoryCount}</strong>
                <span className="stat-label">카테고리</span>
              </div>
              <div className="stat-panel">
                <strong className="stat-number">
                  {viewer.hasVaultAccess ? "Unlocked" : "Locked"}
                </strong>
                <span className="stat-label">현재 내 접근 상태</span>
              </div>
              <div className="stat-panel">
                <strong className="stat-number">
                  {isAuthConfigured() ? "Google On" : "Setup Needed"}
                </strong>
                <span className="stat-label">로그인 설정 상태</span>
              </div>
            </div>
            <p className="muted">
              판매 전략이 눈에 띄는 구조를 위해 카드 리스트는 공개하고, 상세 본문은
              구매자만 확인하도록 분리했습니다.
            </p>
          </aside>
        </div>
      </section>

      <section className="section-block" id="prompt-board">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="kicker">Board</p>
              <h2 className="section-title">Prompt Shelf</h2>
            </div>
            <p className="section-copy">
              제목과 설명은 공개 게시판처럼 보여주고, 상세 페이지에서 구매 여부와
              로그인 상태에 따라 접근을 분기합니다.
            </p>
          </div>

          <div className="board-grid">
            {prompts.map((prompt) => (
              <PromptBoardCard
                key={prompt.slug}
                prompt={prompt}
                hasVaultAccess={viewer.hasVaultAccess}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="footer-copy container">
        구매자 관리 방식은 현재 `PURCHASER_EMAILS` 기반입니다. 실제 결제 연동은 다음
        단계에서 Stripe 또는 Lemon Squeezy로 붙이면 됩니다.
      </footer>
    </>
  );
}
