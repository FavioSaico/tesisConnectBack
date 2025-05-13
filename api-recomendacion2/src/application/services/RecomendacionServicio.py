from datetime import date
from sentence_transformers import SentenceTransformer, util
from src.domain.entities.Recomendacion import Recomendacion

class RecomendacionServicio:
    def __init__(self, repositorio):
        self.repositorio = repositorio
        self.model = None  # El modelo no se carga hasta que se necesite

    def _cargar_modelo(self):
        """Carga el modelo de SentenceTransformer solo cuando se necesita."""
        if self.model is None:
            from sentence_transformers import SentenceTransformer
            self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

    def calcular_y_guardar_recomendaciones(self, investigadores):
        hoy = date.today()

        # Eliminar recomendaciones previas
        self.repositorio.eliminar_por_fecha_y_tipo(hoy, "asesor")
        self.repositorio.eliminar_por_fecha_y_tipo(hoy, "tesista")

        recomendaciones = []

        # Todos los investigadores como fuente
        todos = investigadores

        #Tesistas como objetivo para recomendaciones tipo "tesista"
        objetivo_tesistas = [i for i in investigadores if i["rolTesista"] == 1]
        recomendaciones += self.calcular_similitudes(todos, objetivo_tesistas, "tesista")

        # Asesores como objetivo para recomendaciones tipo "asesor"
        objetivo_asesores = [i for i in investigadores if i["rolAsesor"] == 1]
        recomendaciones += self.calcular_similitudes(todos, objetivo_asesores, "asesor")

        # Guardar todas las recomendaciones generadas
        self.repositorio.guardar_recomendaciones(recomendaciones)

    def calcular_similitudes(self, fuente, objetivo, tipo):
        self._cargar_modelo()

        textos_fuente = [self._texto_completo(f) for f in fuente]
        textos_objetivo = [self._texto_completo(o) for o in objetivo]

        emb_fuente = self.model.encode(textos_fuente, convert_to_tensor=True)
        emb_objetivo = self.model.encode(textos_objetivo, convert_to_tensor=True)

        recomendaciones = []

        for i, emb_f in enumerate(emb_fuente):
            scores = util.cos_sim(emb_f, emb_objetivo)[0]
            top_k = min(10, len(scores))  # máximo 10 o menos si hay menos objetivos

            # Obtener índices de los top_k puntajes más altos
            top_indices = scores.argsort(descending=True)[:top_k]

            for j in top_indices:
                recomendaciones.append(Recomendacion.crear(
                    fuente[i]["id"],
                    objetivo[j]["id"],
                    float(scores[j]),
                    tipo
                ))

        return recomendaciones

    def _texto_completo(self, investigador):
        # Construir una cadena concatenando los textos relevantes
        descripcion = investigador.get("descripcion", "")
        linea = investigador.get("lineaInvestigacion", "")
        especialidades = " ".join(investigador.get("especialidades", []))
        publicaciones = " ".join(investigador.get("publicaciones", []))
        return f"{descripcion} {linea} {especialidades} {publicaciones}"

    def obtener_recomendaciones(self):
        return self.repositorio.obtener_recomendaciones()

    def obtener_recomendaciones_por_id_y_fecha(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id_y_fecha(id_investigador, date.today())
    
    def obtener_recomendaciones_por_id(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id(id_investigador)
    
    def obtener_recomendaciones_por_id_y_fecha_asesor(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id_y_fecha_asesor(id_investigador, date.today())

    def obtener_recomendaciones_por_id_y_fecha_tesista(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id_y_fecha_tesista(id_investigador, date.today())    
    