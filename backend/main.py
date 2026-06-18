from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import io
import os
from PIL import Image
import numpy as np
import logging

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
    allow_origins=["*"],
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

# Global variables for the model
model = None
MODEL_PATH = "model/skin_model.h5"

@app.on_event("startup")
async def load_model():
    """
    Load the TensorFlow model on startup.
    Prints logs based on whether it succeeds or fails to find/load the model.
    """
    global model
    
    # Resolve the model path relative to this file
    base_dir = os.path.dirname(os.path.abspath(__file__))
    full_model_path = os.path.join(base_dir, MODEL_PATH)
    
    if tf is None:
        logger.warning("TensorFlow is not installed. Using mock model.")
        return

    if os.path.exists(full_model_path):
        try:
            model = tf.keras.models.load_model(full_model_path)
            logger.info("Model loaded successfully from %s", full_model_path)
        except Exception as e:
            logger.error("Failed to load model: %s. Using mock.", str(e))
    else:
        logger.warning("Model file not found at %s. Using mock.", full_model_path)

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
    # Check if the uploaded file is an image
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")
    
    try:
        contents = await file.read()
        
        if not contents:
            raise HTTPException(status_code=400, detail="Empty file provided.")
            
        # Preprocess the image
        img_batch = preprocess_image(contents)
        
        # If model is loaded, predict using the model
        if model is not None:
            predictions = model.predict(img_batch)
            
            # Extract predicted class index and confidence
            predicted_class_idx = int(np.argmax(predictions[0]))
            confidence = float(np.max(predictions[0])) * 100.0
            
            # Safety check for unexpected model output
            if predicted_class_idx not in DISEASE_INFO:
                predicted_class_idx = 4 # default to Normal
                confidence = 0.0
                
        else:
            # Mock response if model is not available
            logger.info("Model not found/loaded, returning mock prediction.")
            predicted_class_idx = 0 # Mocking Melanoma for demonstration
            confidence = 94.32
            
        # Get corresponding disease information
        info = DISEASE_INFO[predicted_class_idx]
        
        return {
            "disease": info["disease"],
            "confidence": round(confidence, 2),
            "description": info["description"],
            "severity": info["severity"],
            "recommendation": info["recommendation"]
        }
        
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        logger.error("Error during prediction: %s", str(e))
        raise HTTPException(status_code=500, detail="Internal server error during prediction.")
