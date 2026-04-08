"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export function GoogleSignInButton({ configured = true }) {
  const { data: session, status } = useSession();

  if (!configured) {
    return (
      <button className="auth-pill" disabled type="button">
        Google OAuth env 필요
      </button>
    );
  }

  if (status === "authenticated") {
    return (
      <button
        className="auth-pill"
        onClick={() => signOut({ callbackUrl: "/" })}
        type="button"
      >
        로그아웃
      </button>
    );
  }

  return (
    <button className="auth-pill" onClick={() => signIn("google")} type="button">
      Google로 로그인
    </button>
  );
}
