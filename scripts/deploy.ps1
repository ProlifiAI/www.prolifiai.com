# Deploys the Prolifi site to Vercel and attaches prolifiai.com.
#
# Requires a one-time `vercel login` on this machine. Run from the project folder:
#   powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1

$ErrorActionPreference = 'Stop'
Set-Location (Split-Path $PSScriptRoot -Parent)

# Trust the Windows certificate store (needed when antivirus inspects HTTPS)
$env:NODE_OPTIONS = '--use-system-ca'

function Vercel([string[]]$Arguments) {
  & npx.cmd --yes vercel@latest @Arguments
  if ($LASTEXITCODE -ne 0) { throw "vercel $($Arguments -join ' ') failed (exit $LASTEXITCODE)" }
}

if (-not (Test-Path .vercel\project.json)) {
  Write-Host "`n== Linking project 'prolifi-website' ==" -ForegroundColor Cyan
  Vercel @('link', '--yes', '--project', 'prolifi-website')
}

Write-Host "`n== Setting NEXT_PUBLIC_SITE_URL ==" -ForegroundColor Cyan
Vercel @('env', 'add', 'NEXT_PUBLIC_SITE_URL', 'production', '--value', 'https://www.prolifiai.com', '--force', '--yes')

Write-Host "`n== Deploying to production ==" -ForegroundColor Cyan
Vercel @('deploy', '--prod', '--yes')

Write-Host "`n== Adding domains ==" -ForegroundColor Cyan
foreach ($d in 'prolifiai.com', 'www.prolifiai.com') {
  & npx.cmd --yes vercel@latest domains add $d prolifi-website
}

Write-Host "`n== DNS records Vercel expects ==" -ForegroundColor Cyan
& npx.cmd --yes vercel@latest domains inspect prolifiai.com

Write-Host "`nDONE" -ForegroundColor Green
