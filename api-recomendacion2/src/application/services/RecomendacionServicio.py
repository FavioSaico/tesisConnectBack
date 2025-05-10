# src/application/services/RecomendacionServicio.py
from datetime import date
from sentence_transformers import SentenceTransformer, util
from src.domain.entities.Recomendacion import Recomendacion

class RecomendacionServicio:
    def __init__(self, repositorio):
        self.repositorio = repositorio
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

    def calcular_y_guardar_recomendaciones(self, investigadores):
        # Generar recomendaciones para tesistas
        fuente_tesistas = [i for i in investigadores if i.rolTesista == 1]
        objetivo_asesores = [i for i in investigadores if i.rolAsesor == 1]

        # Generar recomendaciones para asesores
        fuente_asesores = [i for i in investigadores if i.rolAsesor == 1]
        objetivo_tesistas = [i for i in investigadores if i.rolTesista == 1]

        hoy = date.today()

        # Eliminar anteriores por tipo
        self.repositorio.eliminar_por_fecha_y_tipo(hoy, "asesor")
        self.repositorio.eliminar_por_fecha_y_tipo(hoy, "tesista")

        recomendaciones = []

        # Calcular similitudes y crear recomendaciones para tesistas -> asesores
        recomendaciones += self.calcular_similitudes(fuente_tesistas, objetivo_asesores, "asesor")

        # Calcular similitudes y crear recomendaciones para asesores -> tesistas
        recomendaciones += self.calcular_similitudes(fuente_asesores, objetivo_tesistas, "tesista")

        # Guardar recomendaciones en el repositorio
        self.repositorio.guardar_recomendaciones(recomendaciones)

    def calcular_similitudes(self, fuente, objetivo, tipo):
        # Generar embeddings
        emb_fuente = self.model.encode([f.texto_completo() for f in fuente], convert_to_tensor=True)
        emb_objetivo = self.model.encode([o.texto_completo() for o in objetivo], convert_to_tensor=True)

        recomendaciones = []

        # Calcular similitudes
        for i, emb_f in enumerate(emb_fuente):
            scores = util.cos_sim(emb_f, emb_objetivo)[0]
            for j, score in enumerate(scores):
                # Usar el método estático de Recomendacion para crear la recomendación
                recomendaciones.append(Recomendacion.crear(
                    fuente[i].id,
                    objetivo[j].id,
                    float(score),
                    tipo  # Aquí el tipo es "asesor" o "tesista"
                ))

        return recomendaciones

    def obtener_recomendaciones(self):
        return self.repositorio.obtener_recomendaciones()

    def obtener_recomendaciones_por_id_y_fecha(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id_y_fecha(id_investigador, date.today())
    
    def obtener_recomendaciones_por_id(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id(id_investigador)