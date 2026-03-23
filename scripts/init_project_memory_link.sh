#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "usage: $0 <central_memory_abs_path>"
  exit 1
fi

CENTRAL="$1"
if [[ ! -d "$CENTRAL" ]]; then
  echo "central memory path not found: $CENTRAL"
  exit 1
fi

cat > PROJECT_MEMORY_LINK.md <<LINK
# PROJECT_MEMORY_LINK

- central_memory_root: $CENTRAL
- canonical_profile: $CENTRAL/memory_profile.json
- source_of_truth: $CENTRAL/exports/source_of_truth.md
- short_term: $CENTRAL/work_layers/short-term/active-tasks.md
- mid_term: $CENTRAL/work_layers/mid-term/current-initiatives.md
- long_term: $CENTRAL/work_layers/long-term/strategy-roadmap.md
- logs_dir: $CENTRAL/work_layers/logs

## Session Usage
1. 작업 시작 시 source_of_truth + short_term 확인
2. 작업 중 결정사항은 로그 파일에 먼저 기록
3. 세션 종료 시 short_term next-action 갱신
LINK

echo "created: PROJECT_MEMORY_LINK.md"
