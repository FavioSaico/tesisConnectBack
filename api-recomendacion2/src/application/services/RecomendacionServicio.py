# src/application/services/RecomendacionServicio.py
from datetime import date
from sentence_transformers import SentenceTransformer, util
from src.domain.entities.Recomendacion import Recomendacion

class RecomendacionServicio:
    def __init__(self, repositorio):
        self.repositorio = repositorio
        self.model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')

    def calcular_y_guardar_recomendaciones(self, investigadores, tipo):
        fuente = [i for i in investigadores if (i.rolTesista if tipo == "tesista" else i.rolAsesor) == 1]
        objetivo = [i for i in investigadores if (i.rolAsesor if tipo == "tesista" else i.rolTesista) == 1]

        emb_fuente = self.model.encode([f.texto_completo() for f in fuente], convert_to_tensor=True)
        emb_objetivo = self.model.encode([o.texto_completo() for o in objetivo], convert_to_tensor=True)

        recomendaciones = []
        for i, emb_f in enumerate(emb_fuente):
            scores = util.cos_sim(emb_f, emb_objetivo)[0]
            for j, score in enumerate(scores):
                recomendaciones.append(Recomendacion(
                    fuente[i].id,
                    objetivo[j].id,
                    float(score),
                    date.today(),
                    tipo
                ))

        self.repositorio.guardar_recomendaciones(recomendaciones)

    def obtener_recomendaciones(self):
        return self.repositorio.obtener_recomendaciones()

    def obtener_recomendaciones_por_fecha(self, fecha):
        return self.repositorio.obtener_recomendaciones_por_fecha(fecha)

    def obtener_recomendaciones_por_tipo(self, tipo):
        return self.repositorio.obtener_recomendaciones_por_tipo(tipo)

    def obtener_recomendaciones_por_fecha_y_tipo(self, fecha, tipo):
        return self.repositorio.obtener_recomendaciones_por_fecha_y_tipo(fecha, tipo)