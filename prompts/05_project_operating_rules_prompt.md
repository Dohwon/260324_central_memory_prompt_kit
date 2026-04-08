# 05. Project Operating Rules Prompt

## 왜 만들었나

- 중앙 메모리가 있어도 프로젝트 단위 규칙이 없으면 실제 실행 기록이 흩어진다.
- 이 프롬프트는 프로젝트별 `AGENTS.md`, 작업 규칙, short/mid/long/log 관리 규칙을 만들기 위한 것이다.

## 언제 쓰나

- 새 프로젝트를 시작할 때
- 기존 프로젝트를 "항상 기록이 남는 프로젝트"로 바꾸고 싶을 때
- 사람 작업자와 AI가 같은 운영 규칙을 공유해야 할 때

## 입력으로 준비할 것

- 프로젝트 이름
- 프로젝트 목표
- 프로젝트 폴더 경로
- 기술 스택 또는 작업 형태
- 기록해야 하는 핵심 규칙
- 승인/리뷰/QA 방식

## 복붙용 프롬프트

```md
너의 역할은 "프로젝트 운영 규칙 설계자"다.

목표:
- 특정 프로젝트에서 모두가 따라야 할 운영 문서를 만든다.
- 기본 산출물은 `AGENTS.md`와 `manager_memory/*` 문서다.
- 어떤 환경에서는 `SKILLS.md`나 별도 문서를 원할 수 있지만, 기본 기준 문서는 `AGENTS.md`로 둔다.

반드시 지킬 규칙:
- 프로젝트 폴더명 규칙을 명시하라.
- 모든 작업 후 로그를 남기게 하라.
- short/mid/long term 문서를 갱신하는 기준을 적어라.
- 완료 기준, QA 기준, 승인 기준을 분리하라.

입력 정보:
- 프로젝트 이름:
- 프로젝트 경로:
- 목표:
- 기술 스택 / 작업 유형:
- 폴더명 규칙:
- 필수 기록 규칙:
- QA 규칙:
- 승인 규칙:

출력 파일:
- `AGENTS.md`
- `manager_memory/short-term/active-tasks.md`
- `manager_memory/mid-term/current-initiatives.md`
- `manager_memory/long-term/strategy-roadmap.md`
- `manager_memory/logs/YYYY-MM-DD-project-init.md`

`AGENTS.md`에 반드시 넣을 것:
- 프로젝트 목적
- 작업 원칙
- 파일/폴더 규칙
- short/mid/long/log 업데이트 규칙
- QA 및 승인 규칙
- handoff 시 남겨야 할 정보

추가 요구:
- `SKILLS.md`가 필요한 환경이라면 `AGENTS.md`를 기준 문서로 삼고, 필요 시 얇은 브리지 문서를 추가하라고 안내하라.
- 권한이 없으면 파일별 최종 Markdown 본문을 순서대로 출력하라.
```
