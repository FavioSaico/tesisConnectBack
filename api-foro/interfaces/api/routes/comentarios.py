from fastapi import APIRouter, Depends, HTTPException
from infrastructure.config.mongodb import get_mongo_collection
from infrastructure.database.mongodb.repository.comentario_repository import RepositorioComentario
from shared.dtos.comentario_dto import CrearComentarioDTO
from infrastructure.database.mongodb.models.comentario_model import ComentarioModel
from application.use_cases.comentario.crear_comentario import CrearComentarioUseCase
from application.use_cases.comentario.obtener_comentario import ObtenerComentarioUseCase
from application.use_cases.comentario.eliminar_comentario import EliminarComentarioUseCase
from typing import List

router = APIRouter()

def obtener_repositorio():
    coleccion = get_mongo_collection("comentarios")
    return RepositorioComentario(coleccion)

@router.post("/comentarios")
def crear_comentario(dto: CrearComentarioDTO, repo = Depends(obtener_repositorio)):
    try:
        use_case = CrearComentarioUseCase(repo)
        comentario = use_case.ejecutar(dto)
        return {"mensaje": "Comentario creado", "id": comentario.id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/comentarios/{id}")
def obtener_comentario(id: str, repo = Depends(obtener_repositorio)):
    try:
        use_case = ObtenerComentarioUseCase(repo)
        comentario = use_case.ejecutar(id)
        return {
            "id": comentario.id,
            "contenido": comentario.contenido,
            "idUsuario": comentario.idUsuario,
            "idPublicacion": comentario.idPublicacion,
            "idComentarioPadre": comentario.idComentarioPadre,
            "fechaCreacion": comentario.fechaCreacion,
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/comentarios/{id}")
def eliminar_comentario(id: str, repo = Depends(obtener_repositorio)):
    try:
        use_case = EliminarComentarioUseCase(repo)
        use_case.ejecutar(id)
        return {"mensaje": "Comentario eliminado correctamente"}    
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))