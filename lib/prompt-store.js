import fs from "fs";
import path from "path";

const PROMPT_CATALOG = [
  {
    slug: "prompt-vault-overview",
    sourcePath: "prompts/README.md",
    title: "Prompt Vault Overview",
    description:
      "프롬프트 번들 구조, 사용 목적, 적용 순서를 한 번에 설명하는 개요 문서.",
    category: "Guide",
    tags: ["overview", "bundle", "guide"],
    priceLabel: "Vault access",
    idealBuyer: "템플릿 묶음을 한 번에 이해하려는 운영자"
  },
  {
    slug: "owner-profile-blueprint",
    sourcePath: "prompts/01_owner_profile_prompt.md",
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
    sourcePath: "prompts/02_skill_profile_prompt.md",
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
    sourcePath: "prompts/03_company_operating_model_prompt.md",
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
    sourcePath: "prompts/04_memory_workspace_prompt.md",
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
    sourcePath: "prompts/05_project_operating_rules_prompt.md",
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
    sourcePath: "prompts/06_worklog_archive_prompt.md",
    title: "Worklog Archive System",
    description:
      "작업 로그, 메모리 업데이트, 장기 아카이브 누락을 줄이는 기록용 프롬프트.",
    category: "Archive",
    tags: ["worklog", "archive", "memory"],
    priceLabel: "Vault access",
    idealBuyer: "인수인계 손실을 줄이고 싶은 운영자"
  },
  {
    slug: "project-agents-template",
    sourcePath: "AGENTS.md",
    title: "Project AGENTS Template",
    description:
      "프로젝트 루트에 두는 운영 규칙 템플릿. 작업 방식과 기록 원칙을 고정합니다.",
    category: "Template",
    tags: ["agents", "project", "rules"],
    priceLabel: "Vault access",
    idealBuyer: "프로젝트 기본 규칙을 템플릿화하려는 팀"
  },
  {
    slug: "skill-docs-guide",
    sourcePath: "skill_docs/README.md",
    title: "Skill Docs Guide",
    description:
      "스킬 설명서를 어떤 구조와 항목으로 문서화할지 정의하는 기준 문서.",
    category: "Skill Docs",
    tags: ["skill", "docs", "guide"],
    priceLabel: "Vault access",
    idealBuyer: "스킬 설명서 모음을 상품화하려는 운영자"
  },
  {
    slug: "startup-business-strategist-sample",
    sourcePath: "skill_docs/startup-business-strategist-ko.md",
    title: "Startup Business Strategist Sample",
    description:
      "사업전략형 스킬 문서 예시. 역할, 강점, 입력조건을 어떻게 노출할지 보여줍니다.",
    category: "Skill Docs",
    tags: ["skill", "strategy", "sample"],
    priceLabel: "Vault access",
    idealBuyer: "대표 스킬 샘플이 필요한 판매자"
  },
  {
    slug: "manager-memory-overview",
    sourcePath: "manager_memory/README.md",
    title: "Manager Memory Overview",
    description:
      "short/mid/long/log 구조를 어떤 식으로 운영하는지 설명하는 메모리 개요 문서.",
    category: "Memory Ops",
    tags: ["memory", "manager", "overview"],
    priceLabel: "Vault access",
    idealBuyer: "중앙 메모리 구조를 설계하는 운영자"
  },
  {
    slug: "short-term-active-tasks-template",
    sourcePath: "manager_memory/short-term/active-tasks.md",
    title: "Short-Term Active Tasks Template",
    description:
      "단기 실행 항목을 관리하는 템플릿. 당장 움직이는 작업을 고정하는 문서입니다.",
    category: "Memory Ops",
    tags: ["short-term", "tasks", "template"],
    priceLabel: "Vault access",
    idealBuyer: "지금 해야 할 일을 분리하고 싶은 팀"
  },
  {
    slug: "mid-term-initiatives-template",
    sourcePath: "manager_memory/mid-term/current-initiatives.md",
    title: "Mid-Term Initiatives Template",
    description:
      "중기 추진 과제를 묶어 관리하는 템플릿. 분기 단위 흐름을 기록합니다.",
    category: "Memory Ops",
    tags: ["mid-term", "initiatives", "template"],
    priceLabel: "Vault access",
    idealBuyer: "중기 우선순위를 정리하는 운영자"
  },
  {
    slug: "long-term-roadmap-template",
    sourcePath: "manager_memory/long-term/strategy-roadmap.md",
    title: "Long-Term Roadmap Template",
    description:
      "장기 전략과 방향성을 적는 로드맵 템플릿. 큰 그림을 유지하는 문서입니다.",
    category: "Memory Ops",
    tags: ["long-term", "roadmap", "strategy"],
    priceLabel: "Vault access",
    idealBuyer: "장기 전략 기록 틀이 필요한 팀"
  },
  {
    slug: "productization-worklog-example",
    sourcePath: "manager_memory/logs/2026-04-06-prompt-kit-productization.md",
    title: "Productization Worklog Example",
    description:
      "실제 상품화 작업을 어떻게 로그로 남기는지 보여주는 운영 로그 예시.",
    category: "Memory Ops",
    tags: ["worklog", "productization", "example"],
    priceLabel: "Vault access",
    idealBuyer: "기록 예시까지 포함해 팔고 싶은 운영자"
  }
];

const PROJECT_ROOT = process.cwd();

function readMarkdown(relativeFilePath) {
  const absolutePath = path.join(PROJECT_ROOT, relativeFilePath);
  return fs.readFileSync(absolutePath, "utf8");
}

function normalizeSearchValue(value) {
  return (value || "").trim().toLowerCase();
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[.*?\]\(.*?\)/g, " ")
    .replace(/\[([^\]]+)\]\((.*?)\)/g, "$1")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_~>-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function createTeaser(markdown) {
  const splitMarker = "## 복붙용 프롬프트";
  if (markdown.includes(splitMarker)) {
    return `${markdown.split(splitMarker)[0].trim()}\n\n## 전체 본문\n\n구매자 로그인 후 전체 프롬프트를 확인할 수 있습니다.`;
  }

  return `${markdown.slice(0, 500).trim()}\n\n구매자 로그인 후 전체 본문을 확인할 수 있습니다.`;
}

export function getPromptCatalog(filters = {}) {
  const categoryQuery = normalizeSearchValue(filters.category);
  const titleQuery = normalizeSearchValue(filters.title);
  const contentQuery = normalizeSearchValue(filters.content);

  return PROMPT_CATALOG.filter((prompt) => {
    if (categoryQuery && normalizeSearchValue(prompt.category) !== categoryQuery) {
      return false;
    }

    if (titleQuery && !normalizeSearchValue(prompt.title).includes(titleQuery)) {
      return false;
    }

    if (contentQuery) {
      const bodyText = stripMarkdown(readMarkdown(prompt.sourcePath));
      const searchableText = `${prompt.description} ${bodyText}`.toLowerCase();
      if (!searchableText.includes(contentQuery)) {
        return false;
      }
    }

    return true;
  }).map((prompt) => ({
    ...prompt
  }));
}

export function getPromptBySlug(slug) {
  const prompt = PROMPT_CATALOG.find((entry) => entry.slug === slug);

  if (!prompt) {
    return null;
  }

  const content = readMarkdown(prompt.sourcePath);

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

export function getPromptCategories() {
  return [...new Set(PROMPT_CATALOG.map((item) => item.category))].sort((a, b) =>
    a.localeCompare(b)
  );
}

export function getSalesUrl() {
  return (
    process.env.NEXT_PUBLIC_PURCHASE_URL ||
    `mailto:${process.env.SALES_CONTACT_EMAIL || "owner@example.com"}?subject=Prompt%20Vault%20Purchase`
  );
}
