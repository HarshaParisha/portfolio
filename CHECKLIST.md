# Quick Deployment Checklist

## ✅ Pre-Deployment Checklist

- [ ] All code is committed to GitHub
- [ ] `.env.local` is NOT committed (check `.gitignore`)
- [ ] `.env.example` is committed with placeholder values
- [ ] All deployment config files are committed:
  - [ ] `railway.json`
  - [ ] `render.yaml`
  - [ ] `Dockerfile`
  - [ ] `.dockerignore`
  - [ ] `DEPLOYMENT.md`
  - [ ] `README.md`
- [ ] `next.config.ts` has `output: 'standalone'` for production
- [ ] All dependencies are in `package.json`
- [ ] Build works locally: `npm run build`

## 🚀 Deployment Steps

### Option 1: Railway (Fastest)
1. [ ] Go to [railway.app](https://railway.app)
2. [ ] Sign in with GitHub
3. [ ] New Project → Deploy from GitHub
4. [ ] Select `HarshaParisha/portfolio`
5. [ ] Add environment variables (copy from `.env.local`)
6. [ ] Deploy automatically starts
7. [ ] Add custom domain in Settings

### Option 2: Render (Free Forever)
1. [ ] Go to [render.com](https://render.com)
2. [ ] Sign in with GitHub
3. [ ] New Web Service
4. [ ] Connect `HarshaParisha/portfolio`
5. [ ] Render detects `render.yaml` automatically
6. [ ] Add environment variables
7. [ ] Create Web Service
8. [ ] Add custom domain in Settings

### Option 3: Vercel (Easiest)
1. [ ] Go to [vercel.com](https://vercel.com)
2. [ ] Sign in with GitHub
3. [ ] Import Project
4. [ ] Select `HarshaParisha/portfolio`
5. [ ] Add environment variables
6. [ ] Deploy
7. [ ] Add custom domain in Project Settings

## 🌐 Domain Setup (Hostinger)

1. [ ] Log into Hostinger
2. [ ] Go to Domains → Your .in domain
3. [ ] Click DNS/Nameservers
4. [ ] Add CNAME records from hosting platform:
   ```
   Type: CNAME
   Name: @
   Value: [from hosting platform]
   
   Type: CNAME
   Name: www
   Value: [from hosting platform]
   ```
5. [ ] Save and wait 5-60 minutes for DNS propagation

## 🔒 Environment Variables to Add

Copy these from your `.env.local` to hosting platform:

```
BREVO_SMTP_KEY=
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM_NAME=
SMTP_FROM_EMAIL=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_WHATSAPP_FROM=
YOUR_WHATSAPP_NUMBER=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
```

## ✅ Post-Deployment Testing

1. [ ] Visit your deployed URL
2. [ ] Test contact form (email sending)
3. [ ] Test WhatsApp integration
4. [ ] Check all pages load correctly
5. [ ] Test on mobile devices
6. [ ] Verify SSL certificate (https://)
7. [ ] Check browser console for errors

## 🎉 You're Live!

Your portfolio is now deployed and accessible at your custom domain!

---

**Need Help?** Check `DEPLOYMENT.md` for detailed instructions.
