class MarcarPublicacionResueltaUseCase:
    def __init__(self, publicacion_repo):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, id_publicacion: int):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("Publicación no encontrada o no visible")

        if publicacion.idEstado == 2:  # ya está solucionada
            raise ValueError("La publicación ya está marcada como solucionada")

        actualizado = self.publicacion_repo.actualizar_estado(id_publicacion, nuevo_estado=2)
        if not actualizado:
            raise ValueError("No se pudo actualizar el estado")
        return True