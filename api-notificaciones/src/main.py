from fastapi import FastAPI
from src.presentation.routes import router
from src.infrastructure.pubsub_listener import iniciar_escucha
import threading

app = FastAPI()
app.include_router(router)

@app.on_event("startup")
def startup_event():
    listener_thread = threading.Thread(target=iniciar_escucha, daemon=True)
    listener_thread.start()