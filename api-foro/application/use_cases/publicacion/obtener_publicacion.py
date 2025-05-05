class ObtenerPublicacionUseCase:
    def __init__(self, publicacion_repo):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, id_publicacion: int):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("Publicación no encontrada o no visible")
        return publicacion