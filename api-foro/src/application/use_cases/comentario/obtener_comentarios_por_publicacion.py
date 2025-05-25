from typing import List
from domain.repositories.repositorio_comentario import RepositorioComentario
from domain.repositories.repositorio_publicacion import RepositorioPublicacion
from application.mappers.comentario_mapper import entidad_a_DTO

class ObtenerComentariosPorPublicacionUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion, comentario_repo: RepositorioComentario):
        self.publicacion_repo = publicacion_repo
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_publicacion: int):
        if not self.publicacion_repo.obtener_por_id(id_publicacion):
            raise ValueError("La publicación no existe")
        comentarios_entidad = self.comentario_repo.obtener_por_publicacion(id_publicacion)
        comentarios_dto = [entidad_a_DTO(doc) for doc in comentarios_entidad ]
        return {
            "total": len(comentarios_dto),
            "comentarios": comentarios_dto
        }