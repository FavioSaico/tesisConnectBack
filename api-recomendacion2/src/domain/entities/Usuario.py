# src/domain/entities/usuario.py
from sqlalchemy import Column, Integer, Text
from src.infrastructure.db import Base

class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=True)
    linea_investigacion = Column(Text, nullable=True)
    rol_tesista = Column(Integer, default=0)
    rol_asesor = Column(Integer, default=0)

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.especialidades = []
        self.publicaciones = []