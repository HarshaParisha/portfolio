# Portfolio - Harsha

A modern, production-ready Next.js portfolio with Firebase integration, email notifications, and WhatsApp messaging.

## 🚀 Live Demo

- **Production**: [Your Domain Here]
- **GitHub**: https://github.com/HarshaParisha/portfolio

## ✨ Features

- ⚡ Built with Next.js 15 + React 19
- 🎨 Styled with Tailwind CSS v4
- 🔥 Firebase integration for data storage
- 📧 Email notifications via Brevo (Sendinblue)
- 💬 WhatsApp integration via Twilio
- 🎭 Framer Motion animations
- 🎨 3D graphics with Three.js & React Three Fiber
- 📱 Fully responsive design
- 🔒 Production-ready security headers
- 🐳 Docker support
- ☁️ Cloud deployment ready (Railway, Render, Vercel)

## 📋 Tech Stack

### Frontend
- **Framework**: Next.js 15.4.3
- **UI Library**: React 19.1.0
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Icons**: Heroicons, React Icons

### Backend & Services
- **Database**: Firebase Firestore
- **Email**: Brevo (Sendinblue) SMTP
- **Messaging**: Twilio WhatsApp API
- **Authentication**: Firebase Auth

### Development
- **Language**: TypeScript
- **Linting**: ESLint
- **Package Manager**: npm

## 🛠️ Local Development

### Prerequisites
- Node.js 20.x or higher
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HarshaParisha/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` with your actual credentials:
   - Brevo SMTP credentials
   - Twilio WhatsApp credentials
   - Firebase configuration
   - Firebase Admin SDK credentials

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🚀 Deployment

This project is ready to deploy on multiple platforms. See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

### Quick Deploy Options:

#### Railway (Recommended)
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Render
1. Connect your GitHub repository
2. Render auto-detects `render.yaml`
3. Add environment variables
4. Deploy!

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Docker
```bash
# Build image
docker build -t portfolio-harsha .

# Run container
docker run -p 3000:3000 --env-file .env.local portfolio-harsha
```

## 🔒 Environment Variables

Required environment variables (see `.env.example` for template):

### Email Configuration (Brevo)
- `BREVO_SMTP_KEY`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `SMTP_FROM_NAME`
- `SMTP_FROM_EMAIL`

### WhatsApp Configuration (Twilio)
- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_WHATSAPP_FROM`
- `YOUR_WHATSAPP_NUMBER`

### Firebase Configuration
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`

### Firebase Admin SDK
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

## 📁 Project Structure

```
portfolio-harsha/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── page.tsx      # Home page
│   │   └── layout.tsx    # Root layout
│   ├── components/       # React components
│   ├── data/            # Static data
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   └── types/           # TypeScript types
├── public/              # Static assets
├── .env.example         # Environment variables template
├── .env.local          # Your local environment (DO NOT COMMIT)
├── Dockerfile          # Docker configuration
├── railway.json        # Railway deployment config
├── render.yaml         # Render deployment config
├── DEPLOYMENT.md       # Deployment guide
└── package.json        # Dependencies
```

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack

# Production
npm run build        # Build for production
npm start           # Start production server

# Code Quality
npm run lint        # Run ESLint
```

## 🔐 Security Features

- ✅ Security headers (HSTS, CSP, X-Frame-Options, etc.)
- ✅ Environment variables for sensitive data
- ✅ Firebase security rules
- ✅ HTTPS enforcement
- ✅ XSS protection
- ✅ CSRF protection

## 📝 License

This project is private and proprietary.

## 👤 Author

**Harsha Parisha**
- GitHub: [@HarshaParisha](https://github.com/HarshaParisha)
- Portfolio: [Your Domain]

## 🤝 Contributing

This is a personal portfolio project. If you find any bugs or have suggestions, please open an issue.

## 📧 Contact

For any inquiries, please use the contact form on the website or reach out via:
- Email: onestop.ai007@gmail.com
- WhatsApp: +91 7013706173

---

**Built with ❤️ using Next.js**
