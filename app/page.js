import { getServerSession } from "next-auth";

import { PromptBoardCard } from "@/components/prompt-board-card";
import { authOptions, getViewerFlags } from "@/lib/auth";
import { getPromptCatalog, getPromptCategories } from "@/lib/prompt-store";

export default async function HomePage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const viewer = getViewerFlags(session?.user?.email);
  const resolvedSearchParams = await searchParams;
  const filters = {
    category: resolvedSearchParams?.category || "",
    title: resolvedSearchParams?.title || "",
    content: resolvedSearchParams?.content || ""
  };
  const prompts = getPromptCatalog(filters);
  const categories = getPromptCategories();
  const promptOriginals = prompts.filter((item) => item.entryType === "prompt");
  const referenceDocs = prompts.filter((item) => item.entryType !== "prompt");

  function renderBoardSection(title, items) {
    if (!items.length) {
      return null;
    }

    return (
      <section className="board-section">
        <h2 className="board-section__title">{title}</h2>
        <div className="board-list">
          <div className="board-list__head">
            <span>Title</span>
            <span>Description</span>
            <span>Category</span>
            <span>Status</span>
          </div>

          {items.map((prompt) => (
            <PromptBoardCard
              key={prompt.slug}
              prompt={prompt}
              hasVaultAccess={viewer.hasVaultAccess}
            />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="board-page">
      <div className="container">
        <h1 className="board-page__title">Prompt Vault Board</h1>

        <form className="board-filters" method="get">
          <select className="board-filter__control" defaultValue={filters.category} name="category">
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            className="board-filter__control"
            defaultValue={filters.title}
            name="title"
            placeholder="제목 검색"
            type="search"
          />

          <input
            className="board-filter__control"
            defaultValue={filters.content}
            name="content"
            placeholder="본문 + 설명 검색"
            type="search"
          />

          <button className="primary-link" type="submit">
            검색
          </button>
        </form>

        {prompts.length ? (
          <>
            {renderBoardSection("원문 프롬프트", promptOriginals)}
            {renderBoardSection("규칙 / 운영 문서", referenceDocs)}
          </>
        ) : (
          <div className="board-list" id="prompt-board">
            <div className="board-empty">검색 결과가 없습니다.</div>
          </div>
        )}
      </div>
    </section>
  );
}
