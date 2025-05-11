from domain.repositories.repositorio_comentario import RepositorioComentario
from application.mappers.comentario_mapper import entidad_a_DTO

class ObtenerComentarioPorIdUseCase:
    def __init__(self, comentario_repo: RepositorioComentario):
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_comentario: str):
        if len(id_comentario) != 24 or not (comentario := self.comentario_repo.obtener_por_id(id_comentario)):
            raise ValueError("El comentario no existe")

        return entidad_a_DTO(comentario)