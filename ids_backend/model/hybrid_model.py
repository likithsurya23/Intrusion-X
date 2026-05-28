import torch
import torch.nn as nn
import os
from sklearn.preprocessing import StandardScaler, LabelEncoder
import torch.serialization

from django.conf import settings

# Standardize model path resolution using Django settings
MODEL_PATH = settings.MODEL_PATH
device = torch.device(settings.DEVICE)

# ======================================================
# Build ConvNeXt-Tiny Backbone (EXACT MATCH)
# ======================================================
class ConvNeXtTiny1D(nn.Module):
    def __init__(self, in_channels=1):
        super().__init__()
        self.stem = nn.Conv1d(
            in_channels, 64, kernel_size=7, stride=2, padding=3
        )
        self.block = nn.Sequential(
            nn.BatchNorm1d(64),
            nn.ReLU(),
            nn.Conv1d(
                64, 128, kernel_size=7, padding=3, groups=64
            ),
            nn.ReLU(),
            nn.AdaptiveAvgPool1d(1)
        )

    def forward(self, x):
        x = self.stem(x)
        x = self.block(x)
        return x.view(x.size(0), -1)   # → (batch, 128)

# ======================================================
# Build Lightweight CNN Feature Extractor (EXACT MATCH)
# ======================================================
class CNNFeatureExtractor(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv1d(1, 32, kernel_size=3, padding=1),
            nn.BatchNorm1d(32),
            nn.ReLU(),
            nn.MaxPool1d(2),

            nn.Conv1d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm1d(64),
            nn.ReLU(),
            nn.AdaptiveAvgPool1d(1)
        )

    def forward(self, x):
        x = self.conv(x)
        return x.view(x.size(0), -1)   # → (batch, 64)

# ======================================================
# Hybrid CNN + ConvNeXt-Tiny IDS (EXACT MATCH)
# ======================================================
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

# ======================================================
# Load checkpoint (MODEL + SCALER + ENCODER)
# ======================================================

# Allow trusted sklearn objects
torch.serialization.add_safe_globals([
    StandardScaler,
    LabelEncoder
])

checkpoint = torch.load(
    MODEL_PATH,
    map_location=device,
    weights_only=False
)

scaler = checkpoint["scaler"]
label_encoder = checkpoint["label_encoder"]

num_classes = len(label_encoder.classes_)

model = HybridIDS(num_classes=num_classes)
model.load_state_dict(checkpoint["model_state_dict"])
model.eval()
