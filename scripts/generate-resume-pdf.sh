#!/usr/bin/env bash
# Compile resume/resume.tex and copy the 1-page PDF to public/.
# Not part of pnpm run build (Cloudflare builds do not install TeX Live).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
RESUME_DIR="$ROOT/resume"
OUT_PDF="$ROOT/public/Divanshu_Chauhan_Resume.pdf"

if ! command -v pdflatex >/dev/null 2>&1; then
  echo "pdflatex not found. Install TeX Live (texlive-latex-extra) or compile on Overleaf." >&2
  exit 1
fi

cd "$RESUME_DIR"
pdflatex -interaction=nonstopmode -halt-on-error resume.tex >/dev/null
pdflatex -interaction=nonstopmode -halt-on-error resume.tex >/dev/null

pages="$(pdfinfo resume.pdf 2>/dev/null | awk '/^Pages:/{print $2}')"
if [[ "$pages" != "1" ]]; then
  echo "Resume rendered to ${pages:-unknown} page(s); expected exactly 1." >&2
  exit 1
fi

cp resume.pdf "$OUT_PDF"
echo "Wrote $OUT_PDF (${pages} page)"
