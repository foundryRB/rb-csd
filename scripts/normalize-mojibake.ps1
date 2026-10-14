$ErrorActionPreference = 'Stop'

$scriptPath = Join-Path $PSScriptRoot 'normalize-mojibake.mjs'
if (-not (Test-Path $scriptPath)) {
    throw "Cannot find Node normalization script: $scriptPath"
}

node $scriptPath
if ($LASTEXITCODE -ne 0) {
    throw "normalize-mojibake.mjs failed with exit code $LASTEXITCODE"
}