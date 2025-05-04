from sqlalchemy.orm import Session
from sqlalchemy import text
from src.domain.entities.Similitud import Similitud
from src.domain.entities.Usuario import Usuario
from src.domain.repositories.RepositorioRanking import RankingRepositorio

class RepositorioRankingImpl(RankingRepositorio):
    def __init__(self, db: Session):
        self.db = db

    def obtenerTesistas(self):
        return self.db.query(Usuario).filter(Usuario.rol_tesista == 1).all()

    def obtenerAsesores(self):
        return self.db.query(Usuario).filter(Usuario.rol_asesor == 1).all()

    def limpiarRankings(self):
        self.db.execute(text("TRUNCATE TABLE rankings"))
        self.db.commit()

    def guardarRanking(self, similitud: Similitud):
        self.db.execute(text(""" 
            INSERT INTO rankings (id_usuario, id_asesor, puntaje)
            VALUES (:id_usuario, :id_asesor, :puntaje)
        """), {
            "id_usuario": similitud.idTesista,
            "id_asesor": similitud.idAsesor,
            "puntaje": similitud.puntaje
        })
        self.db.commit()

    def obtenerRankings(self):
        resultados = self.db.execute(text(""" 
            SELECT id_usuario AS id_tesista, id_asesor, puntaje
            FROM rankings
            WHERE id_usuario <> id_asesor
            ORDER BY id_usuario, puntaje DESC
        """)).fetchall()

        return [Similitud(row[0], row[1], row[2]) for row in resultados]

    def enriquecerUsuarios(self, usuarios):
        for user in usuarios:
            # Obtener especialidades
            result = self.db.execute(text(""" 
                SELECT D.nombre FROM especialidad_usuario C
                JOIN especialidad D ON C.id_especialidad = D.id
                WHERE C.id_usuario = :id_usuario
            """), {"id_usuario": user.id})
            user.especialidades = [row[0] for row in result.fetchall()]

            # Obtener publicaciones
            result = self.db.execute(text(""" 
                SELECT F.titulo FROM publicacion_usuario E
                JOIN publicacion F ON E.id_publicacion = F.id
                WHERE E.id_usuario = :id_usuario
            """), {"id_usuario": user.id})
            user.publicaciones = [row[0] for row in result.fetchall()]