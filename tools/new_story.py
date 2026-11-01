#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
new_story.py: bikin folder draft baru dari template.

  python3 tools/new_story.py "Lampu Terakhir di Pasar Loak" \
      --genre thriller --characters "Nara,Pak Sukron" \
      --setting "Pasar loak Bandung, malam setelah hujan" \
      --logline "..." --tags "urban,malam,hujan" --duration 45

Slug otomatis dari judul (--slug buat override). File cerita langsung dibuat
dengan frontmatter terisi + heading scene 1-3, siap ditulis. Setelah itu:

  python3 tools/build_index.py
"""
from __future__ import annotations

import argparse
import re
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
STORIES_DIR = ROOT / "stories"

TEMPLATE = """---
title: "{title}"
status: draft
date: {today}
genre: "{genre}"
lang: id
logline: "{logline}"
characters: [{characters}]
setting: "{setting}"
target: "MiniMax H3"
format: "{fmt}"
duration: {duration}
tags: [{tags}]
---

## 1. {scene1}

Tulis scene pertama di sini.

## 2. {scene2}

## 3. {scene3}
"""


def slugify(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return re.sub(r"-{2,}", "-", s) or "draft-baru"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("title")
    ap.add_argument("--slug")
    ap.add_argument("--genre", default="")
    ap.add_argument("--logline", default="")
    ap.add_argument("--characters", default="")
    ap.add_argument("--setting", default="")
    ap.add_argument("--tags", default="")
    ap.add_argument("--format", default="9:16")
    ap.add_argument("--duration", default="null")
    ap.add_argument("--scenes", type=int, default=3)
    args = ap.parse_args()

    slug = args.slug or slugify(args.title)
    folder = STORIES_DIR / slug
    if folder.exists():
        print(f"folder sudah ada: {folder.relative_to(ROOT)}, tidak ditimpa")
        return 1

    chars = ", ".join(c.strip() for c in args.characters.split(",") if c.strip())
    tags = ", ".join(t.strip() for t in args.tags.split(",") if t.strip())
    # frontmatter YAML: kutip nilai yang bisa mengandung ':' atau '#' biar aman
    def q(v: str) -> str:
        return v.replace('"', "'")

    folder.mkdir(parents=True)
    names = ["Scene pertama", "Scene kedua", "Scene ketiga", "Scene keempat", "Scene kelima"]
    body = TEMPLATE.format(
        title=q(args.title),
        today=date.today().isoformat(),
        genre=q(args.genre),
        logline=q(args.logline),
        characters=chars,
        setting=q(args.setting),
        fmt=args.format,
        duration=args.duration,
        tags=tags,
        scene1=names[0],
        scene2=names[1] if args.scenes > 1 else names[0],
        scene3=names[2] if args.scenes > 2 else names[0],
    )
    (folder / "story.md").write_text(body, encoding="utf-8")
    (folder / "notes.md").write_text(
        f"# Catatan, {args.title}\n\n"
        "- **Ide prompt**:\n- **Referensi visual**:\n- **Karakter** (deskripsi tetap):\n"
        "- **Peta shot**:\n- **Keputusan**:\n",
        encoding="utf-8",
    )
    print(f"dibuat: stories/{slug}/story.md + notes.md")
    print("lanjut: python3 tools/build_index.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
