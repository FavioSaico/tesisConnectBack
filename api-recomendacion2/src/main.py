from fastapi import FastAPI
from src.presentation.controllers.user_controller import router as user_router

app = FastAPI()

# Incluimos el router de usuarios
app.include_router(user_router)