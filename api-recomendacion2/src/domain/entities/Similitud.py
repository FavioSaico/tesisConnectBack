# src/domain/entities/Similitud.py
class Similitud:
    def __init__(self, idTesista: int, idAsesor: int, puntaje: float):
        self.idTesista = idTesista
        self.idAsesor = idAsesor
        self.puntaje = puntaje
