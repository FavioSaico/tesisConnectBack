# src/infrastructure/repositories/RepositorioRecomendacionImpl.py
from sqlalchemy import Column, Integer, Float, Date, String
from datetime import date
from src.infrastructure.db import Base, SessionLocal
from src.domain.repositories.RepositorioRecomendacion import RepositorioRecomendacion
from src.domain.entities.Recomendacion import Recomendacion

class RecomendacionDB(Base):
    __tablename__ = "recomendaciones"

    id = Column(Integer, primary_key=True, index=True)
    id_investigador = Column(Integer)
    id_usuario_recomendado = Column(Integer)
    puntaje = Column(Float)
    fecha = Column(Date)
    tipo = Column(String)  # "tesista" o "asesor"

class RepositorioRecomendacionImpl(RepositorioRecomendacion):
    def __init__(self):
        self.db = SessionLocal()

    def guardar_recomendaciones(self, recomendaciones):
        if not recomendaciones:
            return

        tipo = recomendaciones[0].tipo  # ✅ Esto faltaba
        hoy = date.today()

        # ✅ Eliminar solo las recomendaciones del día y de ese tipo
        self.db.query(RecomendacionDB).filter(
        RecomendacionDB.fecha == hoy,
        RecomendacionDB.tipo == tipo
        ).delete()

        for rec in recomendaciones:
            self.db.add(RecomendacionDB(
            id_investigador=rec.idInvestigador,
            id_usuario_recomendado=rec.idUsuarioRecomendado,
            puntaje=rec.puntaje,
            fecha=rec.fecha,
            tipo=rec.tipo
        ))

        self.db.commit()

    def obtener_recomendaciones(self):
        rows = self.db.query(RecomendacionDB).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]

    def obtener_recomendaciones_por_fecha(self, fecha):
        rows = self.db.query(RecomendacionDB).filter(RecomendacionDB.fecha == fecha).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]

    def obtener_recomendaciones_por_tipo(self, tipo):
        rows = self.db.query(RecomendacionDB).filter(RecomendacionDB.tipo == tipo).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]

    def obtener_recomendaciones_por_fecha_y_tipo(self, fecha, tipo):
        rows = self.db.query(RecomendacionDB).filter(RecomendacionDB.fecha == fecha, RecomendacionDB.tipo == tipo).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]