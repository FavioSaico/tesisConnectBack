from datetime import datetime
from typing import Optional
from pymongo.collection import Collection
from domain.entities.comentario import Comentario
from infrastructure.database.mongodb.models.comentario_model import ComentarioModel
from bson import ObjectId

class RepositorioComentario:
    def __init__(self, coleccion: Collection):
        self.coleccion = coleccion

    def crear(self, comentario: Comentario) -> str:
        nueva = ComentarioModel(
            contenido=comentario.contenido,
            idUsuario=comentario.idUsuario,
            idPublicacion=comentario.idPublicacion,
            idComentarioPadre=comentario.idComentarioPadre,
            fechaCreacion=comentario.fechaCreacion,
            visible=comentario.visible,
        ).model_dump()
        resultado = self.coleccion.insert_one(nueva)
        documento = self.coleccion.find_one({"_id": resultado.inserted_id})
        comentario.id = str(documento["_id"])
        return comentario

    def obtener_por_id(self, id_comentario: str):
        documento = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })
        if not documento:
            return None
        documento["id"] = str(documento["_id"])
        del documento["_id"]
        
        return ComentarioModel(**documento)

    def eliminar(self, id_comentario: str) -> bool:
        comentario = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })

        if comentario:
            resultado = self.coleccion.update_one(
                {"_id": comentario["_id"]},
                {"$set": {"visible": False}}
            )
            return resultado.modified_count == 1
        return False