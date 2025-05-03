from fastapi import FastAPI
from interfaces.api.routes import publicaciones

app = FastAPI()

app.include_router(publicaciones.router)