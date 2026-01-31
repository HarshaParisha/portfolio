#!/bin/bash

# Quick Deploy Script for Portfolio
# This script helps you deploy to Railway, Render, or Vercel

echo "🚀 Portfolio Quick Deploy"
echo "========================="
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Error: Not a git repository!"
    echo "Run: git init"
    exit 1
fi

# Check for sensitive files
echo "🔍 Checking for sensitive files..."

if git ls-files | grep -q ".env.local"; then
    echo "⚠️  WARNING: .env.local is tracked by git!"
    echo "Run: git rm --cached .env.local"
    exit 1
fi

echo "✅ No sensitive files detected"
echo ""

# Show deployment options
echo "Choose your deployment platform:"
echo "1) Railway (Recommended - Fast & Easy)"
echo "2) Render (100% Free Forever)"
echo "3) Vercel (Best for Next.js)"
echo "4) Just push to GitHub (I'll deploy manually)"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        echo ""
        echo "📦 Deploying to Railway..."
        echo ""
        
        # Check if Railway CLI is installed
        if ! command -v railway &> /dev/null; then
            echo "Installing Railway CLI..."
            npm install -g @railway/cli
        fi
        
        echo "Logging into Railway..."
        railway login
        
        echo "Initializing project..."
        railway init
        
        echo "Deploying..."
        railway up
        
        echo ""
        echo "✅ Deployed to Railway!"
        echo "🌐 Add your environment variables in the Railway dashboard"
        echo "🔗 Connect your .in domain in Settings → Domains"
        ;;
        
    2)
        echo ""
        echo "📦 Deploying to Render..."
        echo ""
        echo "1. Go to https://render.com"
        echo "2. Sign in with GitHub"
        echo "3. New Web Service → Connect your repository"
        echo "4. Render will auto-detect render.yaml"
        echo "5. Add environment variables"
        echo "6. Click 'Create Web Service'"
        echo ""
        echo "📖 See DEPLOYMENT.md for detailed instructions"
        ;;
        
    3)
        echo ""
        echo "📦 Deploying to Vercel..."
        echo ""
        
        # Check if Vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        echo "Deploying to Vercel..."
        vercel --prod
        
        echo ""
        echo "✅ Deployed to Vercel!"
        echo "🌐 Add your environment variables in the Vercel dashboard"
        echo "🔗 Connect your .in domain in Project Settings → Domains"
        ;;
        
    4)
        echo ""
        echo "📤 Pushing to GitHub..."
        echo ""
        
        git add .
        
        read -p "Enter commit message (or press Enter for default): " commit_msg
        
        if [ -z "$commit_msg" ]; then
            commit_msg="🚀 Production-ready deployment with Railway/Render/Docker support"
        fi
        
        git commit -m "$commit_msg"
        git push origin main
        
        echo ""
        echo "✅ Pushed to GitHub!"
        echo ""
        echo "Next steps:"
        echo "1. Go to your hosting platform"
        echo "2. Connect your GitHub repository"
        echo "3. Add environment variables"
        echo "4. Deploy!"
        echo ""
        echo "📖 See DEPLOYMENT.md for platform-specific instructions"
        ;;
        
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🎉 Done!"
echo ""
echo "📚 Documentation:"
echo "  - DEPLOYMENT.md - Detailed deployment guide"
echo "  - CHECKLIST.md - Quick deployment checklist"
echo "  - DEPLOYMENT-SUMMARY.md - Overview of all changes"
