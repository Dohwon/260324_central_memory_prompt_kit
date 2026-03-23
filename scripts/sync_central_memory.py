#!/usr/bin/env python3
import json
from pathlib import Path


def _read(path: Path) -> str:
    return path.read_text(encoding="utf-8")


def _write(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(text, encoding="utf-8")


def render_source_of_truth(profile: dict) -> str:
    user = profile["user_profile"]
    comm = "\n".join(f"- {x}" for x in user.get("communication_style", []))
    work = "\n".join(f"- {x}" for x in user.get("working_style", []))
    tech = "\n".join(f"- {x}" for x in user.get("technical_preferences", []))

    return f"""# Shared Source of Truth

## User Snapshot

- {user.get("one_line", "")}

## Communication Style

{comm}

## Working Style

{work}

## Technical Preferences

{tech}
"""


def render_adapter(template_text: str, shared: str) -> str:
    return template_text.replace("{{SHARED_SOURCE_OF_TRUTH}}", shared)


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    central = root / "central_memory"
    templates = root / "templates" / "tool_adapters"

    profile_path = central / "memory_profile.json"
    if not profile_path.exists():
        raise SystemExit(f"missing file: {profile_path}")

    profile = json.loads(_read(profile_path))
    shared = render_source_of_truth(profile)

    export_dir = central / "exports"
    adapter_dir = central / "adapters"
    _write(export_dir / "source_of_truth.md", shared)

    mapping = {
        "AGENTS.template.md": "AGENTS.md",
        "CLAUDE.template.md": "CLAUDE.md",
        "GEMINI.template.md": "GEMINI.md",
        "cursor-global-memory.template.mdc": "cursor-global-memory.mdc",
        "windsurf-global-memory.template.md": "windsurf-global-memory.md"
    }
    for src, dst in mapping.items():
        adapter = render_adapter(_read(templates / src), shared)
        _write(adapter_dir / dst, adapter)

    index = {
        "generated_at": profile.get("generated_at"),
        "owner": profile.get("owner"),
        "adapters": list(mapping.values())
    }
    _write(export_dir / "memory_index.json", json.dumps(index, ensure_ascii=False, indent=2) + "\n")
    print("central memory synced")


if __name__ == "__main__":
    main()
