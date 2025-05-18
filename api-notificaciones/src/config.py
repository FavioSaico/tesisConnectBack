# src/config.py
import os

class Config:
    PORT = int(os.getenv("PORT", 8080))
    PUBSUB_EMULATOR_HOST = os.getenv("PUBSUB_EMULATOR_HOST", None)  # None para usar nube
    PUBSUB_PROJECT_ID = os.getenv("PUBSUB_PROJECT_ID", None)