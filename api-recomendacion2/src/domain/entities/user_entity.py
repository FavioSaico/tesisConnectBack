from sqlalchemy import Column, Integer, String, Text
from src.infrastructure.db import Base

class User(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=True)
    linea_investigacion = Column(Text, nullable=True)
    rol_tesista = Column(Integer, default=0)
    rol_asesor = Column(Integer, default=0)  # Nuevo campo agregado

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        # Atributos no persistentes, útiles para evitar relaciones circulares
        self.especialidades = []
        self.publicaciones = []