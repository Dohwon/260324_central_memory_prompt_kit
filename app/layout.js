import { getServerSession } from "next-auth";

import "@/app/globals.css";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { authOptions } from "@/lib/auth";
import { getVaultStats } from "@/lib/prompt-store";

export const metadata = {
  title: "Prompt Vault Board",
  description:
    "프롬프트 저장소 겸 거래소. 구매자만 전체 프롬프트 본문을 열람할 수 있는 Markdown 기반 보드."
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  const stats = getVaultStats();

  return (
    <html lang="ko">
      <body>
        <Providers session={session}>
          <div className="page-shell">
            <Header session={session} stats={stats} />
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
