from domain.repositories.repositorio_publicacion import RepositorioPublicacion

class EliminarPublicacionUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, id_publicacion: int):
        eliminado = self.publicacion_repo.eliminar(id_publicacion)
        if not eliminado:
            raise ValueError("La publicación no existe")
        return {"mensaje": "Publicación eliminada correctamente"}