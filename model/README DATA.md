# SkinSense AI — Model (Member 2: ML Engineer)

## Status: Day 1 — quick pipeline test complete

This folder currently contains a **proof-of-pipeline** model. It trains and saves correctly, but was only trained for 3 epochs on a frozen MobileNetV2 base — accuracy is expected to be low. Day 2 will replace `skin_model.h5` with a properly trained version.

## Files
- `01_data_setup_and_quick_train.ipynb` — Colab notebook: dataset download, organizing into 5 class folders, train/val/test split, model build + quick training run
- `skin_model.h5` — trained model (Day 1 quick-test version)

## Dataset sources
No single Kaggle dataset has exactly our 5 target classes, so this combines:
- **HAM10000** (`kmader/skin-cancer-mnist-ham10000`) → melanoma, nevus, basal cell carcinoma
- **DermNet** (`shubhamgoel27/dermnet`) → eczema
- **Normal skin dataset** (`ahdasdwdasd/our-normal-skin`) → normal

## Model architecture
Input (224×224×3) → MobileNetV2 (frozen, ImageNet weights) → GlobalAveragePooling2D → Dense(128, relu) → Dropout(0.3) → Dense(5, softmax)

## Backend contract (for Member 1)
- **Input size:** 224×224 RGB
- **Normalization:** divide pixel values by 255 (scale to 0–1) before feeding to model
- **Class index order:** *(fill in from your notebook's printed `train_gen.class_indices` output before pushing — paste it here)*

```
{ "basal_cell_carcinoma": 0, "eczema": 1, "melanoma": 2, "nevus": 3, "normal": 4 }
```

> ⚠️ Confirm the above against your actual Colab output — Keras assigns indices alphabetically by folder name, so this should be correct, but verify before backend integration.

## Day 2 plan
- Retrain with more epochs and fine-tune some MobileNetV2 layers (unfreeze top layers)
- Check class balance, add augmentation if needed
- Evaluate on test set, generate confusion matrix
- Push final `skin_model.h5` to replace this version
