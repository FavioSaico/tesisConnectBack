from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CategoriaPublicacionModel(Base):
    __tablename__ = "categorias_publicacion"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(50))