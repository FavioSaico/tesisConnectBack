from abc import ABC, abstractmethod
from typing import List
from src.domain.entities.Usuario import Usuario

class RankingRepositorio(ABC):

    @abstractmethod
    def obtenerTesistas(self) -> List[Usuario]:
        pass

    @abstractmethod
    def obtenerAsesores(self) -> List[Usuario]:
        pass

    @abstractmethod
    def limpiarRankings(self):
        pass

    @abstractmethod
    def guardarRanking(self, idTesista: int, idAsesor: int, puntaje: float):
        pass