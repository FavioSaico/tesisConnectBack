from domain.repositories.repositorio_publicacion import RepositorioPublicacion
from application.mappers.publicacion_mapper import entidad_a_DTO

class ObtenerPublicacionUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, id_publicacion: int):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("La publicación no existe")
        return entidad_a_DTO(publicacion)