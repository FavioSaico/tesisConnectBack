from typing import Optional, List
from domain.repositories.repositorio_publicacion import RepositorioPublicacion
from application.mappers.publicacion_mapper import entidad_a_DTO

class ListarPublicacionesUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, texto: Optional[List[str]], idCategoria: Optional[List[int]], idEstado: Optional[List[int]], orden: Optional[str]):
        return [entidad_a_DTO(p) for p in self.publicacion_repo.listar(texto, idCategoria, idEstado, orden)]