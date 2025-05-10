# src/presentation/controllers/RecomendacionController.py
from fastapi import APIRouter, Body, Depends
from typing import List
from src.application.services.RecomendacionServicio import RecomendacionServicio
from src.domain.dtos.InvestigadorDto import InvestigadorDto
from src.application.transformers.RecomendacionTransformador import RecomendacionTransformador
from src.presentation.dependencies import get_recomendacion_servicio

router = APIRouter()

@router.get("/recomendaciones/por-id")
def obtener_recomendaciones_por_id(
    id_investigador: int,
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    recomendaciones = servicio.obtener_recomendaciones_por_id(id_investigador)
    
    # Usar el transformador para convertir las recomendaciones
    recomendaciones_transformadas = [RecomendacionTransformador.transformar(r) for r in recomendaciones]
    
    return {"recomendaciones": recomendaciones_transformadas}

@router.post("/recomendaciones")
def procesar_recomendaciones(
    investigadores: List[InvestigadorDto],
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    servicio.calcular_y_guardar_recomendaciones(investigadores)
    return {"mensaje": "Recomendaciones generadas correctamente"}

@router.get("/recomendaciones/por-id-y-fecha")
def obtener_recomendaciones_por_id_y_fecha(
    id_investigador: int,
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    recomendaciones = servicio.obtener_recomendaciones_por_id_y_fecha(id_investigador)
    
    # Usar el transformador para convertir las recomendaciones
    recomendaciones_transformadas = [RecomendacionTransformador.transformar(r) for r in recomendaciones]
    
    return {"recomendaciones": recomendaciones_transformadas}

@router.post("/recomendaciones/{id_investigador}")
def procesar_y_obtener_recomendaciones(
    id_investigador: int,
    investigadores: List[InvestigadorDto],
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    servicio.calcular_y_guardar_recomendaciones(investigadores)
    recomendaciones = servicio.obtener_recomendaciones_por_id(id_investigador)
    
    # Usar el transformador para convertir las recomendaciones
    recomendaciones_transformadas = [RecomendacionTransformador.transformar(r) for r in recomendaciones]
    
    return {"mensaje": "Recomendaciones generadas correctamente", "recomendaciones": recomendaciones_transformadas}