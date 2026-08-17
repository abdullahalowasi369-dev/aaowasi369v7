@echo off
python scripts\sync_content_from_docx.py career-assets\Website_Content_Guide.docx
if errorlevel 1 exit /b %errorlevel%
echo.
echo Copy synchronized. Review data\site-copy.json, then run npm run lint and npm run build.
