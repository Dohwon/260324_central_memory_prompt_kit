# Central Memory Prompt Kit

## 목적
- 여러 AI 툴(OpenAI ChatGPT/API, Codex, Claude Code, Gemini CLI, Cursor, Windsurf)에서 공통으로 재사용 가능한 중앙 메모리 체계를 만든다.
- 프로젝트 폴더마다 작업하더라도, 로컬 파일은 중앙 메모리의 얇은 참조 레이어로 유지한다.
- 핸드오버 시 "사람/작업/상태"를 한 번에 넘기는 공용 패킷 포맷을 고정한다.

## 핵심 구조
1. Canonical: `memory_profile.json` (정답 원본)
2. Export: `source_of_truth.md` (사람이 읽는 공용 본문)
3. Adapters: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, `.cursor/rules/global-memory.mdc`, `windsurf-global-memory.md`
4. Task Layers: `long/mid/short` + `logs`
5. Handover Packet: 다른 AI에게 전달하는 1회성 작업 패킷

## 흩어진 기억 중앙화 원칙
- 원칙 1: 프로젝트별 메모리를 계속 두되, "정책/성향/작업 방식"은 중앙만 수정한다.
- 원칙 2: 프로젝트에는 `PROJECT_MEMORY_LINK.md`만 두고 중앙 경로를 명시한다.
- 원칙 3: 각 프로젝트의 `AGENTS.md`/`CLAUDE.md`/`GEMINI.md`는 중앙 export를 복사 생성한다.
- 원칙 4: 세션 종료 시 short/mid/long/log만 갱신하고, 다음 세션 시작 시 동일 파일을 재로딩한다.

## 빠른 시작
1. `templates/*.template.*` 파일을 복사해 `central_memory/` 루트에 배치
2. `schema/memory_profile.schema.json`에 맞춰 `memory_profile.json` 작성
3. `scripts/sync_central_memory.py` 실행해 툴별 어댑터 생성
4. 각 프로젝트 루트에서 `scripts/init_project_memory_link.sh <central_memory_abs_path>` 실행

## 권장 중앙 저장 위치
- `/home/dowon/securedir/git/codex/central_memory`

