# SkinSense AI — Model (Member 2: ML Engineer)

## Status: Day 2 — final model trained and evaluated

`skin_model.h5` is the fine-tuned final version, trained in two phases (frozen warmup → fine-tuned top layers) with class weighting to handle dataset imbalance. **Test accuracy: ~81%.**

## Files
- `01_data_setup_and_quick_train.ipynb` — Day 1: dataset download, organizing into 5 class folders, quick pipeline test
- `02_full_training_and_eval.ipynb` — Day 2: full two-phase training, fine-tuning, evaluation
- `skin_model.h5` — **final trained model** (replaces Day 1's quick-test version)
- `confusion_matrix.png` — test set confusion matrix

## Dataset sources
No single Kaggle dataset has exactly our 5 target classes, so this combines:
- **HAM10000** (`kmader/skin-cancer-mnist-ham10000`) → melanoma, nevus, basal cell carcinoma
- **DermNet** (`shubhamgoel27/dermnet`) → eczema
- **Normal skin dataset** (`ahdasdwdasd/our-normal-skin`) → normal

## Model architecture
Input (224×224×3) → MobileNetV2 (ImageNet weights) → GlobalAveragePooling2D → Dense(128, relu) → Dropout(0.3) → Dense(5, softmax)

Training: Phase 1 — frozen MobileNetV2 base, 10 epochs (warmup). Phase 2 — unfroze last 30 MobileNetV2 layers, fine-tuned at a low learning rate (1e-5), 15 epochs. Class weights applied throughout to offset dataset imbalance (nevus heavily overrepresented vs. other classes).

## Test set performance

**Overall accuracy: ~81%** (811/1003 correct predictions)

| Class | Recall | Precision | Test samples |
|---|---|---|---|
| basal_cell_carcinoma | 82.7% | 51.2% | 52 |
| eczema | 99.4% | 100% | 155 |
| melanoma | 78.6% | 39.6% | 112 |
| nevus | 76.5% | 97.0% | 671 |
| normal | 100% | 92.9% | 13 |

See `confusion_matrix.png` for the full breakdown.

### Known limitations (be upfront about these in the demo)
- **Melanoma precision is low (39.6%)** — the model frequently predicts melanoma for what are actually nevus cases. This is the safer error direction for a screening tool (false alarm vs. missed cancer), but it means melanoma predictions need follow-up confirmation, not standalone diagnosis.
- **13 actual melanoma cases were misclassified as nevus** (recall 78.6%) — this is the more serious failure mode for a real skin-cancer tool, since it's a missed cancer case. Acceptable for an academic project, but worth stating clearly rather than letting it surface in Q&A.
- **`normal` class has only ~130 total images** (13 in test set) vs. nevus's ~6,700+ — severe class imbalance across the dataset as a whole, not just a tuning issue. Class weighting helps but doesn't fully solve it.
- **Nevus is heavily overrepresented**, which is why melanoma↔nevus confusion is the dominant error pattern.

This is a classroom prototype, not a diagnostic tool — frame it that way in the README/demo, not as a deployable medical product.

## Backend contract (for Member 1)
- **Input size:** 224×224 RGB
- **Normalization:** divide pixel values by 255 (scale to 0–1) before feeding to model
- **Class index order:**

```
{ "basal_cell_carcinoma": 0, "eczema": 1, "melanoma": 2, "nevus": 3, "normal": 4 }
```

> ⚠️ This is alphabetical-by-folder-name order, which is what Keras assigns by default. Confirm it matches your notebook's printed `train_gen.class_indices` output before wiring up the backend.

## Day 3 plan
- Support integration testing with Member 1
- Validate sample predictions end-to-end through the API
- Help finalize project-level README with these metrics
