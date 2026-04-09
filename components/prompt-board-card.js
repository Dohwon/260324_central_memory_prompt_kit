import Link from "next/link";

export function PromptBoardCard({ prompt, hasVaultAccess }) {
  return (
    <Link className="board-row" href={`/prompt/${prompt.slug}`}>
      <strong className="board-row__title">{prompt.title}</strong>
      <span className="board-row__description">{prompt.description}</span>
      <span className="board-row__category">{prompt.category}</span>
      <span className={hasVaultAccess ? "board-row__status board-row__status--open" : "board-row__status"}>
        {hasVaultAccess ? "Open" : "Locked"}
      </span>
    </Link>
  );
}
