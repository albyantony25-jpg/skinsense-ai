# SkinSense AI 🩺
> AI-powered skin disease classifier built as a KTU final year group project.

## 🚀 Live Demo
- **Frontend:** https://skinsense-ai-seven.vercel.app
- **Backend API:** https://skinsense-ai-93p9.onrender.com
- **API Docs:** https://skinsense-ai-93p9.onrender.com/docs

## 📌 Status
✅ **Complete** — Fully deployed and working end to end.

## 🧠 What it does
Users upload a close-up photo of a skin condition → FastAPI 
backend preprocesses the image → MobileNetV2 model predicts 
the disease → React frontend displays the result with 
confidence score, description, severity, and recommendation.

## ⚠️ Important: Model Limitations
This is an **educational prototype**, not a diagnostic tool. See [model/README.md](model/README.md) for detailed performance metrics, including known limitations:
- **Melanoma precision: 39.6%** — frequently confuses melanoma with benign moles
- **Severely imbalanced dataset** — nevus class dominates (~6,700 samples vs. ~13 for normal skin)
- Always consult a licensed dermatologist for real medical advice.

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
```
skinsense-ai/
├── backend/     → FastAPI backend + model integration
├── frontend/    → React + Tailwind CSS UI
├── model/       → MobileNetV2 training notebooks
├── docs/        → Deployment documentation
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- **Backend:** Python 3.9+, pip
- **Frontend:** Node.js 16+, npm
- **ML Model:** TensorFlow, Keras (included in backend requirements)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Backend will run on `http://localhost:8000`
- API Docs available at `http://localhost:8000/docs`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173` (or the displayed Vite URL)

### Model Training (for reference)
See [model/README.md](model/README.md) for notebook-based training instructions.

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
```json
{
  "disease": "eczema",
  "confidence": 48.02,
  "description": "A chronic skin condition...",
  "severity": "Moderate",
  "recommendation": "Use prescribed moisturizers..."
}
```

### GET /health
Returns `{ "status": "ok" }`

## 📚 Documentation
See [docs/](docs/) for deployment guides and architecture notes.

## ⚠️ Disclaimer
SkinSense AI is for educational purposes only. 
Not a substitute for professional medical diagnosis or advice.
Always consult a licensed dermatologist.
