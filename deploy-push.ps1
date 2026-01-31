# Git Push Script for Portfolio Deployment
# This script helps you safely push your code to GitHub

Write-Host "🚀 Portfolio Deployment - Git Push Helper" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ Error: Not a git repository!" -ForegroundColor Red
    Write-Host "Run: git init" -ForegroundColor Yellow
    exit 1
}

# Check for sensitive files
Write-Host "🔍 Checking for sensitive files..." -ForegroundColor Yellow

$sensitiveFiles = @(
    ".env.local",
    ".env.production",
    ".env.development"
)

$foundSensitive = $false
foreach ($file in $sensitiveFiles) {
    if (Test-Path $file) {
        # Check if file is tracked by git
        $tracked = git ls-files $file
        if ($tracked) {
            Write-Host "⚠️  WARNING: $file is tracked by git!" -ForegroundColor Red
            Write-Host "   Run: git rm --cached $file" -ForegroundColor Yellow
            $foundSensitive = $true
        } else {
            Write-Host "✅ $file is properly ignored" -ForegroundColor Green
        }
    }
}

if ($foundSensitive) {
    Write-Host ""
    Write-Host "❌ Please remove sensitive files from git tracking first!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "✅ No sensitive files detected in git tracking" -ForegroundColor Green
Write-Host ""

# Show current status
Write-Host "📊 Current Git Status:" -ForegroundColor Cyan
git status --short

Write-Host ""
Write-Host "📝 Files to be committed:" -ForegroundColor Cyan
Write-Host "  ✓ .env.example (template)" -ForegroundColor Green
Write-Host "  ✓ railway.json (Railway config)" -ForegroundColor Green
Write-Host "  ✓ render.yaml (Render config)" -ForegroundColor Green
Write-Host "  ✓ Dockerfile (Docker config)" -ForegroundColor Green
Write-Host "  ✓ .dockerignore" -ForegroundColor Green
Write-Host "  ✓ DEPLOYMENT.md (deployment guide)" -ForegroundColor Green
Write-Host "  ✓ README.md (updated)" -ForegroundColor Green
Write-Host "  ✓ next.config.ts (production-ready)" -ForegroundColor Green
Write-Host "  ✓ All source code" -ForegroundColor Green
Write-Host ""

# Ask for confirmation
$confirm = Read-Host "Do you want to proceed with git add, commit, and push? (y/n)"

if ($confirm -ne "y") {
    Write-Host "❌ Aborted by user" -ForegroundColor Yellow
    exit 0
}

# Get commit message
Write-Host ""
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"

if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "🚀 Production-ready deployment with Railway/Render/Docker support"
}

Write-Host ""
Write-Host "📦 Adding files to git..." -ForegroundColor Cyan
git add .

Write-Host "💾 Committing changes..." -ForegroundColor Cyan
git commit -m "$commitMsg"

Write-Host "🌐 Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🎉 Next Steps:" -ForegroundColor Cyan
    Write-Host "  1. Go to your hosting platform (Railway/Render/Vercel)" -ForegroundColor White
    Write-Host "  2. Connect your GitHub repository" -ForegroundColor White
    Write-Host "  3. Add environment variables from .env.local" -ForegroundColor White
    Write-Host "  4. Deploy!" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 See DEPLOYMENT.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Push failed! Check the error above." -ForegroundColor Red
    Write-Host "💡 Tip: Make sure you have set up your remote:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/HarshaParisha/portfolio.git" -ForegroundColor White
}
