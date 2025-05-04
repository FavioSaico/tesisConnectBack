# src/presentation/controllers/user_controller.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.infrastructure.db import SessionLocal
from src.infrastructure.repositories.RepositorioRankingImpl import RepositorioRankingImpl
from src.application.services.RecomendacionServicio import RecomendacionServicio

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/ranking")
def update_ranking(db: Session = Depends(get_db)):
    ranking_repo = RepositorioRankingImpl(db)
    servicio = RecomendacionServicio(ranking_repo)
    return servicio.calcular_similitudes()

@router.get("/ranking")
def get_ranking(db: Session = Depends(get_db)):
    ranking_repo = RepositorioRankingImpl(db)
    rankings = ranking_repo.obtenerRankings()  # Llamamos al repositorio

    return rankings