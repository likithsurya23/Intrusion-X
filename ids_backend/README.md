# IDS Backend - Hybrid CNN & ConvNeXt-Tiny

The backend service for the Intrusion Detection System (IDS) designed for IoT Networks. It leverages a Hybrid CNN and ConvNeXt-Tiny model to provide high-accuracy real-time intrusion detection.

## Prerequisites

- **Python 3.12+**
- **uv** (Modern Python package manager)

## Installation

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone <repository-url>
   cd ids_backend
   ```

2. **Install dependencies using uv**:
   ```bash
   uv sync
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the `ids_backend` directory (copy from `.env.example` if available):
   ```env
   DJANGO_SECRET_KEY=your-secret-key-here
   DEBUG=True
   ALLOWED_HOSTS=127.0.0.1,localhost
   DEVICE=cpu
   ```

## Running the Server

### Development Mode
```bash
uv run python manage.py runserver
```

### Production Mode (Docker)
Ensure you are in the project root directory:
```bash
docker-compose up --build backend
```

## Model Information
The system uses a pre-trained model located at `static/model/Hybrid_CNN_ConvNeXtTiny_Final.pth`. Paths are configured automatically in `settings.py`.
