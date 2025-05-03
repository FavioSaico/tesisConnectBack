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
        return self.db.query(User).filter(User.rol_tesista == 1).all()

    def _build_text_representation(self, user: User):
        # Combinar todos los campos posibles en un solo texto, reemplazando None por cadena vacía
        return " ".join([
            user.descripcion or "",
            user.linea_investigacion or "",
            # Aquí puedes agregar más campos si luego lo deseas
        ])

    def calculate_similarity(self, users, asesores):
        users_texts = [self._build_text_representation(user) for user in users]
        asesores_texts = [self._build_text_representation(asesor) for asesor in asesores]

        # TF-IDF vectorization
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix_users = vectorizer.fit_transform(users_texts)
        tfidf_matrix_asesores = vectorizer.transform(asesores_texts)

        return cosine_similarity(tfidf_matrix_users, tfidf_matrix_asesores)

    def update_rankings(self):

        # 1. Vaciar la tabla rankings sin eliminar su estructura
        self.db.execute(text("TRUNCATE TABLE rankings"))

        users = self.list_users()
        asesores = self.get_asesores()

        if not users or not asesores:
            return {"message": "No hay suficientes usuarios o asesores para calcular similitudes"}

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