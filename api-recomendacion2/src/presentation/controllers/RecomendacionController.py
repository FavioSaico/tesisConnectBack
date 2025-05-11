# src/presentation/controllers/RecomendacionController.py
from fastapi import APIRouter, Depends
from typing import List
from src.application.services.RecomendacionServicio import RecomendacionServicio
from src.application.transformers.RecomendacionTransformador import RecomendacionTransformador
from src.presentation.dependencies import get_recomendacion_servicio
from src.infrastructure.repositories.RepositorioRecomendacionImpl import RepositorioRecomendacionImpl

router = APIRouter()

@router.get("/recomendaciones")
def procesar_recomendaciones(
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    # Obtener los investigadores desde la base de datos
    repositorio = RepositorioRecomendacionImpl()  # Asumiendo que el repositorio puede hacer la consulta SQL
    investigadores = repositorio.obtener_usuarios_con_especialidades_y_publicaciones()
    
    # Calcular y guardar recomendaciones
    servicio.calcular_y_guardar_recomendaciones(investigadores)
    
    return {"mensaje": "Recomendaciones generadas correctamente"}

@router.get("/recomendaciones/por-id")
def obtener_recomendaciones_por_id(
    id_investigador: int,
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    recomendaciones = servicio.obtener_recomendaciones_por_id(id_investigador)
    
    # Usar el transformador para convertir las recomendaciones
    recomendaciones_transformadas = [RecomendacionTransformador.transformar(r) for r in recomendaciones]
    
    return {"recomendaciones": recomendaciones_transformadas}

@router.get("/recomendaciones/por-id-y-fecha")
def obtener_recomendaciones_por_id_y_fecha(
    id_investigador: int,
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    recomendaciones = servicio.obtener_recomendaciones_por_id_y_fecha(id_investigador)
    
    # Usar el transformador para convertir las recomendaciones
    recomendaciones_transformadas = [RecomendacionTransformador.transformar(r) for r in recomendaciones]
    
    return {"recomendaciones": recomendaciones_transformadas}

@router.get("/recomendaciones/{id_investigador}")
def procesar_y_obtener_recomendaciones(
    id_investigador: int,
    servicio: RecomendacionServicio = Depends(get_recomendacion_servicio)
):
    # Obtener los investigadores desde la base de datos
    repositorio = RepositorioRecomendacionImpl()
    investigadores = repositorio.obtener_usuarios_con_especialidades_y_publicaciones()
    
    # Calcular y guardar recomendaciones
    servicio.calcular_y_guardar_recomendaciones(investigadores)
    
    # Obtener las recomendaciones para el investigador
    recomendaciones = servicio.obtener_recomendaciones_por_id(id_investigador)
    
    # Usar el transformador para convertir las recomendaciones
    recomendaciones_transformadas = [RecomendacionTransformador.transformar(r) for r in recomendaciones]
    
    return {"mensaje": "Recomendaciones generadas correctamente", "recomendaciones": recomendaciones_transformadas}