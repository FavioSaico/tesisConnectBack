from sqlalchemy import Column, Integer, Float, Date, String
from src.infrastructure.db import Base

class RecomendacionDB(Base):
    __tablename__ = "recomendaciones"

    id = Column(Integer, primary_key=True, index=True)
    id_investigador = Column(Integer)
    id_usuario_recomendado = Column(Integer)
    puntaje = Column(Float)
    fecha = Column(Date)
    tipo = Column(String(50))   # "tesista" o "asesor"