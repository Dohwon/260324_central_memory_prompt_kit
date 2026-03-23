# 기존 기록 분석 -> 공용 템플릿 반영

## 분석 소스
- `/home/dowon/securedir/git/codex/manager_memory/short-term/active-tasks.md`
- `/home/dowon/securedir/git/codex/manager_memory/mid-term/current-initiatives.md`
- `/home/dowon/securedir/git/codex/manager_memory/long-term/strategy-roadmap.md`
- `/home/dowon/securedir/git/codex/manager_memory/logs/*.md`
- `260319_llm_tool_hub/global_memory/*`

## 반복적으로 남긴 기록 패턴
1. 작업 로그 공통 섹션
- 요청 요약
- 배분 보고(기획/설계/구현/QA/아이디어)
- 실행 결과
- QA 체크/검증 근거
- 리스크/의사결정
- 다음 액션

2. 시간축 메모리
- Short: 지금 하는 일, Blocked, 최근 완료
- Mid: 4-12주 Initiative, KPI, owner, milestone, cross-team risk
- Long: 6-12개월 목표, Strategic Bet, evidence-needed, decision-date

3. 사용자/작업 성향
- 톤: 직설적, 핵심->근거->실행
- 작업 방식: 조건+관측+가설+검증
- 품질 기준: 재현 가능한 커맨드/수치/로그
- 운영 기준: 리스크와 검증 포인트를 항상 명시

## prompt-personalization-ko 전달 포인트
- 개인화는 8-12줄 compact profile로 유지
- 시스템 프롬프트와 프로필을 분리
- 작업 지시 시 `공감/분석/행동` 또는 `요약/근거/실행`처럼 순서를 고정
- 좋은 응답/나쁜 응답 사례를 주기적으로 profile compact에 1줄 규칙으로 누적

