@echo off
title Ayoola Damisile Portfolio Server
cd /d "%~dp0"
echo Starting local preview server...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1"
pause
