import Link from "next/link";

import { GoogleSignInButton } from "@/components/google-signin-button";
import { isAuthConfigured } from "@/lib/auth";

export function Header({ session }) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link className="brand-title" href="/">
          Prompt Vault Board
        </Link>

        <div className="header-actions">
          {session?.user?.email ? <span className="session-email">{session.user.email}</span> : null}
          <GoogleSignInButton configured={isAuthConfigured()} />
        </div>
      </div>
    </header>
  );
}
