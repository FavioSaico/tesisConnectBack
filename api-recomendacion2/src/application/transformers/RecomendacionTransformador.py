# src/application/transformers/RecomendacionTransformador.py
from src.domain.entities.Recomendacion import Recomendacion

class RecomendacionTransformador:
    @staticmethod
    def transformar(recomendacion):
        return {
            'idInvestigador': recomendacion.idInvestigador,
            'idUsuarioRecomendado': recomendacion.idUsuarioRecomendado,
            'puntaje': recomendacion.puntaje,
            'fecha': recomendacion.fecha.isoformat(),  # convertir fecha a formato string
            'tipo': recomendacion.tipo
        }