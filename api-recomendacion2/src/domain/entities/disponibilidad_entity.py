from sqlalchemy import Column, Integer, String, Time, ForeignKey
from sqlalchemy.orm import relationship
from src.infrastructure.db import Base
from src.domain.entities.user_entity import User

class Disponibilidad(Base):
    __tablename__ = "disponibilidad"

    id = Column(Integer, primary_key=True, autoincrement=True)
    id_usuario = Column(Integer, ForeignKey("usuarios.id"))
    dia_semana = Column(String(20))
    fecha = Column(String(10))  # Usa formato de fecha YYYY-MM-DD
    hora_inicio = Column(Time)
    hora_fin = Column(Time)
    disponible = Column(Integer)  # 1: Disponible, 0: No disponible

    usuario = relationship("User", back_populates="disponibilidades")