# src/presentation/controllers/RecomendacionController.py
from fastapi import APIRouter, Body, Query
from datetime import date
from src.domain.entities.Investigador import Investigador
from src.application.services.RecomendacionServicio import RecomendacionServicio
from src.infrastructure.repositories.RepositorioRecomendacionImpl import RepositorioRecomendacionImpl

router = APIRouter()
servicio = RecomendacionServicio(RepositorioRecomendacionImpl())

@router.post("/recomendaciones/{tipo}")
def procesar_recomendaciones(tipo: str, investigadores: list[dict] = Body(...)):
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
    servicio.calcular_y_guardar_recomendaciones(lista, tipo)
    return {"mensaje": f"Recomendaciones de tipo {tipo} generadas correctamente"}

@router.get("/recomendaciones")
def obtener_recomendaciones():
    recomendaciones = servicio.obtener_recomendaciones()
    return [r.__dict__ for r in recomendaciones]

@router.get("/recomendaciones/por-fecha")
def obtener_recomendaciones_por_fecha(fecha: date = Query(...)):
    recomendaciones = servicio.obtener_recomendaciones_por_fecha(fecha)
    return [r.__dict__ for r in recomendaciones]

@router.get("/recomendaciones/por-tipo")
def obtener_recomendaciones_por_tipo(tipo: str = Query(...)):
    recomendaciones = servicio.obtener_recomendaciones_por_tipo(tipo)
    return [r.__dict__ for r in recomendaciones]

@router.get("/recomendaciones/por-fecha-tipo")
def obtener_recomendaciones_por_fecha_y_tipo(
    fecha: date = Query(...), tipo: str = Query(...)):
    recomendaciones = servicio.obtener_recomendaciones_por_fecha_y_tipo(fecha, tipo)
    return [r.__dict__ for r in recomendaciones]