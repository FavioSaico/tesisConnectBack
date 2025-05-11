from fastapi import APIRouter, Depends, HTTPException, Query
from application.use_cases.categoria_publicacion.listar_categorias import ListarCategoriasUseCase
from application.use_cases.estado_publicacion.listar_estados import ListarEstadosUseCase
from infrastructure.dependencies_filtros import get_listar_categorias_use_case
from infrastructure.dependencies_filtros import get_listar_estados_use_case
router = APIRouter(prefix="/filtros")

@router.get("/categorias/")
def listar_categorias(use_case: ListarCategoriasUseCase = Depends(get_listar_categorias_use_case)):
    try:
        categorias = use_case.ejecutar()
        return [c.__dict__ for c in categorias]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/estados/")
def listar_estados(use_case: ListarEstadosUseCase = Depends(get_listar_estados_use_case)):
    try:
        estados = use_case.ejecutar()
        return [e.__dict__ for e in estados]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))