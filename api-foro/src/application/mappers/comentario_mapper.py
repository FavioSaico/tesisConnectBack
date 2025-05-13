from bson import ObjectId
from domain.entities.comentario import Comentario
from infrastructure.database.mongodb.models.comentario_model import ComentarioModel
from presentation.dtos.comentario_dto import MostrarComentarioDTO

def documento_a_entidad(documento: dict) -> Comentario:
    return Comentario(
        idComentario=str(documento["_id"]),
        contenido=documento["contenido"],
        idUsuario=documento["idUsuario"],
        idPublicacion=documento["idPublicacion"],
        idComentarioPadre=str(documento["idComentarioPadre"]),
        fechaCreacion=documento["fechaCreacion"],
        visible=documento["visible"]
    )

def entidad_a_modelo(entidad: Comentario) -> ComentarioModel:

    return ComentarioModel(
        idComentario=ObjectId(entidad.idComentario),
        contenido=entidad.contenido,
        idUsuario=entidad.idUsuario,
        idPublicacion=entidad.idPublicacion,
        idComentarioPadre=ObjectId(entidad.idComentarioPadre),
        fechaCreacion=entidad.fechaCreacion,
        visible=entidad.visible
    )

def entidad_a_DTO(entidad: Comentario) -> MostrarComentarioDTO:
    return MostrarComentarioDTO(
        idUsuario=entidad.idUsuario,
        idPublicacion=entidad.idPublicacion,
        contenido=entidad.contenido,
        idComentarioPadre=entidad.idComentarioPadre,
        fechaCreacion=entidad.fechaCreacion
    )