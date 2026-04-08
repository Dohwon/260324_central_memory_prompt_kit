# AGENTS.md

## 목적

- 이 프로젝트는 "중앙 메모리 인프라"와 "재사용 가능한 프롬프트 상품"을 함께 관리한다.
- 모든 산출물은 특정 모델 전용 시스템 프롬프트보다, 여러 모델과 사람 작업자에게 모두 통하는 Markdown 운영 자산을 우선한다.

## 기본 운영 규칙

1. 새 자산은 가능한 한 `tool-agnostic`하게 만든다.
- Codex, Claude Code, Gemini, Cursor, 사람 작업자가 모두 이해할 수 있어야 한다.

2. 프롬프트는 실행 프롬프트가 아니라 생성 프롬프트를 우선한다.
- 목표는 "현재 작업을 대신 수행하는 프롬프트"보다 "누구나 자기 회사 문서를 만들 수 있게 하는 프롬프트"다.

3. 모든 큰 작업은 `manager_memory/`를 갱신한다.
- 단기: `short-term/active-tasks.md`
- 중기: `mid-term/current-initiatives.md`
- 장기: `long-term/strategy-roadmap.md`
- 로그: `logs/YYYY-MM-DD-{task-slug}.md`

4. 프롬프트는 아래 4가지를 반드시 명시한다.
- 언제 쓰는지
- 무엇을 입력으로 넣는지
- 어떤 파일/문서를 출력해야 하는지
- 무엇을 만들면 안 되는지

5. 스킬 문서는 runtime prompt와 shareable profile을 분리한다.
- `skills/**/SKILL.md`는 실행용 원문이다.
- `skill_docs/*.md`는 사람이 공유하기 위한 설명 문서다.

## 문서 규칙

- 프롬프트 문서는 `prompts/NN_name.md` 형식을 따른다.
- 스킬 문서는 `skill_docs/{skill-name}.md` 형식을 따른다.
- 로그 파일은 `manager_memory/logs/YYYY-MM-DD-{slug}.md` 형식을 따른다.
- short/mid/long 문서에는 가능하면 `owner`, `status`, `due`, `next_action`을 남긴다.

## 우선순위

1. 인수인계 손실을 줄이는 문서
2. 여러 툴에서 재사용 가능한 프롬프트
3. 운영 규칙과 메모리 레이어
4. 툴별 어댑터와 자동화

## 품질 기준

- Markdown만 읽어도 작업 상태와 다음 행동이 이어져야 한다.
- 프롬프트는 과장된 브랜딩 문구보다 재현 가능한 문서 구조를 우선한다.
- 모르는 정보는 지어내지 않고 `Unknown` 또는 `추가 입력 필요`로 처리한다.
- 프롬프트 결과물은 다른 사람이 그대로 복붙해 자기 버전으로 바꿔 쓸 수 있어야 한다.
