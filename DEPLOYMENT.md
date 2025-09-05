# Monza Tekstil - Industrial Fabric E-commerce

A modern, responsive fabric e-commerce application with industrial textile theme, built with React, Vite, and Tailwind CSS.

## 🚀 Features

- **Industrial Design** with dark theme and textile manufacturing imagery
- **Modern UI/UX** with Framer Motion animations
- **Responsive design** for all devices
- **Product catalog** with advanced filtering
- **Product details** with image galleries
- **Order form** with validation
- **Contact form** 
- **Multi-language support** ready
- **Static data** - no backend required

## 🛠️ Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion  
- **Form Handling:** React Hook Form + Zod
- **Routing:** React Router DOM
- **Icons:** Lucide React

## 📦 Installation & Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🌐 Deployment

### Vercel (Recommended)

#### Option 1: Connect GitHub Repository
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign up/login
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the Vite configuration
5. Build settings are pre-configured in `vercel.json`
6. Click "Deploy" - done! 🚀

#### Option 2: Direct Deploy via CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from your project directory
vercel

# Follow the prompts - first time will ask for setup
# Subsequent deploys: just run `vercel` again
```

#### Option 3: Drag & Drop (Simplest)
1. Build the project: `npm run build`
2. Go to [vercel.com](https://vercel.com)
3. Drag the `dist` folder to the Vercel dashboard
4. Your site is live instantly!

### Manual Deployment

```bash
# Build the project
npm run build

# Upload the `dist` folder to your hosting provider
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # Data services (API replacement)
├── lib/                # Utilities
└── ...

public/
├── data/               # Static JSON data
└── ...
```

## 🔧 Configuration

- **Static Data:** Located in `public/data/fabrics.json`
- **Build Config:** `vite.config.js`
- **Deployment:** `vercel.json`

## 🌍 Environment

- **Development:** http://localhost:5173
- **Production Preview:** http://localhost:4173

## 📝 Notes

- This is a **frontend-only** application with static data
- No backend server required
- Perfect for static hosting (Vercel, Netlify, etc.)
- Ready for self-hosting on any web server