from typing import List, Optional
from abc import ABC, abstractmethod
from domain.entities.publicacion import Publicacion
from domain.entities.comentario import Comentario

class RepositorioPublicacion(ABC):

    @abstractmethod
    def listar(self, texto: Optional[str], id_categoria: Optional[int], id_estado: Optional[int]) -> List[Publicacion]:
        """Devuelve las publicaciones con esa categoria, si estan visible."""
        pass

    @abstractmethod
    def crear(self, publicacion: Publicacion) -> int:
        """Crea una publicacion y lo guarda en la bd. Devuelve el id de la publicacion"""
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
