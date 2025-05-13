from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class EstadoPublicacionModel(Base):
    __tablename__ = "estados_publicacion"

    id = Column(Integer, primary_key=True, index=True)
    tipo = Column(String(50))