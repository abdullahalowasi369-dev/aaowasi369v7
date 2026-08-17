#!/usr/bin/env python3
"""Sync high-impact website copy from an editable DOCX control panel.

Usage:
    python scripts/sync_content_from_docx.py career-assets/Website_Content_Guide.docx

The DOCX contains one machine-readable marker per editable field, for example:
    [hero.headlinePrefix]Governance systems built to turn[/hero.headlinePrefix]

The script writes values to data/site-copy.json. It does NOT publish the site;
run the normal development/build/deployment workflow afterward.

Safety design:
- Only keys that already exist in data/site-copy.json can be changed.
- Unknown markers are rejected rather than silently creating new fields.
- A timestamped JSON backup is made before changes.
"""
from __future__ import annotations

import argparse
import json
import re
import shutil
from datetime import datetime
from pathlib import Path

from docx import Document

ROOT = Path(__file__).resolve().parents[1]
JSON_PATH = ROOT / "data" / "site-copy.json"
MARKER = re.compile(r"^\[(?P<key>[A-Za-z0-9_.-]+)\](?P<value>.*)\[/(?P=key)\]$")


def flatten_keys(obj: dict, prefix: str = "") -> set[str]:
    result: set[str] = set()
    for key, value in obj.items():
        path = f"{prefix}.{key}" if prefix else key
        if isinstance(value, dict):
            result |= flatten_keys(value, path)
        else:
            result.add(path)
    return result


def set_path(obj: dict, dotted: str, value: str) -> None:
    parts = dotted.split(".")
    cur = obj
    for part in parts[:-1]:
        cur = cur[part]
    cur[parts[-1]] = value


def main() -> None:
    parser = argparse.ArgumentParser(description="Sync editable DOCX copy into data/site-copy.json")
    parser.add_argument("docx", type=Path, help="Path to Website_Content_Guide.docx")
    args = parser.parse_args()

    if not args.docx.exists():
        raise SystemExit(f"DOCX not found: {args.docx}")

    data = json.loads(JSON_PATH.read_text(encoding="utf-8"))
    allowed = flatten_keys(data)
    doc = Document(args.docx)

    updates: dict[str, str] = {}
    unknown: list[str] = []
    for paragraph in doc.paragraphs:
        text = paragraph.text.strip()
        match = MARKER.match(text)
        if not match:
            continue
        key = match.group("key")
        value = match.group("value").strip()
        if key not in allowed:
            unknown.append(key)
            continue
        updates[key] = value

    if unknown:
        raise SystemExit("Unknown control-panel keys: " + ", ".join(sorted(set(unknown))))
    if not updates:
        raise SystemExit("No valid [key]value[/key] markers found. Nothing changed.")

    stamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    backup = JSON_PATH.with_name(f"site-copy.backup-{stamp}.json")
    shutil.copy2(JSON_PATH, backup)

    for key, value in updates.items():
        set_path(data, key, value)

    JSON_PATH.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
    print(f"Updated {len(updates)} website copy fields.")
    print(f"Backup: {backup.relative_to(ROOT)}")
    print("Next: review data/site-copy.json, then run npm run lint && npm run build.")


if __name__ == "__main__":
    main()
