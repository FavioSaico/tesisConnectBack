from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from infrastructure.config.database import SessionLocal
from infrastructure.database.mysql.repositories.publicacion_repository import PublicacionRepository

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/publicaciones/")
def listar_publicaciones(db: Session = Depends(get_db)):
    repo = PublicacionRepository(db)
    publicaciones = repo.obtener_todas()
    return publicaciones