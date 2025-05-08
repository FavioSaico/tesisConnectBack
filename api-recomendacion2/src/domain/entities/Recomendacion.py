# src/domain/entities/Recomendacion.py
from datetime import date

class Recomendacion:
    def __init__(self, idInvestigador, idUsuarioRecomendado, puntaje, fecha, tipo):
        self.idInvestigador = idInvestigador
        self.idUsuarioRecomendado = idUsuarioRecomendado
        self.puntaje = puntaje
        self.fecha = fecha
        self.tipo = tipo  # "tesista" o "asesor"