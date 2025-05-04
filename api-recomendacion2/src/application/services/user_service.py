from sqlalchemy.orm import Session
from sqlalchemy import text
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from src.domain.entities.user_entity import User

class UserService:

    def __init__(self, db: Session):
        self.db = db

    def list_users(self):
        return self.db.query(User).all()

    def get_asesores(self):
        return self.db.query(User).filter(User.rol_asesor == 1).all()

    def enrich_users(self, users):
        for user in users:
            # Obtener especialidades
            result = self.db.execute(text("""
                SELECT D.nombre 
                FROM especialidad_usuario C
                JOIN especialidad D ON C.id_especialidad = D.id
                WHERE C.id_usuario = :id_usuario
            """), {"id_usuario": user.id})
            user.especialidades = [row[0] for row in result.fetchall()]

            # Obtener publicaciones
            result = self.db.execute(text("""
                SELECT F.titulo 
                FROM publicacion_usuario E
                JOIN publicacion F ON E.id_publicacion = F.id
                WHERE E.id_usuario = :id_usuario
            """), {"id_usuario": user.id})
            user.publicaciones = [row[0] for row in result.fetchall()]

    def _build_text_representation(self, user: User):
        return " ".join([
            user.descripcion or "",
            user.linea_investigacion or "",
            " ".join(user.especialidades or []),
            " ".join(user.publicaciones or [])
        ])

    def calculate_similarity(self, users, asesores):
        users_texts = [self._build_text_representation(user) for user in users]
        asesores_texts = [self._build_text_representation(asesor) for asesor in asesores]

        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix_users = vectorizer.fit_transform(users_texts)
        tfidf_matrix_asesores = vectorizer.transform(asesores_texts)

        return cosine_similarity(tfidf_matrix_users, tfidf_matrix_asesores)

    def update_rankings(self):
        self.db.execute(text("TRUNCATE TABLE rankings"))

        users = self.list_users()
        asesores = self.get_asesores()

        if not users or not asesores:
            return {"message": "No hay suficientes usuarios o asesores para calcular similitudes"}

        # Enriquecer con especialidades y publicaciones
        self.enrich_users(users)
        self.enrich_users(asesores)

        similarities = self.calculate_similarity(users, asesores)

        for i, user in enumerate(users):
            similarity_scores = similarities[i]
            asesor_matches = [
                {"asesor_id": asesores[j].id, "puntaje": float(similarity_scores[j])}
                for j in range(len(asesores))
            ]
            asesor_matches_sorted = sorted(asesor_matches, key=lambda x: x["puntaje"], reverse=True)

            for match in asesor_matches_sorted[:5]:
                self.db.execute(text("""
                    INSERT INTO rankings (id_usuario, id_asesor, puntaje)
                    VALUES (:id_usuario, :id_asesor, :puntaje)
                """), {
                    "id_usuario": user.id,
                    "id_asesor": match["asesor_id"],
                    "puntaje": match["puntaje"]
                })

        self.db.commit()
        return {"message": "Rankings actualizados correctamente"}