from typing import Optional
from domain.repositories.repositorio_estado_publicacion import RepositorioEstadoPublicacion
from application.mappers.estado_publicacion_mapper import entidad_a_DTO

class ListarEstadosUseCase:
    def __init__(self, estado_repo: RepositorioEstadoPublicacion):
        self.estado_repo = estado_repo

    def ejecutar(self):
        return [entidad_a_DTO(e) for e in self.estado_repo.listar()]