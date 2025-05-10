# src/domain/entities/Recomendacion.py
from datetime import date

class Recomendacion:
    def __init__(self, idInvestigador, idUsuarioRecomendado, puntaje, fecha, tipo):
        self.idInvestigador = idInvestigador
        self.idUsuarioRecomendado = idUsuarioRecomendado
        self.puntaje = puntaje
        self.fecha = fecha
        self.tipo = tipo  # "tesista" o "asesor"

    @staticmethod
    def crear(idInvestigador, idUsuarioRecomendado, puntaje, tipo):
        """Método estático para crear una nueva recomendación"""
        return Recomendacion(
            idInvestigador=idInvestigador,
            idUsuarioRecomendado=idUsuarioRecomendado,
            puntaje=puntaje,
            fecha=date.today(),
            tipo=tipo
        )