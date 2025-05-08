from typing import List, Optional
from abc import ABC, abstractmethod
from domain.entities.publicacion import Publicacion

class RepositorioPublicacion(ABC):

    @abstractmethod
    def obtener_todas(self) -> List[Publicacion]:
        """Devuelve todas las publicaciones visibles."""
        pass

    @abstractmethod
    def crear(self, publicacion: Publicacion) -> Publicacion:
        """Crea una publicacion y lo guarda en la bd"""
        pass

    @abstractmethod
    def obtener_por_id(self, id_publicacion: int) -> Optional[Publicacion]:
        """Devuelve la publicacion con dicho id, solo si es visible."""
        pass

    @abstractmethod
    def eliminar(self, id_publicacion: int) -> bool:
        """Elimina la publicacion con dicho id. [.eliminar()]."""
        pass

    @abstractmethod
    def actualizar(self, actualizada: Publicacion) -> bool:
        """Remplaza los valores de la publicacion_db con los valores de la publicacion <actualizada>. (Excepto el idPublicacion)"""
        pass

