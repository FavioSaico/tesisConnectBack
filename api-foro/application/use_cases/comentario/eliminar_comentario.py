class EliminarComentarioUseCase:
    def __init__(self, comentario_repo):
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_comentario: int):
        eliminado = self.comentario_repo.eliminar(id_comentario)
        if not eliminado:
            raise ValueError("Comentario no encontrado")
        return True