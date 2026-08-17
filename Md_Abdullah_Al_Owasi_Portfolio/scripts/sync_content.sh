#!/usr/bin/env sh
set -eu
python scripts/sync_content_from_docx.py career-assets/Website_Content_Guide.docx
printf '\nCopy synchronized. Review data/site-copy.json, then run npm run lint && npm run build.\n'
