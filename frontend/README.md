# SkinSense AI — Frontend

React + Vite + Tailwind CSS UI for the SkinSense AI skin disease classifier.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm

### Installation & Development
```bash
npm install
npm run dev
```
Frontend will start on `http://localhost:5173`

### Build for Production
```bash
npm run build
```
Production-optimized files go to the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure
```
frontend/
├── src/
│   ├── components/     → React components (form, results, etc.)
│   ├── pages/          → Page views
│   ├── App.jsx         → Main app entry
│   ├── index.css       → Tailwind CSS imports
│   └── main.jsx        → React entry point
├── public/             → Static assets
├── package.json        → Dependencies & scripts
├── vite.config.js      → Vite configuration
└── tailwind.config.js  → Tailwind CSS configuration
```

## 🎨 Styling
This project uses **Tailwind CSS** for utility-first styling. Edit `src/index.css` to customize Tailwind directives or add custom styles.

## 🔧 Environment Variables
Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:8000
```
For production, update with your deployed backend URL (e.g., `https://skinsense-ai-93p9.onrender.com`).

## 🌐 Deployment
Deployed to **Vercel**. Push to `main` branch to trigger automatic deploys.
- Live: https://skinsense-ai-eight.vercel.app

## 🛠️ Stack
- **React 18** — UI framework
- **Vite** — Next-gen build tool
- **Tailwind CSS** — Utility-first CSS framework
- **HMR** — Hot Module Replacement for instant dev feedback

## 📖 Additional Resources
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- See main [README.md](../README.md) for full project overview
