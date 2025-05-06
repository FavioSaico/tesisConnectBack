from datetime import datetime, timezone
from domain.entities.comentario import Comentario
from shared.dtos.comentario_dto import CrearComentarioDTO

class CrearComentarioUseCase:
    def __init__(self, comentario_repo):
        self.comentario_repo = comentario_repo

    def ejecutar(self, data: CrearComentarioDTO):
        comentario = Comentario(
            idUsuario = data.idUsuario,
            idPublicacion = data.idPublicacion,
            contenido = data.contenido,
            idComentarioPadre = data.idComentarioPadre,
            fechaCreacion =datetime.utcnow(),
            visible = True,
            idComentario = None
        )
        return self.comentario_repo.crear(comentario)