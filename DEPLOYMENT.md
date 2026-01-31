# 🚀 Deployment Guide - Portfolio Harsha

This guide will help you deploy your Next.js portfolio to production using free hosting platforms.

## 📋 Prerequisites

- GitHub account with your repository: https://github.com/HarshaParisha/portfolio
- All environment variables from `.env.local` (DO NOT commit this file!)

---

## 🎯 Option 1: Deploy to Railway (Recommended)

### Why Railway?
- ✅ Free tier: 500 hours/month, $5 credit
- ✅ Automatic deployments from GitHub
- ✅ Built-in SSL certificates
- ✅ Easy environment variable management
- ✅ Supports custom domains

### Steps:

1. **Sign up at Railway**
   - Go to [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `HarshaParisha/portfolio`

3. **Configure Environment Variables**
   - Go to your project → Variables tab
   - Add ALL variables from your `.env.local` file:
     ```
     BREVO_SMTP_KEY=...
     SMTP_HOST=smtp-relay.brevo.com
     SMTP_PORT=587
     SMTP_USER=...
     SMTP_PASS=...
     SMTP_FROM_NAME=...
     SMTP_FROM_EMAIL=...
     TWILIO_ACCOUNT_SID=...
     TWILIO_AUTH_TOKEN=...
     TWILIO_WHATSAPP_FROM=...
     YOUR_WHATSAPP_NUMBER=...
     NEXT_PUBLIC_FIREBASE_API_KEY=...
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
     NEXT_PUBLIC_FIREBASE_APP_ID=...
     NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=...
     FIREBASE_PROJECT_ID=...
     FIREBASE_CLIENT_EMAIL=...
     FIREBASE_PRIVATE_KEY=...
     ```

4. **Deploy**
   - Railway will automatically detect Next.js and deploy
   - Wait 3-5 minutes for build to complete
   - You'll get a URL like: `portfolio-production-xxxx.up.railway.app`

5. **Add Custom Domain (Your .in domain)**
   - Go to Settings → Domains
   - Click "Add Domain"
   - Enter your domain: `yourname.in`
   - Railway will provide DNS records
   - Add these records in Hostinger DNS settings:
     - Type: CNAME
     - Name: @ (or www)
     - Value: [provided by Railway]

---

## 🎯 Option 2: Deploy to Render

### Why Render?
- ✅ Completely free tier (no credit card required)
- ✅ Automatic SSL
- ✅ Custom domains supported
- ✅ Auto-deploy from GitHub

### Steps:

1. **Sign up at Render**
   - Go to [render.com](https://render.com)
   - Sign in with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `HarshaParisha/portfolio`

3. **Configure Build Settings**
   - Name: `portfolio-harsha`
   - Region: Singapore (closest to India)
   - Branch: `main`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance Type: Free

4. **Add Environment Variables**
   - Scroll to "Environment Variables"
   - Click "Add Environment Variable"
   - Add ALL variables from `.env.local` (same as Railway above)

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - You'll get a URL like: `portfolio-harsha.onrender.com`

6. **Add Custom Domain**
   - Go to Settings → Custom Domain
   - Add your `.in` domain
   - Update DNS in Hostinger with provided records

---

## 🎯 Option 3: Deploy to Vercel (Easiest)

### Why Vercel?
- ✅ Made by Next.js creators (zero config)
- ✅ Unlimited free deployments
- ✅ Fastest deployment time
- ✅ Best Next.js optimization

### Steps:

1. **Sign up at Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New..." → "Project"
   - Import `HarshaParisha/portfolio`

3. **Configure**
   - Vercel auto-detects Next.js settings
   - Add environment variables from `.env.local`

4. **Deploy**
   - Click "Deploy"
   - Done in 2-3 minutes!
   - Get URL: `portfolio-harsha.vercel.app`

5. **Add Custom Domain**
   - Go to Project Settings → Domains
   - Add your `.in` domain
   - Follow DNS instructions for Hostinger

---

## 🔒 Security Checklist

Before deploying, ensure:

- [ ] `.env.local` is in `.gitignore` (already done ✅)
- [ ] All secrets are added to hosting platform's environment variables
- [ ] Never commit API keys to GitHub
- [ ] Firebase security rules are properly configured
- [ ] CORS is configured for your domain

---

## 🌐 DNS Configuration for Hostinger

After choosing a hosting platform, update your Hostinger DNS:

1. Log into Hostinger
2. Go to Domains → Your .in domain → DNS/Nameservers
3. Add records provided by your hosting platform:

**For Railway/Render/Vercel:**
```
Type: CNAME
Name: @
Value: [provided by platform]
TTL: Automatic

Type: CNAME
Name: www
Value: [provided by platform]
TTL: Automatic
```

DNS propagation takes 5-60 minutes.

---

## 📊 Monitoring & Logs

- **Railway**: Dashboard → Deployments → View Logs
- **Render**: Dashboard → Logs tab
- **Vercel**: Project → Deployments → Function Logs

---

## 🆘 Troubleshooting

### Build Fails
- Check environment variables are set correctly
- Ensure all dependencies are in `package.json`
- Check build logs for specific errors

### 500 Error
- Check server logs
- Verify Firebase credentials
- Ensure all API keys are valid

### Domain Not Working
- Wait 30-60 minutes for DNS propagation
- Verify DNS records in Hostinger
- Check SSL certificate status

---

## 📝 Post-Deployment

1. Test all features:
   - Contact form (email sending)
   - WhatsApp integration
   - Firebase database
   - All pages load correctly

2. Monitor performance:
   - Check loading speed
   - Test on mobile devices
   - Verify SSL certificate

3. Set up analytics (optional):
   - Google Analytics
   - Vercel Analytics
   - Railway Metrics

---

## 🎉 You're Live!

Your portfolio is now production-ready and deployed! 

**Need help?** Check the platform-specific documentation:
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
