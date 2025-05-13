# src/infrastructure/repositories/RepositorioRecomendacionImpl.py
from sqlalchemy import desc, text
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
        if rec.idInvestigador != rec.idUsuarioRecomendado:  # Evita guardar auto-recomendaciones
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
    
    def obtener_usuarios_con_especialidades_y_publicaciones(self):
        # Tu implementación aquí
        query = """
        SELECT 
            u.id,
            u.descripcion,
            u.linea_investigacion AS lineaInvestigacion,
            u.rol_tesista AS rolTesista,
            u.rol_asesor AS rolAsesor,
            GROUP_CONCAT(e.nombre ORDER BY e.nombre) AS especialidades,
            GROUP_CONCAT(p.titulo ORDER BY p.anio_publicacion DESC) AS publicaciones
        FROM 
            usuario u
        LEFT JOIN 
            especialidad_usuario eu ON u.id = eu.id_usuario
        LEFT JOIN 
            especialidad e ON eu.id_especialidad = e.id
        LEFT JOIN 
            publicacion_usuario pu ON u.id = pu.id_usuario
        LEFT JOIN 
            publicacion p ON pu.id_publicacion = p.id
        GROUP BY 
            u.id, u.descripcion, u.linea_investigacion, u.rol_tesista, u.rol_asesor;
        """
        result = self.db.execute(text(query))
        usuarios = result.fetchall()

        usuarios_formateados = []
        for usuario in usuarios:
            usuarios_formateados.append({
                "id": usuario[0],
                "descripcion": usuario[1],
                "lineaInvestigacion": usuario[2],
                "rolTesista": usuario[3],
                "rolAsesor": usuario[4],
                "especialidades": usuario[5].split(",") if usuario[5] else [],
                "publicaciones": usuario[6].split(",") if usuario[6] else []
            })

        return usuarios_formateados
        
    def obtener_recomendaciones_por_id_y_fecha_asesor(self, id_investigador, fecha):
        rows = self.db.query(RecomendacionDB).filter(
            RecomendacionDB.id_investigador == id_investigador,
            RecomendacionDB.fecha == fecha,
            RecomendacionDB.tipo == 'asesor'
        ).order_by(desc(RecomendacionDB.puntaje)).all()
        return [Recomendacion(r.id_investigador, r.id_usuario_recomendado, r.puntaje, r.fecha, r.tipo) for r in rows]