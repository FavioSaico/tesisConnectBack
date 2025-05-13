from fastapi import FastAPI
from presentation.routes import publicaciones, filtros

app = FastAPI(root_path="/foro")

app.include_router(publicaciones.router)
app.include_router(filtros.router)