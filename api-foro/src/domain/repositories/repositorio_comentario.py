from typing import List, Optional
from abc import ABC, abstractmethod
from domain.entities.comentario import Comentario

class RepositorioComentario(ABC):

    @abstractmethod
    def crear(self, comentario: Comentario) -> str:
        """Crea un comentario y lo guarda en la bd. Devuelve el id del comenntario"""
        pass

    @abstractmethod
    def obtener_por_id(self, id_comentario: str) -> Optional[Comentario]:
        """Devuelve el comentario con dicho id, solo si es visible."""
        pass

    @abstractmethod
    def eliminar(self, id_comentario: str) -> bool:
        """Elimina el comentario con dicho id. [.eliminar()]."""
        pass
    
    @abstractmethod
    def obtener_por_publicacion(self, id_publicacion: int) -> List[Comentario]:
        """Devuelve una lista de comentarios visibles de la publicacion."""
        pass