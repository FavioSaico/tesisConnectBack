# src/main.py
from fastapi import FastAPI
from src.infrastructure.db import Base, engine
from src.presentation.controllers.RecomendacionController import router

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(router)