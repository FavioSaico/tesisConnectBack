from domain.entities.comentario import Comentario
from infrastructure.database.mongodb.models.comentario_model import ComentarioModel

def documento_a_entidad(documento: dict) -> Comentario:
    return Comentario(
        idComentario=str(documento["_id"]),
        contenido=documento["contenido"],
        idUsuario=documento["idUsuario"],
        idPublicacion=documento["idPublicacion"],
        idComentarioPadre=documento.get("idComentarioPadre"),
        fechaCreacion=documento["fechaCreacion"],
        visible=documento["visible"]
    )

def entidad_a_modelo(entidad: Comentario) -> ComentarioModel:
    return ComentarioModel(
        idComentario=entidad.idComentario,
        contenido=entidad.contenido,
        idUsuario=entidad.idUsuario,
        idPublicacion=entidad.idPublicacion,
        idComentarioPadre=entidad.idComentarioPadre,
        fechaCreacion=entidad.fechaCreacion,
        visible=entidad.visible
    )