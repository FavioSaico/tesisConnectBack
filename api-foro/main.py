from fastapi import FastAPI
from interfaces.api.routes import publicaciones
from interfaces.api.routes import comentarios

app = FastAPI()

app.include_router(publicaciones.router)
app.include_router(comentarios.router)