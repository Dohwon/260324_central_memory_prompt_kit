import { getServerSession } from "next-auth";

import { PromptBoardCard } from "@/components/prompt-board-card";
import { authOptions, getViewerFlags } from "@/lib/auth";
import { getPromptCatalog } from "@/lib/prompt-store";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const viewer = getViewerFlags(session?.user?.email);
  const prompts = getPromptCatalog();

  return (
    <section className="board-page">
      <div className="container">
        <h1 className="board-page__title">Prompt Vault Board</h1>

        <div className="board-list" id="prompt-board">
          <div className="board-list__head">
            <span>Title</span>
            <span>Description</span>
            <span>Category</span>
            <span>Status</span>
          </div>

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
  );
}
