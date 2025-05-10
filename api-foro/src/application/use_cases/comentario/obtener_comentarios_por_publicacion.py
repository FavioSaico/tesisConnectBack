from typing import List
from domain.repositories.repositorio_comentario import RepositorioComentario
from domain.repositories.repositorio_publicacion import RepositorioPublicacion
from domain.entities.comentario import Comentario

class ObtenerComentariosPorPublicacionUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion, comentario_repo: RepositorioComentario):
        self.publicacion_repo = publicacion_repo
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_publicacion: int) -> List[Comentario] :
        if not self.publicacion_repo.obtener_por_id(id_publicacion):
            raise ValueError("Publicación no encontrada o no visible")
        return self.comentario_repo.obtener_por_publicacion(id_publicacion)