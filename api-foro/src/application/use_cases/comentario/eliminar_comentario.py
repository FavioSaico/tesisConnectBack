from domain.services.servicio_foro_academico import ServicioForoAcademico
from domain.repositories.repositorio_comentario import RepositorioComentario
from domain.repositories.repositorio_publicacion import RepositorioPublicacion
class EliminarComentarioUseCase:
    def __init__(self, comentario_repo: RepositorioComentario, publicacion_repo: RepositorioPublicacion):
        self.comentario_repo = comentario_repo
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, id_comentario: str, id_publicacion:int):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("La publicacion no existe")
        comentario = self.comentario_repo.obtener_por_id(id_comentario)
        if not comentario:
            raise ValueError("El comentario no existe")
        ServicioForoAcademico.ValidarComentarioPublicacion(publicacion, comentario)
        self.comentario_repo.eliminar(id_comentario)
        return {"mensaje": "Comentario eliminado correctamente"}