from src.domain.models import Notificacion
from src.infrastructure.email_service import enviar_email

def procesar_notificacion(notificacion: Notificacion):
    enviar_email(notificacion)