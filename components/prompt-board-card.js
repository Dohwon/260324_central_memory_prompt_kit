import Link from "next/link";

export function PromptBoardCard({ prompt, hasVaultAccess }) {
  return (
    <article className="board-card">
      <div className="board-card__top">
        <span className="pill">{prompt.category}</span>
        <span className={hasVaultAccess ? "access-pill access-pill--open" : "access-pill access-pill--locked"}>
          {hasVaultAccess ? "Full access" : "Preview only"}
        </span>
      </div>

      <div>
        <h3 className="board-card__title">{prompt.title}</h3>
        <p className="board-card__copy">{prompt.description}</p>
      </div>

      <div className="detail-meta-row">
        {prompt.tags.map((tag) => (
          <span className="pill" key={tag}>
            {tag}
          </span>
        ))}
      </div>

      <div className="board-card__footer">
        <div className="price-stack">
          <strong>{prompt.priceLabel}</strong>
          <span className="price-caption">{prompt.idealBuyer}</span>
        </div>
        <Link className="card-link" href={`/prompt/${prompt.slug}`}>
          상세 보기
        </Link>
      </div>
    </article>
  );
}
