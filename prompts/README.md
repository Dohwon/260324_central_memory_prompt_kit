# Prompt Bundle README

이 폴더는 "프롬프트를 써서 자기만의 운영 회사와 문서 체계를 만드는" 용도의 상품 묶음이다.

## 사용 원칙

- 각 파일은 특정 툴 전용 시스템 프롬프트가 아니다.
- 각 파일은 사용자 고유의 운영 문서를 생성하기 위한 생성 프롬프트다.
- 모델이 파일 생성 권한이 있으면 실제 파일까지 만들게 하고, 권한이 없으면 최종 Markdown 본문을 출력하게 하면 된다.

## 프롬프트 맵

1. `01_owner_profile_prompt.md`
- 오너 성향, 의사결정, 커뮤니케이션 스타일 문서화

2. `02_skill_profile_prompt.md`
- 스킬별 역할, 강점, 협업 방법, 필수조건 문서화

3. `03_company_operating_model_prompt.md`
- 회사 운영 방식, handoff, collaboration, quality gate 문서화

4. `04_memory_workspace_prompt.md`
- 스킬/메모리/운영 참고 폴더 구조 생성

5. `05_project_operating_rules_prompt.md`
- 프로젝트별 `AGENTS.md`와 short/mid/long/log 규칙 생성

6. `06_worklog_archive_prompt.md`
- 작업 내역, 로그, 아카이브 누락 방지

## 추천 흐름

1. 오너 문서 생성
2. 스킬 문서 생성
3. 회사 운영 문서 생성
4. 중앙 메모리 작업 공간 생성
5. 프로젝트 운영 규칙 생성
6. 작업 로그/아카이브 자동화

## 주의

- 이 프롬프트들은 "현재 레포를 그대로 복제하는" 목적이 아니다.
- 입력자의 이름, 팀 구조, 스킬 목록, 툴 환경, 문서 정책에 맞춰 각자 다른 회사를 생성하는 것이 목적이다.
