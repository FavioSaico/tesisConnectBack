from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.infrastructure.db import SessionLocal
from src.application.services.user_service import UserService
from sqlalchemy import text

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/ranking")
def update_ranking(db: Session = Depends(get_db)):
    service = UserService(db)
    result = service.update_rankings()  # Actualizamos los rankings
    return result

@router.get("/ranking")
def get_ranking(db: Session = Depends(get_db)):
    results = db.execute(text("""
        SELECT A.ID AS ID_TESISTA, B.ID AS ID_ASESOR, D.PUNTAJE
        FROM rankings AS D
        JOIN usuarios AS A ON A.ID = D.ID_USUARIO
        JOIN usuarios AS B ON B.ID = D.ID_ASESOR
        WHERE A.ID <> B.ID
        ORDER BY A.ID, D.PUNTAJE DESC
    """)).fetchall()

    # Convertimos los resultados a diccionarios
    rankings = [
        {
            "id_tesista": row[0],
            "id_asesor": row[1],
            "puntaje": row[2]
        }
        for row in results
    ]

    return rankings