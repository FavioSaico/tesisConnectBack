class ObtenerComentarioUseCase:
    def __init__(self, comentario_repo):
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_comentario: str):
        comentario = self.comentario_repo.obtener_por_id(id_comentario)
        if not comentario:
            raise ValueError("Comentario no encontrado o no visible")
        return comentario