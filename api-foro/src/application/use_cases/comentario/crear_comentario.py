from datetime import datetime, timezone
from domain.entities.comentario import Comentario
from presentation.dtos.comentario_dto import CrearComentarioDTO
from domain.repositories.repositorio_comentario import RepositorioComentario

class CrearComentarioUseCase:
    def __init__(self, comentario_repo: RepositorioComentario):
        self.comentario_repo = comentario_repo

    def ejecutar(self, data: CrearComentarioDTO):
        comentario = Comentario(
            idComentario = None,
            idUsuario = data.idUsuario,
            idPublicacion = data.idPublicacion,
            contenido = data.contenido,
            idComentarioPadre = data.idComentarioPadre,
            fechaCreacion =datetime.now(timezone.utc),
            visible = True,
        )
        id = self.comentario_repo.crear(comentario)
        return {"mensaje": "Comentario creado", "id": id}