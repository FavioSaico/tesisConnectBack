from bson import ObjectId
from typing import List, Optional
from pymongo.collection import Collection
from domain.entities.comentario import Comentario
from domain.repositories.repositorio_comentario import RepositorioComentario
from application.mappers.comentario_mapper import documento_a_entidad, entidad_a_modelo

class RepositorioComentarioImpl(RepositorioComentario):
    def __init__(self, coleccion: Collection):
        self.coleccion = coleccion

    def crear(self, comentario: Comentario) -> str:
        nueva = entidad_a_modelo(comentario).model_dump(exclude={"idComentario"}) 
        resultado = self.coleccion.insert_one(nueva)
        return str(resultado.inserted_id)

    def obtener_por_id(self, id_comentario: str) -> Optional[Comentario]:
        documento = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })
        if not documento:
            return None
        return documento_a_entidad(documento)

    def obtener_con_respuestas_por_id(self, id_comentario: str) -> Optional[List[Comentario]]:
        # Obtener el comentario raíz
        documento = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })
        if not documento:
            return None

        comentario_raiz = documento_a_entidad(documento)

        # Buscar todos los descendientes recursivamente
        descendientes = []
        cola = [comentario_raiz.idComentario]

        while cola:
            padre_id = cola.pop()
            hijos_cursor = self.coleccion.find({
                "idComentarioPadre": ObjectId(padre_id),
                "visible": True
            })

            for hijo_doc in hijos_cursor:
                hijo_entidad = documento_a_entidad(hijo_doc)
                descendientes.append(hijo_entidad)
                cola.append(hijo_entidad.idComentario)

        # Retornar comentario raíz + descendientes para armar el árbol
        return [comentario_raiz] + descendientes

    def eliminar(self, id_comentario: str) -> bool:
        documento = self.coleccion.find_one({
            "_id": ObjectId(id_comentario),
            "visible": True
        })
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
        return [documento_a_entidad(doc) for doc in documentos]