from domain.services.servicio_foro_academico import ServicioForoAcademico
from domain.entities.publicacion import Publicacion
from domain.entities.comentario import Comentario
from domain.repositories.repositorio_publicacion import RepositorioPublicacion
from domain.repositories.repositorio_comentario import RepositorioComentario

class MarcarComentarioComoRespuestaUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion, comentario_repo: RepositorioComentario):
        self.publicacion_repo = publicacion_repo
        self.comentario_repo = comentario_repo

    def ejecutar(self, id_publicacion: int, id_comentario: str):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("La publicación no existe.")
        if len(id_comentario) != 24 or not (comentario := self.comentario_repo.obtener_por_id(id_comentario)):
            raise ValueError("El comentario no existe")
        
        if comentario.idComentarioPadre is not None:
            comentario.idComentario=comentario.idComentarioPadre

        ServicioForoAcademico.MarcarComentarioComoRespuesta(publicacion, comentario)

        self.publicacion_repo.actualizar(publicacion)

        return {"mensaje": "Publicación cambio a estado solucionada. Comentario agregado como respuesta."}