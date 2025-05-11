from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query
from presentation.dtos.publicacion_dto import CrearPublicacionDTO
from application.use_cases.publicacion.listar_publicaciones import ListarPublicacionesUseCase
from application.use_cases.publicacion.crear_publicacion import CrearPublicacionUseCase
from application.use_cases.publicacion.obtener_publicacion import ObtenerPublicacionUseCase
from application.use_cases.publicacion.eliminar_publicacion import EliminarPublicacionUseCase
from application.use_cases.publicacion.marcar_comentario_como_respuesta import MarcarComentarioComoRespuestaUseCase
from application.use_cases.publicacion.desmarcar_comentario_como_respuesta import DesmarcarComentarioComoRespuestaUseCase
from application.use_cases.comentario.obtener_comentarios_por_publicacion import ObtenerComentariosPorPublicacionUseCase

from infrastructure.dependencies import (
    get_listar_publicaciones_use_case,
    get_crear_publicacion_use_case,
    get_obtener_publicacion_use_case,
    get_eliminar_publicacion_use_case,
    get_desmarcar_respuesta_use_case,
    get_marcar_respuesta_use_case,
    get_obtener_comentarios_por_publicacion_use_case
)

router = APIRouter()

@router.get("/publicaciones/")
def listar_publicaciones(
    texto: Optional[str] = Query(None),
    id_categoria: Optional[int] = Query(None),
    id_estado: Optional[int] = Query(None),
    use_case: ListarPublicacionesUseCase = Depends(get_listar_publicaciones_use_case)):
    try:
        publicaciones = use_case.ejecutar(texto, id_categoria, id_estado)
        return [p.__dict__ for p in publicaciones]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/publicaciones/")
def crear_publicacion(dto: CrearPublicacionDTO, use_case: CrearPublicacionUseCase = Depends(get_crear_publicacion_use_case)):
    try:
        resultado = use_case.ejecutar(dto)
        return resultado
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/publicaciones/{id}")
def obtener_publicacion(id: int, use_case: ObtenerPublicacionUseCase = Depends(get_obtener_publicacion_use_case)):
    try:
        publicacion = use_case.ejecutar(id)
        return publicacion.__dict__
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/publicaciones/{id}")
def eliminar_publicacion(id: int, use_case: EliminarPublicacionUseCase = Depends(get_eliminar_publicacion_use_case)):
    try:
        resultado=use_case.ejecutar(id)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/publicaciones/{id}/desmarcar_respuesta")
def marcar_comentario_como_respuesta(id: int, use_case: DesmarcarComentarioComoRespuestaUseCase = Depends(get_desmarcar_respuesta_use_case)):
    try:
        resultado = use_case.ejecutar(id)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/publicaciones/{id_publicacion}/comentarios/{id_comentario}/marcar_respuesta")
def marcar_comentario_como_respuesta(id_publicacion: int, id_comentario: str, use_case: MarcarComentarioComoRespuestaUseCase = Depends(get_marcar_respuesta_use_case)):
    try:
        resultado = use_case.ejecutar(id_publicacion, id_comentario)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    
@router.get("/publicaciones/{id}/comentarios")
def obtener_comentarios_por_publicacion(id: int, use_case: ObtenerComentariosPorPublicacionUseCase = Depends(get_obtener_comentarios_por_publicacion_use_case)):
    try:
        comentarios = use_case.ejecutar(id)
        return [c.__dict__ for c in comentarios]
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))