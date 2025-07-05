from bson import ObjectId
from typing import List, Dict
from collections import defaultdict
from domain.entities.comentario import Comentario
from infrastructure.database.mongodb.models.comentario_model import ComentarioModel
from presentation.dtos.comentario_dto import MostrarComentarioDTO

def documento_a_entidad(documento: dict) -> Comentario:
    return Comentario(
        idComentario=str(documento["_id"]),
        contenido=documento["contenido"],
        idUsuario=documento["idUsuario"],
        idPublicacion=documento["idPublicacion"],
        idComentarioPadre=str(documento["idComentarioPadre"]) if documento.get("idComentarioPadre") is not None else None,
        fechaCreacion=documento["fechaCreacion"],
        visible=documento["visible"]
    )

def entidad_a_modelo(entidad: Comentario) -> ComentarioModel:

    return ComentarioModel(
        idComentario=ObjectId(entidad.idComentario),
        contenido=entidad.contenido,
        idUsuario=entidad.idUsuario,
        idPublicacion=entidad.idPublicacion,
        idComentarioPadre=ObjectId(entidad.idComentarioPadre) if entidad.idComentarioPadre is not None else None,
        fechaCreacion=entidad.fechaCreacion,
        visible=entidad.visible
    )

#def entidad_a_DTO(entidad: Comentario) -> MostrarComentarioDTO:
#    return MostrarComentarioDTO(
#        idComentario=entidad.idComentario,
#        idUsuario=entidad.idUsuario,
#        idPublicacion=entidad.idPublicacion,
#        contenido=entidad.contenido,
#        idComentarioPadre=entidad.idComentarioPadre,
#        fechaCreacion=entidad.fechaCreacion
#    )

def construir_comentarios_jerarquicos(comentarios: List[Comentario]) -> List[MostrarComentarioDTO]:
    dto_map: Dict[str, MostrarComentarioDTO] = {}

    for entidad in comentarios:
        dto = MostrarComentarioDTO(
            idComentario=entidad.idComentario,
            idUsuario=entidad.idUsuario,
            idPublicacion=entidad.idPublicacion,
            contenido=entidad.contenido,
            fechaCreacion=entidad.fechaCreacion,
            respuestas=[]
        )
        dto_map[dto.idComentario] = dto
    arbol: List[MostrarComentarioDTO] = []

    for entidad in comentarios:
        dto_actual = dto_map[entidad.idComentario]
        if entidad.idComentarioPadre:
            padre = dto_map.get(entidad.idComentarioPadre)
            if padre:
                padre.respuestas.append(dto_actual)
        else:
            arbol.append(dto_actual)
    return arbol