from fastapi import APIRouter, HTTPException
from domain.models import Notificacion
from application.use_cases import procesar_notificacion

router = APIRouter()

@router.post("/notificacion/")
def enviar_notificacion(notificacion: Notificacion):
    try:
        procesar_notificacion(notificacion)
        return {"mensaje": "Correo enviado correctamente"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
