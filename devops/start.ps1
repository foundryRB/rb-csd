# cognitive-software-delivery - local native launcher (no Docker).
#
# Starts the Astro/Starlight dev server at http://localhost:4322 in its own
# PowerShell window with a descriptive title. First run installs npm deps if
# missing. The port (4322) is offset from Astro's default (4321) so this site
# and rc-docs can run side-by-side without colliding.
#
# Run by double-clicking start.bat, or:
#   powershell -ExecutionPolicy Bypass -File devops\start.ps1

$ErrorActionPreference = 'Stop'

$repo = Split-Path -Parent $PSScriptRoot

Write-Host '== cognitive-software-delivery (Astro Starlight, native) ==' -ForegroundColor Cyan

# Frontend deps (first run only).
if (-not (Test-Path (Join-Path $repo 'node_modules'))) {
    Write-Host 'First run: installing deps...'
    Push-Location $repo
    npm ci
    Pop-Location
}

Write-Host 'cognitive-software-delivery -> http://localhost:4322' -ForegroundColor Green
Start-Process pwsh -ArgumentList '-NoExit', '-Command',
    "`$Host.UI.RawUI.WindowTitle = 'CSD docs (Astro :4322)'; npm run dev -- --port 4322" `
    -WorkingDirectory $repo

Start-Sleep -Seconds 5
Start-Process 'http://localhost:4322'
Write-Host 'Started. Close the PowerShell window to stop.' -ForegroundColor Green
