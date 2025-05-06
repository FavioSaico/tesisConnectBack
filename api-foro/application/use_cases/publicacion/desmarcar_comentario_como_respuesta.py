from domain.services.servicio_foro_academico import ServicioForoAcademico
from domain.entities.publicacion import Publicacion

class DesmarcarComentarioComoRespuestaUseCase:
    def __init__(self, publicacion_repo):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, id_publicacion: int):
        publicacion: Publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("Publicación no encontrada.")
        
        ServicioForoAcademico.DesmarcarComentarioComoRespuesta(publicacion)

        self.publicacion_repo.actualizar(publicacion)

        return {"mensaje": "Publicación cambio a estado abierta. Comentario respuesta eliminado"}