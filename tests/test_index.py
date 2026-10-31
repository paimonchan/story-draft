#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Regresi skema: cerita -> index.json -> yang dibaca web."""
import sys
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / "tools"))

import build_index as bi  # noqa: E402


class TestStoryDraft(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.files = sorted(bi.STORIES_DIR.glob("**/story.md"))
        cls.entries = [bi.build_entry(p) for p in cls.files]

    def test_ada_draft(self):
        self.assertTrue(self.files, "tidak ada story.md di stories/")

    def test_slug_unik(self):
        slugs = [e["slug"] for e in self.entries]
        self.assertEqual(len(slugs), len(set(slugs)), "slug duplikat")

    def test_metadata_dasar(self):
        for e in self.entries:
            with self.subTest(slug=e["slug"]):
                self.assertTrue(e["has_frontmatter"], "frontmatter tidak terbaca")
                self.assertTrue(e["title"], "title kosong")
                self.assertIn(e["status"], bi.STATUSES)

    def test_prosa_terisi(self):
        for e in self.entries:
            with self.subTest(slug=e["slug"]):
                self.assertGreater(e["words"], 20, "prosa terlalu pendek")
                self.assertFalse(e["content"].lstrip().startswith("---"), "body masih mengandung frontmatter")

    def test_statistik_konsisten(self):
        for e in self.entries:
            with self.subTest(slug=e["slug"]):
                self.assertGreaterEqual(e["words"], e["paragraphs"])
                self.assertGreaterEqual(e["sentences"], 1)
                self.assertGreater(e["chars"], 0)
                self.assertLessEqual(e["chars"], len(e["content"]), "statistik prosa lebih panjang dari body")
                self.assertLessEqual(e["longest_sentence"], max(1, e["words"]))
                self.assertEqual(
                    [t["id"] for t in e["toc"]], [f"h{i + 1}" for i in range(len(e["toc"]))]
                )

    def test_toc_berurutan_dan_berisi(self):
        for e in self.entries:
            for t in e["toc"]:
                with self.subTest(slug=e["slug"], heading=t["text"]):
                    self.assertTrue(t["text"].strip(), "heading kosong")
                    self.assertIn(t["level"], (1, 2, 3, 4))

    def test_checks_lengkap(self):
        ids = {"logline", "characters", "setting", "genre", "tags", "scenes", "sentence", "dialogue", "visual"}
        for e in self.entries:
            with self.subTest(slug=e["slug"]):
                self.assertEqual({c["id"] for c in e["checks"]}, ids)
                self.assertEqual(e["ready_total"], len(ids))
                self.assertEqual(e["ready"], sum(1 for c in e["checks"] if c["ok"]))

    def test_karakter_terhitung(self):
        for e in self.entries:
            with self.subTest(slug=e["slug"]):
                self.assertEqual(set(e["mentions"]), set(e["characters"]))


if __name__ == "__main__":
    unittest.main(verbosity=2)
