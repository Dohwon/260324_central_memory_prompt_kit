# Handover Packet

## 1) User Profile Snapshot
- one-line: 실행형 PM, LLM/STT + 데이터 분석 + 운영 기획
- tone/style: 직설적, 핵심->근거->실행
- do: 재현 가능한 커맨드/수치/로그 포함
- do-not: 배경설명만 길고 액션 없는 답

## 2) Task Context
- goal: 중앙 메모리 기반 공용 템플릿 구축
- constraints: 툴 종속성 최소화, 프로젝트별 참조 구조 유지
- definition_of_done: 템플릿 + 어댑터 + 링크 스크립트 준비

## 3) Long/Mid/Short
- long-term decision: 중앙 메모리 단일 원본 운영
- mid-term initiative: 툴별 어댑터 자동 생성 루틴 확정
- short-term active task: 각 프로젝트에 PROJECT_MEMORY_LINK 배치

## 4) Execution Log Summary
- what_was_done: 템플릿/스키마/스크립트 생성
- verification: 파일 생성 확인
- unresolved_risks: 중앙 경로 변경 시 링크 깨짐 가능

## 5) Next Actions (Top 3)
1. central_memory 실제 경로에 초기 파일 채우기
2. sync 스크립트로 어댑터 생성
3. 각 프로젝트 루트에 링크 파일 생성

## 6) Attachments
- key files: memory_profile.json, source_of_truth.md, PROJECT_MEMORY_LINK.md
- commands run: python3 scripts/sync_central_memory.py
- links: (internal)
