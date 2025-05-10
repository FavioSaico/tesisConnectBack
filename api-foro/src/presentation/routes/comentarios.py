from fastapi import APIRouter, Depends, HTTPException
from presentation.dtos.comentario_dto import CrearComentarioDTO

from application.use_cases.comentario.crear_comentario import CrearComentarioUseCase
from application.use_cases.comentario.obtener_comentario_por_id import ObtenerComentarioPorIdUseCase
from application.use_cases.comentario.eliminar_comentario import EliminarComentarioUseCase

from infrastructure.dependencies import (
    get_crear_comentario_use_case,
    get_obtener_comentario_por_id_use_case,
    get_eliminar_comentario_use_case,
)

router = APIRouter()

@router.post("/comentarios")
def crear_comentario(dto: CrearComentarioDTO, use_case: CrearComentarioUseCase = Depends(get_crear_comentario_use_case)):
    try:
        comentario = use_case.ejecutar(dto)
        return {"mensaje": "Comentario creado", "id": comentario.idComentario}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/comentarios/{id}")
def obtener_comentario(id: str, use_case: CrearComentarioUseCase = Depends(get_obtener_comentario_por_id_use_case)):
    try:
        comentario = use_case.ejecutar(id)
        return {
            "idComentario": comentario.idComentario,
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
def eliminar_comentario(id: str, use_case: CrearComentarioUseCase = Depends(get_eliminar_comentario_use_case)):
    try:
        use_case.ejecutar(id)
        return {"mensaje": "Comentario eliminado correctamente"}    
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))