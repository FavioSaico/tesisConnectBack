from typing import Optional
from domain.repositories.repositorio_categoria_publicacion import RepositorioCategoriaPublicacion
from application.mappers.categoria_publicacion_mapper import entidad_a_DTO

class ListarCategoriasUseCase:
    def __init__(self, categoria_repo: RepositorioCategoriaPublicacion):
        self.categoria_repo = categoria_repo

    def ejecutar(self):
        return [entidad_a_DTO(p) for p in self.categoria_repo.listar()]