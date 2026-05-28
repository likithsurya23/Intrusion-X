#  IntrusionX - Lightweight Hybrid CNN & ConvNeXt-Tiny Intrusion Detection System (IDS) for IoT Networks

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.2.4-000000?logo=nextdotjs)
![Django](https://img.shields.io/badge/Django-5.1.2-092E20?logo=django)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)
![PyTorch](https://img.shields.io/badge/PyTorch-2.0%2B-EE4C2C?logo=pytorch)
![License](https://img.shields.io/badge/license-MIT-green)

**Full-Stack Dashboard for Hybrid CNN & ConvNeXt-Tiny Based Intrusion Detection**

[Features](#-features) • [Quick Start](#-quick-start) • [Architecture](#-architecture) • [API Docs](#-api-documentation)


</div>

---

## ✨ Features

### 🎯 Core IDS Features

* **Hybrid CNN + ConvNeXt-Tiny Model** – Combines fast local feature extraction (CNN) with powerful global feature learning (ConvNeXt-Tiny).
* **Lightweight Architecture** – Optimized for IoT environments with low latency and reduced computational cost (~28MB compressed, 0.0373M parameters).
* **High Accuracy Detection** – Effectively classifies traffic into *Normal* or one of 14 *Attack* types with 97.97% validation accuracy.
* **Single Prediction** – Predict intrusion for a single network traffic sample by submitting exactly 46 features.
* **Batch Prediction** – Upload and classify large datasets at once via CSV files.
* **Real-Time Inference** – Fast backend response suitable for live monitoring systems (~45ms latency).
* **Model Checkpoint Support** – Load trained models from `static/model/Hybrid_CNN_ConvNeXtTiny_Final.pth` or custom paths without retraining.

---

### 📊 Analytics & Monitoring

* **Traffic Visualization** – Graphical view of normal vs attack traffic using interactive charts.
* **Prediction Statistics** – Real-time metrics tracking total predictions, failure rates, and attack type class distribution.
* **Model Insights Page** – Dedicated section explaining Hybrid CNN & ConvNeXt-Tiny architecture and layers.
* **Dashboard Metrics** – Key IDS indicators (successes, failures, role access checks) shown in a professional dashboard layout.

---

### 🖥️ Frontend Features (`ids_frontend`)

* **Sidebar-Based Navigation** – Clean and professional navigation using a fully responsive `Navbar` + `Sidebar`.
* **Centralized Layout System** – `LayoutWrapper.jsx` manages structure consistency, page paddings, and footer states across all pages.
* **Dark/Light Theme Support** – Managed globally using `ThemeContext.js`.
* **Responsive Design** – Custom fluid grid specifically scaled down with compact overrides for mobile screens (< 768px).
* **Modular Page Design** – Separate pages for:
  * Landing Page
  * Dashboard / Admin Audits
  * Single Prediction Interface
  * Batch Prediction (CSV Upload)
  * Analytics & Chart Visualizations
  * Model Information
  * User Feedback System
  * About Page

---

### ⚙️ Backend Features (`ids_backend`)

* **RESTful API Design** – Clean API structure for token authentication, predictions, and auditing endpoints.
* **Model Inference Engine** – Loads trained models and scalers dynamically and handles batch inputs efficiently.
* **Checkpoint Management** – Flexible loading of model weights and preprocessors from configured directories.
* **Audit Trails & History** – Logs every authentication attempt and login detail (IP, user agent, timestamps) directly to the SQLite3 database.
* **Feedback Management** – REST API for user ticket submissions and administrator reply/resolving actions.

---
## 🏗️ Architecture

### 1. High-Level System Architecture
```mermaid
graph TD
    User([User / Admin]) <--> |Browser| FE[Next.js Frontend]
    FE <--> |REST API / JWT Auth| BE[Django REST Framework Backend]
    BE <--> |ORM| DB[(SQLite Database)]
    BE --> |Feature Vector| Scaler[StandardScaler Preprocessing]
    Scaler --> |Preprocessed Tensor| Model[PyTorch Hybrid Model]
    Model --> |CNN Path| CNN[1D CNN Feature Extractor]
    Model --> |ConvNeXt Path| ConvNeXt[1D ConvNeXt-Tiny Backbone]
    CNN --> |64 Features| Fusion[Feature Concatenation]
    ConvNeXt --> |128 Features| Fusion
    Fusion --> |192 Features| Head[Classification Head]
    Head --> Output[14 Attack Categories + Normal Traffic]
```

### 2. Project Structure

#### Backend (`ids_backend/`)
```
ids_backend/
├── api/                    # Django app for API endpoints
│   ├── migrations/         # Database migrations
│   ├── models.py           # LoginHistory and Feedback models
│   ├── views.py            # API request handlers
│   ├── serializers.py      # Serializers for prediction, history & feedback
│   └── urls.py             # Route mappings for views
├── model/                  # Machine Learning model scripts
│   ├── hybrid_model.py     # PyTorch model structure & load checkpoint
│   └── inference.py        # Prediction helpers
├── static/
│   └── model/              # PyTorch model checkpoints & configuration
│       └── Hybrid_CNN_ConvNeXtTiny_Final.pth
├── Train/                  # Training notebooks and raw weights
│   └── IDS_Checkpoints/    # Saved weights
└── ids_backend/            # Core Django configurations
    ├── settings.py         # App settings & JWT rules
    └── urls.py             # Main router
```

#### Frontend (`ids_frontend/`)
```
ids_frontend/
├── app/                    # Next.js App Router Pages
│   ├── (protected)/        # Auth-guarded folders
│   │   ├── admin/          # Admin audit history dashboard
│   │   ├── admin/feedback/ # Admin feedback ticket replies
│   │   ├── predict/        # Single prediction page
│   │   ├── batch/          # Batch CSV prediction page
│   │   └── feedback/       # User feedback page
│   ├── about/              # About IntrusionX page
│   ├── model-info/         # Model metrics and tree architecture
│   ├── login/              # User Sign In / Register
│   ├── admin-login/        # Admin portal Sign In
│   └── layout.jsx          # Root page metadata wrapper
├── components/             # Shared UI components
│   ├── LayoutWrapper/      # Centralized routing layouts
│   ├── Navbar/             # Responsive header navigation
│   └── Footer/             # Shared copyright footer (Likith D)
├── lib/                    # Shared context and services
│   ├── api/                # Axios configuration
│   └── auth/               # Auth provider and state hooks
└── hooks/                  # Custom helper hooks
```

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.12+**
- **Node.js 18+**
- **uv** (Recommended Python package manager)
- **SQLite3**

### Installation

**1. Clone the repository**
```bash
git clone <repository-url>
cd Smart-IDS
```

**2. Backend Setup**
```bash
cd ids_backend

# Create virtual env & install dependencies using uv
uv sync

# Configure environment variables
# Create a .env file inside ids_backend/
# Copy the structure from .env.example:
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
DEVICE=cpu

# Run migrations
.venv\Scripts\python.exe manage.py migrate
```

**3. Frontend Setup**
```bash
cd ../ids_frontend

# Install dependencies
npm install

# Configure API environment variable
# Create a .env.local file in ids_frontend/
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
```

**4. Run Development Servers**

**Backend (Django REST API):**
```bash
cd ../ids_backend
.venv\Scripts\python.exe manage.py runserver
```
✅ Backend running at: `http://localhost:8000`

**Frontend (Next.js):**
```bash
cd ../ids_frontend
npm run dev
```
✅ Frontend running at: `http://localhost:3000`

---

## 🔑 Credentials for Testing

- **👥 User Portal**: Register a new account on the `/login` page or log in with:
  - **Username/Email**: `user`
  - **Password**: `User@123`
- **🛡️ Administrator Portal**: Access the `/admin-login` page:
  - **Email**: `likithsurya555@gmail.com`
  - **Password**: `Admin@123`

---

## 📡 API Documentation

### 1. Prediction Endpoints (Protected - Require Bearer Token)

```http
POST /api/predict/
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json

{
    "features": [0,0,47,64,45.135,45.135,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,6216,592,592,592,0,592,83698590,9.5,34.409,0,0,0,141.55]
}

Response:
{
    "prediction": "Normal",
    "confidence": 0.9998,
    "timestamp": "2026-05-28T17:15:00Z"
}
```

```http
POST /api/batch-predict/
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: multipart/form-data

file: <CSV_FILE_CONTAINING_46_COLUMNS>

Response:
{
    "predictions": ["Normal", "DDoS-UDPFlood", "Normal", ...],
    "confidence_scores": [0.99, 0.94, 0.99, ...],
    "total_samples": 300,
    "malicious_count": 45,
    "normal_count": 255,
    "malicious_percentage": 15.0,
    "attack_distribution": {
        "DDoS-UDPFlood": 45
    }
}
```

---

## 📊 Unified Data Flow

```mermaid
sequenceDiagram
    actor User as User / Admin
    participant FE as Next.js Client
    participant BE as Django API
    participant PyTorch as Hybrid Model
    
    User->>FE: Initiate Prediction Request
    
    alt Single Prediction Flow
        User->>FE: Input 46 comma-separated features
        FE->>FE: Validate feature format & count (exactly 46)
        FE->>BE: POST /api/predict/ (Header: Bearer Token)
    else Batch Prediction Flow
        User->>FE: Upload CSV file containing packet flows
        FE->>FE: Verify file format
        FE->>BE: POST /api/batch-predict/ (Multipart Form Data)
    end
    
    BE->>BE: Authenticate Request (JWT)
    
    alt Single Prediction Processing
        BE->>BE: Load Scaler & Transform Single Feature Row
        BE->>PyTorch: Run Single-Row Inference
        PyTorch-->>BE: Classification & Confidence Score
        BE->>BE: Create Audit Log
        BE-->>FE: HTTP 200 (JSON Response)
        FE->>User: Display results, interactive gauges, & severity alerts
    else Batch Prediction Processing
        BE->>BE: Parse CSV and preprocess multiple feature arrays
        BE->>PyTorch: Execute Batch Inference (tensor stack)
        PyTorch-->>BE: Predictions & confidence arrays
        BE->>BE: Aggregate statistics (Attack rates, classifications)
        BE-->>FE: HTTP 200 (JSON Metrics Response)
        FE->>User: Render Recharts visualizations, history table & export reports
    end
```

---

## 🔧 Configuration

### Backend Environment Variables (`.env`)
```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost
DEVICE=cpu
MODEL_PATH=./model/Hybrid_CNN_ConvNeXtTiny_Final.pth
DATABASE_URL=postgres://postgres:postgres@127.0.0.1:5432/ids_db
```

### Frontend Environment Variables (`.env.local`)
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/
```

---

## 🤖 Model Integration

### Loading the Model
```python
# model/hybrid_model.py
import torch
import torch.nn as nn
from django.conf import settings

class HybridIDS(nn.Module):
    def __init__(self, num_classes):
        super().__init__()
        self.cnn = CNNFeatureExtractor()
        self.convnext = ConvNeXtTiny1D()
        self.classifier = nn.Sequential(
            nn.Linear(64 + 128, 128),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        f1 = self.cnn(x)
        f2 = self.convnext(x)
        fused = torch.cat((f1, f2), dim=1)
        return self.classifier(fused)

checkpoint = torch.load(settings.MODEL_PATH, map_location=torch.device(settings.DEVICE))
scaler = checkpoint["scaler"]
label_encoder = checkpoint["label_encoder"]
model = HybridIDS(num_classes=len(label_encoder.classes_))
model.load_state_dict(checkpoint["model_state_dict"])
model.eval()
```

---

## 📈 Performance Optimization

- **Pre-trained Weights**: Saved weights loaded in `.pth` structure along with fitting parameters (StandardScaler & LabelEncoder) inside a single checkpoint file.
- **CPU/GPU Compatibility**: Automatic device selection fallback (`cpu` vs `cuda`).
- **Asynchronous Data Visualization**: Interactive UI dashboard using standard `Recharts` library for client-side rendering.

---

## 🔒 Security Considerations

- **JWT Authentication**: Full SimpleJWT token rotation and access verification.
- **Audit Trails**: The backend records login attempts, including IP addresses, timestamps, and browser configurations.
- **Access Control Checkpoints**: Staff and superuser separation rules for viewing server audit details and responding to user feedback tickets.

---

## 📝 License

This project is licensed under the **MIT License**.

```
MIT License

Copyright (c) 2026 Likith D

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.
```

---

<div align="center">

**🔒 Secure Your IoT Networks with Intelligent Intrusion Detection**

**⭐ Star this repository if you find it useful for your IoT security projects!**

[⬆ Back to Top](#intrusionx---lightweight-hybrid-cnn--convnext-tiny-intrusion-detection-system-ids-for-iot-networks)

</div>
