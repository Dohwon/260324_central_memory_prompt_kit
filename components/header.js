import Link from "next/link";

import { GoogleSignInButton } from "@/components/google-signin-button";
import { getViewerFlags, isAuthConfigured } from "@/lib/auth";

export function Header({ session, stats }) {
  const viewer = getViewerFlags(session?.user?.email);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <div className="brand-lockup">
          <Link className="brand-chip" href="/">
            pv
          </Link>
          <div>
            <div className="brand-title">Prompt Vault Board</div>
            <div className="brand-subtitle">
              {stats.promptCount} prompts · {viewer.hasVaultAccess ? "vault unlocked" : "buyer gate on"}
            </div>
          </div>
        </div>

        <div className="header-actions">
          <Link className="ghost-link" href="/login">
            {session?.user?.email ? session.user.email : "구매자 로그인"}
          </Link>
          <GoogleSignInButton configured={isAuthConfigured()} />
        </div>
      </div>
    </header>
  );
}
