from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from src.domain.entities.Similitud import Similitud
from src.domain.entities.Usuario import Usuario
from src.domain.repositories.RepositorioRanking import RankingRepositorio

class RecomendacionServicio:
    def __init__(self, repositorio_ranking: RankingRepositorio):
        self.repositorio_ranking = repositorio_ranking

    def _build_text_representation(self, user: Usuario):
        return " ".join([
            user.descripcion or "",
            user.linea_investigacion or "",
            " ".join(user.especialidades or []),
            " ".join(user.publicaciones or [])
        ])

    def calcular_similitudes(self):
        # Obtener tesistas y asesores desde el repositorio
        tesistas = self.repositorio_ranking.obtenerTesistas()
        asesores = self.repositorio_ranking.obtenerAsesores()

        # Si no hay tesistas ni asesores, retornamos un mensaje
        if not tesistas or not asesores:
            return {"message": "No hay suficientes usuarios o asesores para calcular similitudes"}

        # Enriquecer los usuarios y asesores con especialidades y publicaciones
        self.repositorio_ranking.enriquecerUsuarios(tesistas)
        self.repositorio_ranking.enriquecerUsuarios(asesores)

        # Generar las representaciones de texto para los usuarios y asesores
        tesistas_texts = [self._build_text_representation(user) for user in tesistas]
        asesores_texts = [self._build_text_representation(asesor) for asesor in asesores]

        # Calcular la similitud de coseno entre los tesistas y los asesores
        vectorizer = TfidfVectorizer(stop_words="english")
        tfidf_matrix_tesistas = vectorizer.fit_transform(tesistas_texts)
        tfidf_matrix_asesores = vectorizer.transform(asesores_texts)

        similarities = cosine_similarity(tfidf_matrix_tesistas, tfidf_matrix_asesores)

        # Guardar los rankings calculados
        self.repositorio_ranking.limpiarRankings()

        for i, tesista in enumerate(tesistas):
            similarity_scores = similarities[i]
            asesor_matches = [
                {"asesor_id": asesores[j].id, "puntaje": float(similarity_scores[j])}
                for j in range(len(asesores))
            ]
            asesor_matches_sorted = sorted(asesor_matches, key=lambda x: x["puntaje"], reverse=True)

            for match in asesor_matches_sorted[:5]:
                self.repositorio_ranking.guardarRanking(Similitud(tesista.id, match["asesor_id"], match["puntaje"]))

        return {"message": "Rankings actualizados correctamente"}