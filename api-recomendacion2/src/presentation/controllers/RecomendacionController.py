# src/presentation/controllers/RecomendacionController.py
from fastapi import APIRouter, Body, Query
from datetime import date
from src.domain.entities.Investigador import Investigador
from src.application.services.RecomendacionServicio import RecomendacionServicio
from src.infrastructure.repositories.RepositorioRecomendacionImpl import RepositorioRecomendacionImpl

router = APIRouter()
servicio = RecomendacionServicio(RepositorioRecomendacionImpl())

@router.get("/recomendaciones/por-id")
def obtener_recomendaciones_por_id(id_investigador: int):
    recomendaciones = servicio.obtener_recomendaciones_por_id(id_investigador)
    return [r.__dict__ for r in recomendaciones]

@router.post("/recomendaciones")
def procesar_recomendaciones(investigadores: list[dict] = Body(...)):
    lista = [
        Investigador(
            id=i["id"],
            descripcion=i.get("descripcion", ""),
            lineaInvestigacion=i.get("lineaInvestigacion", ""),
            rolTesista=i.get("rolTesista", 0),
            rolAsesor=i.get("rolAsesor", 0),
            especialidades=i.get("especialidades", []),
            publicaciones=i.get("publicaciones", []),
        )
        for i in investigadores
    ]
    servicio.calcular_y_guardar_recomendaciones(lista)
    return {"mensaje": "Recomendaciones generadas correctamente"}

@router.get("/recomendaciones/por-id-y-fecha")
def obtener_recomendaciones_por_id_y_fecha(id_investigador: int):
    recomendaciones = servicio.obtener_recomendaciones_por_id_y_fecha(id_investigador)
    return [r.__dict__ for r in recomendaciones]

@router.post("/recomendaciones/{id_investigador}")
def procesar_y_obtener_recomendaciones(id_investigador: int, investigadores: list[dict] = Body(...)):
    # Convertir los investigadores a objetos Investigador
    lista = [
        Investigador(
            id=i["id"],
            descripcion=i.get("descripcion", ""),
            lineaInvestigacion=i.get("lineaInvestigacion", ""),
            rolTesista=i.get("rolTesista", 0),
            rolAsesor=i.get("rolAsesor", 0),
            especialidades=i.get("especialidades", []),
            publicaciones=i.get("publicaciones", []),
        )
        for i in investigadores
    ]
    
    # Generar recomendaciones
    servicio.calcular_y_guardar_recomendaciones(lista)
    
    # Obtener recomendaciones filtradas por el id del investigador
    recomendaciones = servicio.obtener_recomendaciones_por_id(id_investigador)
    
    return {"mensaje": "Recomendaciones generadas correctamente", "recomendaciones": [r.__dict__ for r in recomendaciones]}