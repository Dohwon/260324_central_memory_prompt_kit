# Central Memory Prompt Kit

에이전트 작업기억을 한 장으로 묶는 실험이자, 여러 AI 툴과 사람 협업자가 같은 운영 문서를 재사용할 수 있게 만드는 중앙 메모리 프롬프트 키트다.

## 목적

- 여러 AI 툴과 사람 협업자 사이에서 손실 없는 인수인계를 만드는 중앙 메모리 체계를 만든다.
- 툴별 어댑터만 제공하는 수준을 넘어서, 누구나 가져가 자기 회사/자기 운영 방식을 만들 수 있는 프롬프트 상품 묶음을 만든다.
- `owner profile`, `skill profile`, `company operating model`, `project rules`, `worklog archive`를 모두 Markdown 중심으로 재생산 가능하게 만든다.

## 이 프로젝트에서 실제로 묶는 것

- 오너 성향과 판단 기준
- 스킬 설명서와 호출 원칙
- 회사/팀 운영 모델과 handoff 규칙
- 프로젝트별 메모리 링크와 작업 규칙
- short/mid/long/log 구조의 작업기억
- 누적 work summary와 버전 아카이브

## 이 프로젝트의 두 축

1. Infrastructure Layer
- `central_memory/`, `templates/`, `scripts/`, `schema/`
- 실제 중앙 메모리, 어댑터, 동기화 스크립트를 담는다.

2. Prompt Product Layer
- `prompts/`, `skill_docs/`, `AGENTS.md`, `manager_memory/`
- 다른 사람이 복붙만 해도 자기만의 운영 회사와 문서 체계를 만들 수 있는 프롬프트 묶음을 담는다.

## 왜 기존 폴더에서 계속 작업했는가

- 기존 `260324_central_memory_prompt_kit`이 이미 중앙 메모리, 어댑터, 핸드오버 포맷을 다루고 있었다.
- 새 프로젝트를 따로 만들면 `중앙 메모리 키트`와 `프롬프트 상품 키트`가 다시 분리된다.
- 그래서 이 프로젝트를 확장해 "메모리 인프라 + 프롬프트 상품"을 함께 관리하도록 정리했다.

## 추천 사용 순서

1. `prompts/01_owner_profile_prompt.md`
- 오너 성향과 판단 기준 문서화
2. `prompts/02_skill_profile_prompt.md`
- 스킬별 역할 문서화
3. `prompts/03_company_operating_model_prompt.md`
- 협업 규칙, handoff, 운영 체계 문서화
4. `prompts/04_memory_workspace_prompt.md`
- 폴더 구조와 중앙 메모리 작업 공간 생성
5. `prompts/05_project_operating_rules_prompt.md`
- 프로젝트별 `AGENTS.md`, short/mid/long/log 규칙 생성
6. `prompts/06_worklog_archive_prompt.md`
- 작업 기록과 아카이브 누락 방지

## `$startup-business-strategist-ko`의 위치

- 맞는 방향이다. 다만 이것은 "프롬프트 상품 자체"라기보다 `goal shaping`과 사업화 우선순위 정리에 강한 시작점이다.
- 즉, 프롬프트 패키지를 팔려면 최종 산출물은 이 폴더의 `prompts/*.md` 같은 툴-중립 자산이어야 하고, `startup-business-strategist-ko`는 그 패키지의 포지셔닝과 상품 기획을 돕는 상위 기획 스킬로 보는 게 맞다.

## 핵심 구조

```text
260324_central_memory_prompt_kit/
├─ README.md
├─ AGENTS.md
├─ prompts/
│  ├─ README.md
│  ├─ 01_owner_profile_prompt.md
│  ├─ 02_skill_profile_prompt.md
│  ├─ 03_company_operating_model_prompt.md
│  ├─ 04_memory_workspace_prompt.md
│  ├─ 05_project_operating_rules_prompt.md
│  └─ 06_worklog_archive_prompt.md
├─ skill_docs/
│  ├─ README.md
│  └─ startup-business-strategist-ko.md
├─ manager_memory/
│  ├─ short-term/active-tasks.md
│  ├─ mid-term/current-initiatives.md
│  ├─ long-term/strategy-roadmap.md
│  └─ logs/
├─ central_memory/
├─ templates/
├─ scripts/
└─ schema/
```

## prompt product 레이어에서 만든 것

- `prompts/`
  - 복붙해서 바로 쓸 수 있는 모델-중립 프롬프트 자산
- `skill_docs/`
  - 현재 스킬을 사람이 열어볼 수 있는 공유용 문서 계층
- `AGENTS.md`
  - 이 프로젝트 자체의 운영 규칙
- `manager_memory/`
  - 이 프로젝트의 short/mid/long/log 전략 계층

## 기존 중앙화 원칙

- 원칙 1: 프로젝트별 메모리는 유지하되, 성향과 운영 정책은 중앙에서 재사용 가능해야 한다.
- 원칙 2: 프로젝트에는 얇은 링크/어댑터를 두고 정답 원본은 중앙 문서에 둔다.
- 원칙 3: 모델이 달라도 최종 산출물은 Markdown 문서로 수렴해야 한다.
- 원칙 4: 세션이 끝날 때마다 `short/mid/long/log` 중 최소 하나 이상은 반드시 갱신한다.

## 빠른 시작

1. 오너 문서부터 만들려면 `prompts/01_owner_profile_prompt.md`를 연다.
2. 스킬 설명서를 만들려면 `prompts/02_skill_profile_prompt.md`를 연다.
3. 회사 운영 방식을 만들려면 `prompts/03_company_operating_model_prompt.md`를 연다.
4. 실제 메모리 폴더를 만들려면 `prompts/04_memory_workspace_prompt.md`를 연다.
5. 프로젝트별 운영 규칙을 만들려면 `prompts/05_project_operating_rules_prompt.md`를 연다.
6. 매 작업 기록 자동화용 문서를 만들려면 `prompts/06_worklog_archive_prompt.md`를 연다.

## Infrastructure Layer 빠른 시작

1. `templates/*.template.*` 파일을 복사해 `central_memory/` 루트에 배치
2. `schema/memory_profile.schema.json`에 맞춰 `memory_profile.json` 작성
3. `scripts/sync_central_memory.py` 실행해 툴별 어댑터 생성
4. 각 프로젝트 루트에서 `scripts/init_project_memory_link.sh <central_memory_abs_path>` 실행

## 권장 중앙 저장 위치

- `/home/dowon/securedir/git/codex/central_memory`
