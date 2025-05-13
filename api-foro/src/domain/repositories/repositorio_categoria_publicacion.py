from typing import List
from abc import ABC, abstractmethod
from domain.entities.categoria_publicacion import CategoriaPublicacion

class RepositorioCategoriaPublicacion(ABC):

    @abstractmethod
    def listar(self) -> List[CategoriaPublicacion]:
        """Devuelve todas las categorias de la bd"""
        pass