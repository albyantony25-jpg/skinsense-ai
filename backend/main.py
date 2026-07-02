"""
SkinSense AI — Backend API
Built with FastAPI + TensorFlow MobileNetV2

Endpoints:
  GET  /health   → Health check
  POST /predict  → Skin disease prediction from image upload

Response format:
  {
    disease: str,
    confidence: float,
    description: str,
    severity: str,
    recommendation: str
  }

Author: Member 1 — Backend Lead
Project: SkinSense AI (KTU Final Year Group Project)
"""

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import io
import os
from PIL import Image
import numpy as np
import logging
import gdown

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Try to import tensorflow, handle gracefully if not available for any reason
try:
    import tensorflow as tf
except ImportError:
    tf = None
    logger.warning("TensorFlow could not be imported.")

app = FastAPI(title="SkinSense AI Backend")

# Add CORS middleware to allow frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
        "https://skinsense-ai.vercel.app",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Hardcoded disease info mapping
DISEASE_INFO = {
    0: {
        "disease": "Melanoma",
        "description": "A serious form of skin cancer that develops in melanocytes.",
        "severity": "High",
        "recommendation": "Seek immediate dermatologist consultation."
    },
    1: {
        "disease": "Nevus",
        "description": "A common benign mole that is usually harmless.",
        "severity": "Low",
        "recommendation": "Monitor for changes in size, shape, or color."
    },
    2: {
        "disease": "Basal Cell Carcinoma",
        "description": "The most common type of skin cancer, slow-growing.",
        "severity": "Moderate",
        "recommendation": "Schedule a dermatologist visit for evaluation."
    },
    3: {
        "disease": "Eczema",
        "description": "A chronic skin condition causing inflammation and itching.",
        "severity": "Moderate",
        "recommendation": "Use prescribed moisturizers and avoid known triggers."
    },
    4: {
        "disease": "Normal",
        "description": "No significant skin condition detected.",
        "severity": "None",
        "recommendation": "Maintain regular skincare routine."
    }
}

MODEL_PATH = "skin_model.h5"
GDRIVE_FILE_ID = "19GtydQkO73Xnx5kyzwZZbBIymhN4am90"

model = None

def download_model():
    if not os.path.exists(MODEL_PATH):
        print("⬇️ Model not found locally. Downloading from Google Drive...")
        try:
            gdown.download(
                id=GDRIVE_FILE_ID,
                output=MODEL_PATH,
                quiet=False,
                fuzzy=True
            )
            print("✅ Model downloaded successfully")
        except Exception as e:
            print(f"❌ Failed to download model: {e}")
    else:
        print("✅ Model already exists locally, skipping download")

@app.on_event("startup")
async def startup_event():
    global model
    download_model()
    if os.path.exists(MODEL_PATH):
        try:
            model = tf.keras.models.load_model(
                MODEL_PATH,
                compile=False,
                safe_mode=False
            )
            print("✅ Model loaded successfully into memory")
        except Exception as e:
            print(f"❌ Model load failed: {e}")
            model = None
    else:
        print("❌ Model file not found after download attempt")
        model = None

@app.get("/health")
async def health_check():
    """
    Simple health check endpoint returning status.
    """
    return {"status": "ok"}

def preprocess_image(image_bytes):
    """
    Preprocess image for the model.
    - Resize to 224x224
    - Normalize to [0, 1]
    - Expand dims for batch
    """
    try:
        # Open image using Pillow
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert to RGB in case of RGBA/Grayscale
        if image.mode != "RGB":
            image = image.convert("RGB")
            
        # Resize image to exactly 224x224
        image = image.resize((224, 224))
        
        # Convert to numpy array
        img_array = np.array(image)
        
        # Normalize pixel values
        img_array = img_array.astype('float32') / 255.0
        
        # Expand dimensions to create a batch of 1: (1, 224, 224, 3)
        img_batch = np.expand_dims(img_array, axis=0)
        
        return img_batch
    except Exception as e:
        logger.error("Image preprocessing failed: %s", str(e))
        raise ValueError("Invalid image format or corrupted image.")

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    """
    Predict skin disease from uploaded image.
    Accepts an image file and returns prediction JSON.
    """
    logger.info(f"📥 Received prediction request: {file.filename}")
    
    # Check if the uploaded file is an image of correct type
    allowed_types = ["image/jpeg", "image/png", "image/webp"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a JPEG, PNG, or WebP image.")
    
    try:
        contents = await file.read()
        
        if not contents:
            raise HTTPException(status_code=400, detail="Empty file provided.")
            
        # Validate file size (max 5MB)
        if len(contents) > 5 * 1024 * 1024:
            raise HTTPException(status_code=400, detail="File too large. Maximum size is 5MB.")
            
        try:
            # Preprocess the image
            img_batch = preprocess_image(contents)
        except Exception as e:
            logger.error("Preprocessing failed: %s", str(e))
            raise HTTPException(status_code=422, detail="Could not process image. Please try a different image.")
        
        if model is None:
            raise HTTPException(
                status_code=503,
                detail="Model not available. Please try again in a moment."
            )

        try:
            predictions = model.predict(img_batch)
            
            # Extract predicted class index and confidence
            predicted_class_idx = int(np.argmax(predictions[0]))
            confidence = float(np.max(predictions[0])) * 100.0
            
            # Safety check for unexpected model output
            if predicted_class_idx not in DISEASE_INFO:
                predicted_class_idx = 4 # default to Normal
                confidence = 0.0
        except Exception as e:
            logger.error("Model prediction failed: %s", str(e))
            raise HTTPException(status_code=500, detail="Prediction failed. Please try again.")
            
        # Get corresponding disease information
        info = DISEASE_INFO[predicted_class_idx]
        
        logger.info(f"✅ Prediction complete: {info['disease']} ({round(confidence, 2)}%)")
        
        return {
            "disease": info["disease"],
            "confidence": round(confidence, 2),
            "description": info["description"],
            "severity": info["severity"],
            "recommendation": info["recommendation"]
        }
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Error during prediction: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal server error during prediction.")
