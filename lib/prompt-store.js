import fs from "fs";
import path from "path";

const PROMPT_CATALOG = [
  {
    slug: "owner-profile-blueprint",
    file: "01_owner_profile_prompt.md",
    title: "Owner Profile Blueprint",
    description:
      "오너의 판단 기준, 커뮤니케이션 성향, 업무 선호를 문서화하는 핵심 프롬프트.",
    category: "Identity",
    tags: ["owner", "persona", "operations"],
    priceLabel: "Vault access",
    idealBuyer: "1인 창업자 · PM · AI operator"
  },
  {
    slug: "skill-profile-blueprint",
    file: "02_skill_profile_prompt.md",
    title: "Skill Profile Blueprint",
    description:
      "실행용 프롬프트를 공유용 역할 설명서로 바꾸는 스킬 카탈로그 프롬프트.",
    category: "Skill Ops",
    tags: ["skill", "catalog", "handoff"],
    priceLabel: "Vault access",
    idealBuyer: "멀티 에이전트 운영자"
  },
  {
    slug: "company-operating-model",
    file: "03_company_operating_model_prompt.md",
    title: "Company Operating Model",
    description:
      "협업 규칙, handoff packet, 품질 게이트, 재작업 루프를 만드는 회사 운영 프롬프트.",
    category: "Operations",
    tags: ["company", "handoff", "quality-gate"],
    priceLabel: "Vault access",
    idealBuyer: "AI 팀 리드 · 에이전트 설계자"
  },
  {
    slug: "memory-workspace-setup",
    file: "04_memory_workspace_prompt.md",
    title: "Memory Workspace Setup",
    description:
      "스킬, 메모리, 템플릿, 운영 문서를 한 번에 다루는 작업 공간을 생성하는 프롬프트.",
    category: "Workspace",
    tags: ["memory", "workspace", "templates"],
    priceLabel: "Vault access",
    idealBuyer: "지식 관리 중심 팀"
  },
  {
    slug: "project-operating-rules",
    file: "05_project_operating_rules_prompt.md",
    title: "Project Operating Rules",
    description:
      "프로젝트 단위의 AGENTS 문서와 short/mid/long/log 규칙을 만드는 운영 프롬프트.",
    category: "Project System",
    tags: ["project", "agents", "governance"],
    priceLabel: "Vault access",
    idealBuyer: "반복 가능한 프로젝트 운영이 필요한 팀"
  },
  {
    slug: "worklog-archive-system",
    file: "06_worklog_archive_prompt.md",
    title: "Worklog Archive System",
    description:
      "작업 로그, 메모리 업데이트, 장기 아카이브 누락을 줄이는 기록용 프롬프트.",
    category: "Archive",
    tags: ["worklog", "archive", "memory"],
    priceLabel: "Vault access",
    idealBuyer: "인수인계 손실을 줄이고 싶은 운영자"
  }
];

const PROMPT_BASE_DIR = path.join(process.cwd(), "prompts");

function readMarkdown(relativeFilePath) {
  const absolutePath = path.join(PROMPT_BASE_DIR, relativeFilePath);
  return fs.readFileSync(absolutePath, "utf8");
}

function createTeaser(markdown) {
  const splitMarker = "## 복붙용 프롬프트";
  if (markdown.includes(splitMarker)) {
    return `${markdown.split(splitMarker)[0].trim()}\n\n## 전체 본문\n\n구매자 로그인 후 전체 프롬프트를 확인할 수 있습니다.`;
  }

  return `${markdown.slice(0, 500).trim()}\n\n구매자 로그인 후 전체 본문을 확인할 수 있습니다.`;
}

export function getPromptCatalog() {
  return PROMPT_CATALOG.map((prompt) => ({
    ...prompt
  }));
}

export function getPromptBySlug(slug) {
  const prompt = PROMPT_CATALOG.find((entry) => entry.slug === slug);

  if (!prompt) {
    return null;
  }

  const content = readMarkdown(prompt.file);

  return {
    ...prompt,
    content,
    teaser: createTeaser(content)
  };
}

export function getVaultStats() {
  const categories = new Set(PROMPT_CATALOG.map((item) => item.category));
  return {
    promptCount: PROMPT_CATALOG.length,
    categoryCount: categories.size
  };
}

export function getSalesUrl() {
  return (
    process.env.NEXT_PUBLIC_PURCHASE_URL ||
    `mailto:${process.env.SALES_CONTACT_EMAIL || "owner@example.com"}?subject=Prompt%20Vault%20Purchase`
  );
}
