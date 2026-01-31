# Portfolio - Harsha Parisha

> A modern, interactive portfolio showcasing my journey as a developer, leader, and market enthusiast.

[![Next.js](https://img.shields.io/badge/Next.js-15.4-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## ✨ Features

- **Interactive 3D Elements** - Powered by Three.js and React Three Fiber
- **Smooth Animations** - Framer Motion for seamless transitions
- **Real-time Stock Data** - Live market updates via Finnhub API
- **Contact Integration** - Email (Brevo) and WhatsApp (Twilio) notifications
- **Firebase Backend** - Real-time database and analytics
- **Fully Responsive** - Optimized for all devices

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/HarshaParisha/portfolio.git

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your credentials

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🛠️ Tech Stack

**Frontend**
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Three.js

**Backend & Services**
- Firebase (Firestore, Analytics)
- Brevo (Email)
- Twilio (WhatsApp)
- Finnhub (Stock Data)

## 📦 Deployment

Deploy to your favorite platform in minutes:

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/HarshaParisha/portfolio)

### Railway
```bash
railway login
railway init
railway up
```

### Render
Connect your repository at [render.com](https://render.com) - `render.yaml` is pre-configured.

**📖 Detailed deployment guide:** [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🔑 Environment Variables

Required variables (see `.env.example` for template):

```env
# Email (Brevo)
BREVO_SMTP_KEY=
SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587

# WhatsApp (Twilio)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
# ... (see .env.example for complete list)
```

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── lib/              # Utilities and services
│   └── data/             # Static content
├── public/               # Static assets
├── Dockerfile            # Docker configuration
├── railway.json          # Railway deployment
└── render.yaml           # Render deployment
```

## 🧪 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
npm run lint     # Run ESLint
```

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

**Harsha Parisha**

- GitHub: [@HarshaParisha](https://github.com/HarshaParisha)
- Email: onestop.ai007@gmail.com

---

<p align="center">Built with ❤️ using Next.js</p>
