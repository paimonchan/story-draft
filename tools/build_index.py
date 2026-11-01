#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
build_index.py — scan stories/**/story.md -> index.json (satu-satunya sumber data web).

Satu draft = satu folder:

  stories/<slug>/story.md     <- cerita mentah (body = prosa apa adanya)
  stories/<slug>/notes.md     <- opsional: ide prompt, ref karakter, catatan render

Frontmatter yang dibaca (key lain ikut diteruskan apa adanya ke `meta`):

  title, status, date, genre, lang, logline, characters, setting,
  target, format, duration, beats, tags

Yang dihitung dari isi (jangan ditulis manual):
  stats      — kata, karakter, paragraf, kalimat, baris dialog, estimasi baca
  toc        — heading (scene/bab) + jumlah kata per scene
  mentions   — berapa kali tiap karakter muncul di prosa
  checks     — kelengkapan metadata + sinyal kesiapan jadi prompt video

Pakai:
  python3 tools/build_index.py            # tulis index.json + data/*.json
  python3 tools/build_index.py --check    # exit 1 kalau ada masalah skema
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path

try:
    import yaml
except ImportError:  # pragma: no cover
    sys.exit("PyYAML wajib: python3 -m pip install -r requirements.txt")

ROOT = Path(__file__).resolve().parent.parent
STORIES_DIR = ROOT / "stories"
OUT = ROOT / "index.json"
DATA_DIR = ROOT / "data"

HEADING_RE = re.compile(r"^(#{1,4})\s+(.+?)\s*$", re.M)
DIALOG_RE = re.compile(r'^\s*(?:[—–]\s|["“»])', re.M)
SENTENCE_RE = re.compile(r"(?<=[.!?…])\s+")
WORDS_PER_MIN = 180

# kata yang bikin sebuah kalimat "bisa difoto" — heuristik, bukan penilaian mutu
VISUAL_WORDS = [
    "cahaya", "sinar", "lampu", "gelap", "bayang", "warna", "siluet", "kontras",
    "kabut", "asap", "hujan", "salju", "debu", "api", "kilat", "pantulan",
    "kamera", "close-up", "closeup", "medium shot", "wide", "zoom", "pan", "dolly",
    "lambat", "cepat", "berlari", "melompat", "berbalik", "membeku", "bergetar",
    "wajah", "mata", "tangan", "napas", "keringat", "darah", "luka",
    "langit", "jalan", "ruang", "pasar", "atap", "cermin", "jendela",
    "suara", "gema", "derit", "letusan", "detak",
]

STATUSES = {"draft", "developing", "final", "adapted", "parked"}


def split_front(text: str) -> tuple[dict, str, bool]:
    """Balikin (frontmatter, body, ada_frontmatter)."""
    if not text.startswith("---"):
        return {}, text, False
    parts = text.split("\n---", 1)
    if len(parts) != 2:
        return {}, text, False
    fm = yaml.safe_load(parts[0][3:]) or {}
    if not isinstance(fm, dict):
        return {}, text, False
    return fm, parts[1].lstrip("\n"), True


def as_list(v) -> list:
    if v is None:
        return []
    if isinstance(v, (list, tuple)):
        return [str(x).strip() for x in v if str(x).strip()]
    return [s.strip() for s in re.split(r"[,;]", str(v)) if s.strip()]


def prose_only(body: str) -> str:
    """Buang heading & fence biar statistik prosa gak keracunan markup."""
    lines = []
    in_code = False
    for line in body.split("\n"):
        if line.lstrip().startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        if HEADING_RE.match(line):
            continue
        lines.append(line)
    return "\n".join(lines)


def paragraphs(body: str) -> list[str]:
    blocks = [b.strip() for b in re.split(r"\n\s*\n", prose_only(body))]
    return [b for b in blocks if b]


def sentences(body: str) -> list[str]:
    text = " ".join(paragraphs(body))
    return [s.strip() for s in SENTENCE_RE.split(text) if s.strip()]


def parse_toc(body: str) -> list[dict]:
    """Heading -> daftar scene, plus jumlah kata tiap scene (fence diabaikan)."""
    stripped_lines = []
    in_code = False
    for line in body.split("\n"):
        if line.lstrip().startswith("```"):
            in_code = not in_code
            stripped_lines.append("")
            continue
        stripped_lines.append("" if in_code else line)
    scan = "\n".join(stripped_lines)
    marks = [(m.start(), m.end(), len(m.group(1)), m.group(2).strip()) for m in HEADING_RE.finditer(scan)]
    toc = []
    for i, (start, end, level, text) in enumerate(marks):
        stop = marks[i + 1][0] if i + 1 < len(marks) else len(scan)
        chunk = scan[end:stop]
        toc.append(
            {
                "id": f"h{i + 1}",
                "level": level,
                "text": text,
                "words": len(chunk.split()),
            }
        )
    return toc


def build_entry(path: Path) -> dict:
    raw = path.read_text(encoding="utf-8")
    fm, body, has_fm = split_front(raw)
    rel = path.parent.relative_to(STORIES_DIR)
    slug = rel.as_posix()
    notes_path = path.with_name("notes.md")
    notes = notes_path.read_text(encoding="utf-8") if notes_path.exists() else ""

    paras = paragraphs(body)
    sents = sentences(body)
    words = len(prose_only(body).split())
    chars = len(prose_only(body))
    dialogue = len(DIALOG_RE.findall(body))
    longest = max((len(s.split()) for s in sents), default=0)
    toc = parse_toc(body)
    visual_hits = sum(
        1 for s in sents if any(w in s.lower() for w in VISUAL_WORDS)
    )

    characters = as_list(fm.get("characters"))
    non_verbal = bool(fm.get("non_verbal"))
    mentions = {}
    low = prose_only(body).lower()
    for c in characters:
        base = c.split("(")[0].strip()
        if not base:
            continue
        # "Cha Sirin" di prosa biasanya cuma ditulis "Sirin" -> hitung nama penuh DAN
        # kata terakhirnya, ambil yang paling sering
        cands = {base.lower()}
        parts = base.split()
        if len(parts) > 1:
            cands.add(parts[-1].lower())
        mentions[c] = max(len(re.findall(re.escape(x), low)) for x in cands)

    declared_beats = fm.get("beats")
    beats = int(declared_beats) if isinstance(declared_beats, (int, float)) else len(toc)

    known = {
        "title", "status", "date", "genre", "lang", "logline", "characters",
        "setting", "target", "format", "duration", "beats", "tags", "non_verbal",
    }

    entry = {
        "slug": slug,
        "title": fm.get("title") or rel.name.replace("-", " ").title(),
        "status": fm.get("status", "draft"),
        "date": str(fm.get("date") or ""),
        "genre": fm.get("genre") or "",
        "lang": fm.get("lang") or "id",
        "logline": fm.get("logline") or "",
        "characters": characters,
        "setting": fm.get("setting") or "",
        "target": fm.get("target") or "MiniMax H3",
        "format": fm.get("format") or "",
        "duration": fm.get("duration"),
        "beats": beats,
        "tags": as_list(fm.get("tags")),
        "non_verbal": non_verbal,
        "meta": {k: v for k, v in fm.items() if k not in known},
        "words": words,
        "chars": chars,
        "paragraphs": len(paras),
        "sentences": len(sents),
        "dialogue": dialogue,
        "longest_sentence": longest,
        "avg_sentence": round(words / len(sents), 1) if sents else 0,
        "read_min": max(1, round(words / WORDS_PER_MIN)) if words else 0,
        "visual_sentences": visual_hits,
        "visual_pct": round(visual_hits / len(sents) * 100) if sents else 0,
        "toc": toc,
        "mentions": mentions,
        "has_frontmatter": has_fm,
        "has_storyboard": path.with_name("storyboard.md").exists(),
        "path": f"stories/{slug}/story.md",
        "content": body,
        "notes": notes,
    }

    checks = [
        {
            "id": "logline",
            "label": "Logline",
            "value": "ada" if entry["logline"] else "kosong",
            "ok": bool(entry["logline"]),
            "note": "satu kalimat inti — dipakai buat ringkas cerita jadi summary prompt",
        },
        {
            "id": "characters",
            "label": "Karakter terdaftar",
            "value": len(characters),
            "ok": bool(characters),
            "note": "tiap karakter di sini nanti jadi <Subject N> di prompt",
        },
        {
            "id": "setting",
            "label": "Setting / lokasi",
            "value": entry["setting"] or "kosong",
            "ok": bool(entry["setting"]),
            "note": "lokasi + waktu — dipakai buat lock background biar gak drift",
        },
        {
            "id": "genre",
            "label": "Genre",
            "value": entry["genre"] or "kosong",
            "ok": bool(entry["genre"]),
            "note": "membantu pilih gaya visual & musik",
        },
        {
            "id": "tags",
            "label": "Tag",
            "value": len(entry["tags"]),
            "ok": bool(entry["tags"]),
            "note": "biar bisa difilter di web",
        },
        {
            "id": "scenes",
            "label": "Scene / beat terpisah",
            "value": f"{len(toc)} heading",
            "ok": len(toc) >= 2,
            "note": "pecah pakai heading (##) — satu scene kira-kira jadi satu shot",
        },
        {
            "id": "sentence",
            "label": "Kalimat terpanjang",
            "value": f"{longest} kata",
            "ok": 0 < longest <= 45,
            "note": "di atas ~45 kata susah dipetakan jadi satu shot",
        },
        {
            "id": "dialogue",
            "label": "Baris dialog",
            "value": "non-verbal" if non_verbal else dialogue,
            "ok": True if non_verbal else dialogue >= 1,
            "note": (
                "lane non-verbal (non_verbal: true) — tanpa lip-sync, tanpa risiko mouth drift"
                if non_verbal
                else "dialog nanti masuk sebagai <d>[Language] teks</d>"
            ),
        },
        {
            "id": "visual",
            "label": "Kalimat dengan isyarat visual",
            "value": f"{visual_hits}/{len(sents)} ({entry['visual_pct']}%)",
            "ok": entry["visual_pct"] >= 30,
            "note": "cahaya, gerak, warna, shot — bahan caption H3",
        },
    ]
    entry["checks"] = checks
    entry["ready"] = sum(1 for c in checks if c["ok"])
    entry["ready_total"] = len(checks)
    return entry


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true", help="exit 1 kalau ada masalah skema")
    ap.add_argument("--quiet", action="store_true")
    args = ap.parse_args()

    files = sorted(STORIES_DIR.glob("**/story.md"))
    if not files:
        sys.exit(f"tidak ada story.md di {STORIES_DIR}")

    entries = [build_entry(p) for p in files]

    errors: list[str] = []
    warnings: list[str] = []
    seen = set()
    for e in entries:
        if e["slug"] in seen:
            errors.append(f"slug duplikat: {e['slug']}")
        seen.add(e["slug"])
        if not e["has_frontmatter"]:
            errors.append(f"{e['slug']}: frontmatter (---) tidak terbaca — cek tanda kutip di nilai berisi ':'")
        if not e["title"]:
            errors.append(f"{e['slug']}: title kosong")
        if e["status"] not in STATUSES:
            errors.append(f"{e['slug']}: status '{e['status']}' tidak dikenal (pakai: {', '.join(sorted(STATUSES))})")
        # ini peringatan saja: draft setengah jadi tetap boleh ke-publish,
        # CI jangan gagal cuma karena ceritanya belum ditulis
        if e["words"] < 20:
            warnings.append(f"{e['slug']}: prosa baru {e['words']} kata — belum diisi")
        if not e["logline"]:
            warnings.append(f"{e['slug']}: logline belum diisi")
        if not e["toc"]:
            warnings.append(f"{e['slug']}: belum ada heading — belum dipecah per scene")

    entries.sort(key=lambda e: (e["date"] or "", e["title"]), reverse=True)

    DATA_DIR.mkdir(exist_ok=True)
    light_entries = []
    for e in entries:
        data_file = "data/" + e["slug"].replace("/", "__") + ".json"
        (ROOT / data_file).write_text(
            json.dumps(
                {
                    "slug": e["slug"],
                    "content": e["content"],
                    "notes": e["notes"],
                    "storyboard": (
                        path.with_name("storyboard.md").read_text(encoding="utf-8")
                        if path.with_name("storyboard.md").exists()
                        else ""
                    ),
                },
                ensure_ascii=False,
                indent=1,
            ),
            encoding="utf-8",
        )
        light = {k: v for k, v in e.items() if k not in ("content", "notes")}
        light["data"] = data_file
        light_entries.append(light)

    # body cuma dipakai buat data file; index.json tetap ringan
    def avg(vals):
        vals = [v for v in vals if isinstance(v, (int, float))]
        return round(sum(vals) / len(vals), 1) if vals else 0

    baseline = {
        "words": avg([e["words"] for e in entries]),
        "sentences": avg([e["sentences"] for e in entries]),
        "dialogue": avg([e["dialogue"] for e in entries]),
        "scenes": avg([len(e["toc"]) for e in entries]),
        "longest_sentence": avg([e["longest_sentence"] for e in entries]),
        "visual_pct": avg([e["visual_pct"] for e in entries]),
    }

    payload = {
        "generated": datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ"),
        "count": len(light_entries),
        "words": sum(e["words"] for e in entries),
        "statuses": {s: sum(1 for e in entries if e["status"] == s) for s in sorted(STATUSES)},
        "genres": sorted({e["genre"] for e in entries if e["genre"]}),
        "tags": sorted({t for e in entries for t in e["tags"]}),
        "characters": sorted({c for e in entries for c in e["characters"]}),
        "baseline": baseline,
        "entries": light_entries,
    }
    OUT.write_text(json.dumps(payload, ensure_ascii=False, indent=1), encoding="utf-8")

    if not args.quiet:
        print(
            f"index.json: {len(light_entries)} draft, {payload['words']:,} kata, "
            f"{OUT.stat().st_size:,} bytes (+{len(light_entries)} file di data/)"
        )
        for e in entries:
            print(f"  [{e['status']}] {e['title']} — {e['words']} kata, {len(e['toc'])} scene, siap {e['ready']}/{e['ready_total']}")

    if warnings:
        print("\nPERINGATAN (tidak menggagalkan build):")
        for w in warnings:
            print("  -", w)

    if errors:
        print("\nMASALAH SKEMA:")
        for err in errors:
            print("  -", err)
        return 1 if args.check else 0
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
