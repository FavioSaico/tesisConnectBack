from datetime import date
from sentence_transformers import SentenceTransformer, util
from src.domain.entities.Recomendacion import Recomendacion

class RecomendacionServicio:
    def __init__(self, repositorio):
        self.repositorio = repositorio
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

    def calcular_y_guardar_recomendaciones(self, investigadores):
        # Filtrar por rol usando claves de diccionario
        fuente_tesistas = [i for i in investigadores if i["rolTesista"] == 1]
        objetivo_asesores = [i for i in investigadores if i["rolAsesor"] == 1]

        fuente_asesores = [i for i in investigadores if i["rolAsesor"] == 1]
        objetivo_tesistas = [i for i in investigadores if i["rolTesista"] == 1]

        hoy = date.today()

        # Eliminar anteriores por tipo
        self.repositorio.eliminar_por_fecha_y_tipo(hoy, "asesor")
        self.repositorio.eliminar_por_fecha_y_tipo(hoy, "tesista")

        recomendaciones = []

        # Calcular similitudes y crear recomendaciones
        recomendaciones += self.calcular_similitudes(fuente_tesistas, objetivo_asesores, "asesor")
        recomendaciones += self.calcular_similitudes(fuente_asesores, objetivo_tesistas, "tesista")

        # Guardar todas las recomendaciones generadas
        self.repositorio.guardar_recomendaciones(recomendaciones)

    def calcular_similitudes(self, fuente, objetivo, tipo):
        # Generar textos combinados para cada investigador
        textos_fuente = [self._texto_completo(f) for f in fuente]
        textos_objetivo = [self._texto_completo(o) for o in objetivo]

        # Embeddings con modelo
        emb_fuente = self.model.encode(textos_fuente, convert_to_tensor=True)
        emb_objetivo = self.model.encode(textos_objetivo, convert_to_tensor=True)

        recomendaciones = []

        for i, emb_f in enumerate(emb_fuente):
            scores = util.cos_sim(emb_f, emb_objetivo)[0]
            for j, score in enumerate(scores):
                recomendaciones.append(Recomendacion.crear(
                    fuente[i]["id"],
                    objetivo[j]["id"],
                    float(score),
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