from sqlalchemy import Column, Integer, String, Text
from src.infrastructure.db import Base

class User(Base):
    __tablename__ = "usuarios"
    
    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=True)
    linea_investigacion = Column(Text, nullable=True)
    rol_tesista = Column(Integer, default=0)  # 0: No es tesista, 1: Tesista