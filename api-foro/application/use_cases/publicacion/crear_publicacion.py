from datetime import datetime, timezone
from domain.entities.publicacion import Publicacion
from presentation.dtos.publicacion_dto import CrearPublicacionDTO
from domain.repositories.repositorio_publicacion import RepositorioPublicacion

class CrearPublicacionUseCase:
    def __init__(self, publicacion_repo: RepositorioPublicacion):
        self.publicacion_repo = publicacion_repo

    def ejecutar(self, data: CrearPublicacionDTO):
        publicacion = Publicacion(
            idPublicacion=None,
            idUsuario=data.idUsuario,
            idCategoria=data.idCategoria,
            titulo=data.titulo,
            contenido=data.contenido,
            fechaCreacion=datetime.utcnow(),
            visible=True,
            idEstado=data.idEstado,
            idComentarioRespuesta=data.idComentarioRespuesta
        )
        self.publicacion_repo.crear(publicacion)
        return publicacion