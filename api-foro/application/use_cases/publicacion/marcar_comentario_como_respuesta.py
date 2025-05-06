from domain.services.servicio_foro_academico import ServicioForoAcademico
from domain.entities.publicacion import Publicacion
from domain.entities.comentario import Comentario

class MarcarComentarioComoRespuestaUseCase:
    def __init__(self, publicacion_repo, comentario_repo):
        self.publicacion_repo = publicacion_repo
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_publicacion: int, id_comentario: str):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("Publicación no encontrada.")

        comentario = self.comentario_repo.obtener_por_id(id_comentario)
        if not comentario:
            raise ValueError("Comentario no encontrado.")

        ServicioForoAcademico.MarcarComentarioComoRespuesta(publicacion, comentario)
        print(publicacion.idEstado)

        self.publicacion_repo.actualizar(publicacion)

        return {"mensaje": "Publicación cambio a estado solucionada. Comentario agregado como respuesta."}