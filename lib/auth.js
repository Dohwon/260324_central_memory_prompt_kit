import GoogleProvider from "next-auth/providers/google";

function parseEmailList(value) {
  return (value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

export function isAuthConfigured() {
  return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}

export function getViewerFlags(email) {
  const normalized = (email || "").trim().toLowerCase();
  const adminEmails = new Set(parseEmailList(process.env.ADMIN_EMAILS));
  const purchaserEmails = new Set(parseEmailList(process.env.PURCHASER_EMAILS));
  const isAdmin = normalized ? adminEmails.has(normalized) : false;
  const isPurchaser = normalized ? purchaserEmails.has(normalized) : false;

  return {
    isAdmin,
    isPurchaser,
    hasVaultAccess: isAdmin || isPurchaser
  };
}

const providers = [];

if (isAuthConfigured()) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

export const authOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET || "dev-only-secret-change-me",
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        const viewer = getViewerFlags(token.email);
        session.user.email = token.email;
        session.user.hasVaultAccess = viewer.hasVaultAccess;
        session.user.isAdmin = viewer.isAdmin;
      }
      return session;
    },
    async jwt({ token }) {
      if (token?.email) {
        const viewer = getViewerFlags(token.email);
        token.hasVaultAccess = viewer.hasVaultAccess;
        token.isAdmin = viewer.isAdmin;
      }
      return token;
    }
  }
};
