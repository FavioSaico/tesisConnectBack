from datetime import timezone
from domain.entities.publicacion import Publicacion
from infrastructure.database.mysql.models.publicacion_model import PublicacionModel
from presentation.dtos.publicacion_dto import MostrarPublicacionDTO

def model_a_entidad(modelo: PublicacionModel) -> Publicacion:
    return Publicacion(
        idPublicacion=modelo.idPublicacion,
        idUsuario=modelo.idUsuario,
        idCategoria=modelo.idCategoria,
        titulo=modelo.titulo,
        contenido=modelo.contenido,
        fechaCreacion=modelo.fechaCreacion,
        visible=modelo.visible,
        idEstado=modelo.idEstado,
        idComentarioRespuesta=modelo.idComentarioRespuesta
    )

def entidad_a_model(entidad: Publicacion) -> PublicacionModel:
    return PublicacionModel(
        idPublicacion=entidad.idPublicacion,
        idUsuario=entidad.idUsuario,
        idCategoria=entidad.idCategoria,
        titulo=entidad.titulo,
        contenido=entidad.contenido,
        fechaCreacion=entidad.fechaCreacion,
        visible=entidad.visible,
        idEstado=entidad.idEstado,
        idComentarioRespuesta=entidad.idComentarioRespuesta
    )

def entidad_a_DTO(entidad: Publicacion) -> MostrarPublicacionDTO:
    return MostrarPublicacionDTO(
        idUsuario=entidad.idUsuario,
        idCategoria=entidad.idCategoria,
        titulo=entidad.titulo,
        contenido=entidad.contenido,
        fechaCreacion=entidad.fechaCreacion,
        idEstado=entidad.idEstado,
        idComentarioRespuesta=entidad.idComentarioRespuesta
    )

def actualizar_model(modelo: PublicacionModel, entidad: Publicacion):
    modelo.idUsuario=entidad.idUsuario
    modelo.idCategoria=entidad.idCategoria
    modelo.titulo=entidad.titulo
    modelo.contenido=entidad.contenido
    modelo.fechaCreacion=entidad.fechaCreacion
    modelo.visible=entidad.visible
    modelo.idEstado=entidad.idEstado
    modelo.idComentarioRespuesta=entidad.idComentarioRespuesta