from typing import List
from abc import ABC, abstractmethod
from domain.entities.estado_publicacion import EstadoPublicacion

class RepositorioEstadoPublicacion(ABC):

    @abstractmethod
    def listar(self) -> List[EstadoPublicacion]:
        """Devuelve todas las categorias de la bd"""
        pass