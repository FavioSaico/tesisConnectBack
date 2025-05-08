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

        # Crear embeddings para tesistas y asesores
        emb_fuente_tesistas = self.model.encode([f.texto_completo() for f in fuente_tesistas], convert_to_tensor=True)
        emb_objetivo_asesores = self.model.encode([o.texto_completo() for o in objetivo_asesores], convert_to_tensor=True)

        emb_fuente_asesores = self.model.encode([f.texto_completo() for f in fuente_asesores], convert_to_tensor=True)
        emb_objetivo_tesistas = self.model.encode([o.texto_completo() for o in objetivo_tesistas], convert_to_tensor=True)

        recomendaciones = []

        # Calcular similitudes para tesistas -> asesores
        for i, emb_f in enumerate(emb_fuente_tesistas):
            scores = util.cos_sim(emb_f, emb_objetivo_asesores)[0]
            for j, score in enumerate(scores):
                recomendaciones.append(Recomendacion(
                    fuente_tesistas[i].id,
                    objetivo_asesores[j].id,
                    float(score),
                    date.today(),
                    "asesor"  # Aquí el tipo es "asesor" porque es el id_usuario_recomendado
                ))

        # Calcular similitudes para asesores -> tesistas
        for i, emb_f in enumerate(emb_fuente_asesores):
            scores = util.cos_sim(emb_f, emb_objetivo_tesistas)[0]
            for j, score in enumerate(scores):
                recomendaciones.append(Recomendacion(
                    fuente_asesores[i].id,
                    objetivo_tesistas[j].id,
                    float(score),
                    date.today(),
                    "tesista"  # Aquí el tipo es "tesista" porque es el id_usuario_recomendado
                ))

        self.repositorio.guardar_recomendaciones(recomendaciones)

    def obtener_recomendaciones(self):
        return self.repositorio.obtener_recomendaciones()
   
    def obtener_recomendaciones_por_id_y_fecha(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id_y_fecha(id_investigador, date.today())
    
    def obtener_recomendaciones_por_id(self, id_investigador):
        return self.repositorio.obtener_recomendaciones_por_id(id_investigador)