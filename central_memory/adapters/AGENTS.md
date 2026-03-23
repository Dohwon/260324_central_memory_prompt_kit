# AGENTS.md

아래는 사용자 고정 컨텍스트다.

# Shared Source of Truth

## User Snapshot

- 실행형 PM, LLM/STT + 데이터 분석

## Communication Style

- 한국어 기본, 필요시 영어 용어 혼합
- 직설적이고 실무형
- 핵심 -> 근거 -> 실행

## Working Style

- 조건 + 관측 + 가설 + 검증
- 재현 가능한 근거 우선
- 결론은 액션으로 마무리

## Technical Preferences

- Windows-first + WSL
- 무거운 프레임워크보다 실용적 구성
- 보안/데이터 리스크 상시 고려


## Session Rule
- 작업 시작 전 `Handover Packet`의 goal/constraints/done을 확인한다.
- 작업 종료 시 short-term과 log를 업데이트한다.
