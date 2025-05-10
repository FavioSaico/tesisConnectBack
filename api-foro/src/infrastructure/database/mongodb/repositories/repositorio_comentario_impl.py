from typing import List, Optional
from pymongo.collection import Collection
from domain.entities.comentario import Comentario
from infrastructure.database.mongodb.models.comentario_model import ComentarioModel 
from application.mappers.comentario_mapper import documento_a_entidad, entidad_a_modelo
from domain.repositories.repositorio_comentario import RepositorioComentario
from bson import ObjectId

class RepositorioComentarioImpl(RepositorioComentario):
    def __init__(self, coleccion: Collection):
        self.coleccion = coleccion

    def crear(self, comentario: Comentario) -> Comentario:
        nueva = entidad_a_modelo(comentario).model_dump(exclude={"idComentario"}) # Forzar a Mongo a generar el id
        resultado = self.coleccion.insert_one(nueva)
        comentario.idComentario = str(resultado.inserted_id)
        return comentario

    def obtener_por_id(self, id_comentario: str) -> Optional[Comentario]:
        documento = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })
        if not documento:
            return None
        return documento_a_entidad(documento)

    def eliminar(self, id_comentario: str) -> bool:
        documento = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })
        if not documento:
            return False
        comentario = documento_a_entidad(documento)
        comentario.eliminar()
        resultado = self.coleccion.update_one(
            {"_id": ObjectId(id_comentario)},
            {"$set": {"visible": comentario.visible}}
        )
        return resultado.modified_count == 1
    
    def obtener_por_publicacion(self, id_publicacion: int) -> List[Comentario]:
        documentos = self.coleccion.find({
            "idPublicacion": id_publicacion,
            "visible": True
        })
        print(type(id_publicacion))
        comentarios = [documento_a_entidad(doc) for doc in documentos]
        return comentarios