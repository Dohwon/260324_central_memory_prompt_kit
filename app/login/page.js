import Link from "next/link";
import { getServerSession } from "next-auth";

import { GoogleSignInButton } from "@/components/google-signin-button";
import { authOptions, getViewerFlags, isAuthConfigured } from "@/lib/auth";

export const metadata = {
  title: "로그인 | Prompt Vault Board"
};

export default async function LoginPage() {
  const session = await getServerSession(authOptions);
  const viewer = getViewerFlags(session?.user?.email);

  return (
    <div className="detail-layout">
      <div className="container detail-grid detail-grid--single">
        <section className="auth-card">
          <h1 className="detail-title">Google 로그인</h1>

          <div className="auth-summary">
            <span className="dot" />
            {session?.user?.email ? (
              <span>
                {session.user.email} / {viewer.hasVaultAccess ? "open" : "locked"}
              </span>
            ) : (
              <span>로그인되지 않았습니다.</span>
            )}
          </div>

          <div className="auth-card__actions">
            <GoogleSignInButton configured={isAuthConfigured()} />
            <Link className="ghost-link" href="/">
              게시판으로 돌아가기
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
