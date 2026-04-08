# startup-business-strategist-ko

## 한 줄 역할

- 아이템을 사업 관점에서 빠르게 구조화하고, 실행 가능한 수익화/우선순위/검증 계획으로 정리하는 전략 스킬.

## 언제 호출할지

- 새 아이템의 사업 타당성을 점검할 때
- 기능 우선순위를 "기술 가능성"이 아니라 "지불의사와 반복 사용성" 기준으로 재정렬할 때
- `goal shaping` 단계에서 `MVP`, `success metrics`, `stop condition`을 압축할 때

## 언제 호출하지 말지

- 이미 실행 규칙과 제품 범위가 고정된 순수 구현 작업만 남았을 때
- 단순 코드 수정이나 버그 패치처럼 사업 판단이 크게 개입하지 않는 작업일 때

## 강점

- 대상 고객, 핵심 문제, 현재 대안, 성공 지표를 빠르게 한 문장 문제로 압축한다.
- SWOT, 경쟁사 맵, 수익화 모델, 90일 실험안을 연결해 보여준다.
- 불확실성이 큰 경우 곧바로 구현 확대하지 않고 검증 실험을 먼저 제안한다.

## 필수 입력 정보

- 아이템 또는 기능 설명
- 예상 사용자/고객
- 현재 대안 또는 경쟁 상황
- 원하는 성공 기준 또는 사업 목표
- 있으면 가격/비용/운영 제약

## 기대 산출물

- 한 줄 결론
- SWOT 요약
- 경쟁사 비교
- 수익화 제안
- 90일 실행안
- 의사결정 포인트
- `HANDOFF_PACKET`

## 협업 방식

- 기본적으로 `goal_shaping` 단계에서 먼저 호출되고, 결과는 `multi-agent-manager-ko`로 handoff된다.
- 화면 요구가 크면 `screen-spec-mockup-ko`를 다음 담당자로 붙일 수 있지만, 최종 배분 책임은 관리자 역할이 진다.
- 기획, 설계, 구현, QA 결과를 사업 임팩트 기준으로 다시 정렬하는 데 사용된다.

## handoff 기준

- `goal`, `mvp`, `success_metrics`, `stop_condition`, `next_owner`가 채워져 있어야 한다.
- 전달 포맷은 `skills/HANDOFF_PROTOCOL.md`를 따른다.

## 실패 패턴 / 오남용 패턴

- 최신성 검증이 필요한 경쟁사/가격 정보를 확인하지 않고 단정하는 경우
- 실행 가능한 수치나 검증 계획 없이 미사여구 위주로 정리하는 경우
- 관리자에게 넘길 수 있는 packet 없이 의견만 남기는 경우

## 모델별 적용 메모

- 어떤 모델이든 결과는 전략 문서와 handoff packet으로 수렴시키는 게 중요하다.
- 실행용 시스템 프롬프트로 쓰기보다, 사업 방향을 고정하는 상위 기획 입력으로 쓰는 편이 적합하다.

## source path

- `skills/Intelligence & Growth/startup-business-strategist-ko/SKILL.md`

## related docs

- `skills/HANDOFF_PROTOCOL.md`
- `skills/COMPANY_OPERATING_MODEL.md`
- `skills/SKILL_COLLABORATION_MAP.md`
