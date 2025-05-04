# main.py
from fastapi import FastAPI
from src.presentation.controllers.ControladorUsuario import router as user_router

app = FastAPI()

app.include_router(user_router)