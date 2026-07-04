# SkinSense AI 🩺
> AI-powered skin disease classifier built as a KTU final year group project.

## 🚀 Live Demo
- **Frontend:** https://skinsense-ai-eight.vercel.app
- **Backend API:** https://skinsense-ai-93p9.onrender.com
- **API Docs:** https://skinsense-ai-93p9.onrender.com/docs

## 📌 Status
✅ **Complete** — Fully deployed and working end to end.

## 🧠 What it does
Users upload a close-up photo of a skin condition → FastAPI 
backend preprocesses the image → MobileNetV2 model predicts 
the disease → React frontend displays the result with 
confidence score, description, severity, and recommendation.

## 🎯 Supported Conditions
| Disease | Severity |
|---|---|
| Melanoma | High |
| Nevus (Benign Mole) | Low |
| Basal Cell Carcinoma | Moderate |
| Eczema | Moderate |
| Normal | None |

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Backend | Python, FastAPI, TensorFlow, Pillow, Uvicorn |
| ML Model | MobileNetV2 transfer learning (~81% test accuracy) |
| Frontend | React, Tailwind CSS, Vite |
| Deployment | Render (backend), Vercel (frontend) |
| Version Control | GitHub |

## 📁 Project Structure
skinsense-ai/
├── backend/     → FastAPI backend + model integration
├── frontend/    → React + Tailwind CSS UI
├── model/       → MobileNetV2 training notebooks
├── docs/        → Deployment documentation
└── README.md

## 👥 Team
| Member | Role |
|---|---|
| Alby A Jose | Backend Lead — FastAPI, model integration, deployment |
| Anirudh RS | DevOps — Render/Vercel deployment, configuration |
| Felix Aby Thomas | Frontend — React UI, Tailwind CSS |
| B Ananthakrishnan | ML Engineer — MobileNetV2 training, evaluation |

## 🔌 API Reference
### POST /predict
Accepts an image file, returns prediction JSON.
Response:
{
  "disease": "eczema",
  "confidence": 48.02,
  "description": "A chronic skin condition...",
  "severity": "Moderate",
  "recommendation": "Use prescribed moisturizers..."
}

### GET /health
Returns { "status": "ok" }

## ⚠️ Disclaimer
SkinSense AI is for educational purposes only. 
Not a substitute for professional medical diagnosis or advice.
Always consult a licensed dermatologist.