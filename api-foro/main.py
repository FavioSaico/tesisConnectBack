from fastapi import FastAPI
from presentation.routes import publicaciones, comentarios

app = FastAPI()

app.include_router(publicaciones.router)
app.include_router(comentarios.router)