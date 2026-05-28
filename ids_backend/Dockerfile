# Stage 1: Builder
FROM python:3.12-slim AS builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install uv
COPY --from=ghcr.io/astral-sh/uv:latest /uv /uvx /bin/

WORKDIR /app

# Install dependencies separately to leverage caching
COPY pyproject.toml uv.lock ./
RUN uv sync --frozen --no-cache --no-dev

# Stage 2: Runtime
FROM python:3.12-slim AS runtime

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

# Install runtime dependencies ONLY
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Copy the virtual environment and application code
COPY --from=builder /app/.venv /app/.venv
COPY . .

# Run collectstatic (using a dummy secret key)
RUN SECRET_KEY=build-time-only-secret python manage.py collectstatic --noinput

# Expose the application port
EXPOSE 8000

# Start Gunicorn with reduced worker count and increased timeout
CMD ["gunicorn", "ids_backend.wsgi:application", "--bind", "0.0.0.0:8000", "--workers", "1", "--timeout", "120"]
