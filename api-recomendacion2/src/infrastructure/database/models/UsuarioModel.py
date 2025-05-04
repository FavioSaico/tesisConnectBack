# src/infrastructure/database/models/UsuarioModel.py
from sqlalchemy import Column, Integer, Boolean
from src.infrastructure.db import Base  # Este Base viene de declarative_base()

class UsuarioModel(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    rolTesista = Column(Boolean, default=False)
    rolAsesor = Column(Boolean, default=False)  