from sqlalchemy import desc
from datetime import date
from src.infrastructure.db import SessionLocal
from src.domain.repositories.RepositorioRecomendacion import RepositorioRecomendacion
from src.domain.entities.Recomendacion import Recomendacion
from src.infrastructure.models.RecomendacionDB import RecomendacionDB

class RepositorioRecomendacionImpl(RepositorioRecomendacion):
    def __init__(self):
        self.db = SessionLocal()

    def guardar_recomendaciones(self, recomendaciones):
        for rec in recomendaciones:
            self.db.add(RecomendacionDB(
                id_investigador=rec.idInvestigador,
                id_usuario_recomendado=rec.idUsuarioRecomendado,
                puntaje=rec.puntaje,
                fecha=rec.fecha,
                tipo=rec.tipo
            ))
        self.db.commit()

    def eliminar_por_fecha_y_tipo(self, fecha, tipo):
        self.db.query(RecomendacionDB).filter(
            RecomendacionDB.fecha == fecha,
            RecomendacionDB.tipo == tipo
        ).delete()
        self.db.commit()

    def obtener_recomendaciones(self):
        rows = self.db.query(RecomendacionDB).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]

    def obtener_recomendaciones_por_id_y_fecha(self, id_investigador, fecha):
        rows = self.db.query(RecomendacionDB).filter(
            RecomendacionDB.id_investigador == id_investigador,
            RecomendacionDB.fecha == fecha
        ).order_by(desc(RecomendacionDB.puntaje)).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]

    def obtener_recomendaciones_por_id(self, id_investigador):
        rows = self.db.query(RecomendacionDB).filter(
            RecomendacionDB.id_investigador == id_investigador
        ).order_by(desc(RecomendacionDB.puntaje)).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]