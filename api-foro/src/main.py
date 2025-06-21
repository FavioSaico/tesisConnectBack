from fastapi import FastAPI
from presentation.routes import publicaciones, filtros
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(root_path="/foro")

app.include_router(publicaciones.router)
app.include_router(filtros.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)