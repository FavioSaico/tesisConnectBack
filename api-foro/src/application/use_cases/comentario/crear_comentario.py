from datetime import datetime, timezone
from domain.entities.comentario import Comentario
from presentation.dtos.comentario_dto import CrearComentarioDTO
from domain.repositories.repositorio_comentario import RepositorioComentario
from domain.repositories.repositorio_publicacion import RepositorioPublicacion

class CrearComentarioUseCase:
    def __init__(self, comentario_repo: RepositorioComentario, publicacion_repo: RepositorioPublicacion):
        self.comentario_repo = comentario_repo
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, data: CrearComentarioDTO, id_publicacion: int):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("La publicacion no existe")
        comentario = Comentario(
            idComentario = None,
            idUsuario = data.idUsuario,
            idPublicacion = id_publicacion,
            contenido = data.contenido,
            idComentarioPadre = data.idComentarioPadre,
            fechaCreacion =datetime.now(timezone.utc),
            visible = True,
        )
        id = self.comentario_repo.crear(comentario)
        return {"mensaje": "Comentario creado", "id": id}