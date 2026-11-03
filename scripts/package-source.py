#!/usr/bin/env python3
"""Package the complete frontend source without machine state or secrets."""
from pathlib import Path
import zipfile

root = Path(__file__).resolve().parents[1]
output = root / "artifacts" / "Trader-World-AI-Frontend.zip"
output.parent.mkdir(exist_ok=True)
include_files = [
    ".gitignore", "AGENTS.md", "README.md", "package.json", "package-lock.json",
    "tsconfig.json", "next.config.ts", "eslint.config.mjs",
]
include_dirs = ["src", "public", "docs", "scripts"]
paths = [root / name for name in include_files]
for directory in include_dirs:
    paths.extend(path for path in (root / directory).rglob("*") if path.is_file())

with zipfile.ZipFile(output, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as archive:
    for path in sorted(paths):
        if path.is_symlink():
            raise RuntimeError(f"Refusing to archive symlink: {path.relative_to(root)}")
        archive.write(path, Path(root.name) / path.relative_to(root))
with zipfile.ZipFile(output) as archive:
    failure = archive.testzip()
    if failure:
        raise RuntimeError(f"ZIP integrity failure: {failure}")
    print(f"Verified {len(archive.namelist())} files")
print(f"{output} ({output.stat().st_size:,} bytes)")
