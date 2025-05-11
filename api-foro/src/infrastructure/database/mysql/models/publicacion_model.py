from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class PublicacionModel(Base):
    __tablename__ = "publicaciones"

    idPublicacion = Column(Integer, primary_key=True, index=True)
    idUsuario = Column(Integer)
    idCategoria = Column(Integer)
    titulo = Column(String(255))
    contenido = Column(String)
    fechaCreacion = Column(DateTime(timezone=True), nullable=False)
    visible = Column(Boolean, default=True)
    idEstado = Column(Integer)
    idComentarioRespuesta = Column(String, nullable=True)