#!/usr/bin/env python3
"""Quality check for the site. Run from the repository root: python3 tools/check_site.py

Checks that every local file referenced by the pages exists, every in-page link
points to an existing id, each page has exactly one h1, and no em dashes appear
in the visible text. Exits with status 1 on failure.
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
problems = []
for page in ("index.html", "privacy.html"):
    html = (ROOT / page).read_text(encoding="utf-8")
    for ref in re.findall(r'(?:src|href)="([^"#:?]+)"', html):
        if not (ROOT / ref).exists():
            problems.append(f"{page}: missing file {ref}")
    ids = set(re.findall(r'\sid="([^"]+)"', html))
    for anchor in set(re.findall(r'href="#([^"]+)"', html)):
        if anchor not in ids:
            problems.append(f"{page}: broken in-page link #{anchor}")
    if len(re.findall(r"<h1[ >]", html)) != 1:
        problems.append(f"{page}: expected exactly one h1")
for name in ("index.html", "privacy.html", "assets/js/main.js"):
    if "—" in (ROOT / name).read_text(encoding="utf-8"):
        problems.append(f"em dash found in {name}")
css = (ROOT / "assets/css/main.css").read_text(encoding="utf-8")
for ref in re.findall(r'url\("\.\./([^"]+)"\)', css):
    if not (ROOT / "assets" / ref).exists():
        problems.append(f"main.css: missing {ref}")
if problems:
    print("\n".join(problems))
    sys.exit(1)
print("All checks passed.")
