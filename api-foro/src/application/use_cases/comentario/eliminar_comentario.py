from domain.repositories.repositorio_comentario import RepositorioComentario

class EliminarComentarioUseCase:
    def __init__(self, comentario_repo: RepositorioComentario):
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_comentario: str):
        eliminado = self.comentario_repo.eliminar(id_comentario)
        if not eliminado:
            raise ValueError("El comentario no existe")
        return {"mensaje": "Comentario eliminado correctamente"}