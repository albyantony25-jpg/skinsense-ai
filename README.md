# SkinSense AI 🩺

> **Status:** In development 🚧

**SkinSense AI** is an AI-powered skin disease classifier. Users can upload an image of a skin condition and receive a predicted diagnosis, powered by a **MobileNetV2** transfer learning model.

## 🛠 Tech Stack

- **Backend:** FastAPI
- **Machine Learning:** TensorFlow
- **Frontend:** React, Tailwind CSS
- **Deployment:** Railway (Backend), Vercel (Frontend)

## 👥 Team

Our project is being developed by a dedicated team of 4 members covering:
- **Backend Engineering**
- **Machine Learning (ML)**
- **Frontend Development**
- **DevOps**

## 🔌 API Reference

### `POST /predict`

Accepts an image file upload and returns a comprehensive diagnosis.

**Example Response:**
```json
{
  "disease": "Melanoma",
  "confidence": 94.32,
  "description": "A serious form of skin cancer that develops in melanocytes.",
  "severity": "High",
  "recommendation": "Seek immediate dermatologist consultation."
}
```