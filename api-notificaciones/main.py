# src/main.py
import os
import threading
from fastapi import FastAPI
from src.presentation.routes import router
from src.infrastructure.pubsub_listener import iniciar_escucha
from src.config.settings import settings  # ✅ usa la clase correcta

app = FastAPI()
app.include_router(router)

# Configura las variables de entorno para el emulador (solo si aplica)
if settings.ENV == "development" and settings.PUBSUB_EMULATOR_HOST:
    os.environ["PUBSUB_EMULATOR_HOST"] = settings.PUBSUB_EMULATOR_HOST
    print(f"⚙️ Emulador configurado en {settings.PUBSUB_EMULATOR_HOST}")

@app.on_event("startup")
def startup_event():
    listener_thread = threading.Thread(target=iniciar_escucha, daemon=True)
    listener_thread.start()

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8080))
    uvicorn.run("src.main:app", host="0.0.0.0", port=port)