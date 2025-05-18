from fastapi import FastAPI
from src.presentation.routes import router

app = FastAPI()
app.include_router(router)
