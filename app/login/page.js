import Link from "next/link";
import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/components/google-signin-button";
import { authOptions, getViewerFlags, isAuthConfigured } from "@/lib/auth";
import { getSalesUrl } from "@/lib/prompt-store";

export const metadata = {
  title: "로그인 | Prompt Vault Board"
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const viewer = getViewerFlags(session?.user?.email);
  const salesUrl = getSalesUrl();

  return (
    <div className="detail-layout">
      <div className="container detail-grid">
        <section className="auth-card">
          <p className="kicker">Google Access</p>
          <h1 className="detail-title">구매자 로그인</h1>
          <p className="muted">
            구글 계정으로 로그인한 뒤, 구매 완료 계정이면 전체 프롬프트 본문이 열립니다.
            아직 구매 전이면 상세 설명과 구매 링크만 보입니다.
          </p>

          <div className="auth-summary">
            <span className="dot" />
            {session?.user?.email ? (
              <span>
                현재 로그인: {session.user.email} / 접근 상태:{" "}
                {viewer.hasVaultAccess ? "vault unlocked" : "locked"}
              </span>
            ) : (
              <span>현재 로그인되지 않았습니다.</span>
            )}
          </div>

          <div className="auth-card__actions">
            <GoogleSignInButton configured={isAuthConfigured()} />
            <Link className="ghost-link" href={salesUrl}>
              구매 문의
            </Link>
            <Link className="ghost-link" href="/">
              게시판으로 돌아가기
            </Link>
          </div>
        </section>

        <aside className="vault-card">
          <p className="kicker">How Access Works</p>
          <h2 className="section-title">현재 접근 제어 방식</h2>
          <ul className="vault-list">
            <li>게시판 카드와 간단 설명은 누구나 볼 수 있습니다.</li>
            <li>Google OAuth 로그인 후 이메일 기준으로 구매자 여부를 판정합니다.</li>
            <li>구매자 이메일은 Railway 환경변수에서 관리합니다.</li>
            <li>나중에 실제 결제 시스템으로 바꾸더라도 상세 잠금 구조는 유지됩니다.</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
