import smtplib
from email.mime.text import MIMEText
from src.domain.models import Notificacion
from src.application.email_template import generar_html_desde_evento

REMITENTE = "jhamir.cespedes@unmsm.edu.pe"
CONTRASEÑA = "eyag uiys qbvp hnza"

def enviar_email(notificacion: Notificacion):
    cuerpo_html = generar_html_desde_evento(notificacion.dict())

    mensaje = MIMEText(cuerpo_html, "html")
    mensaje['Subject'] = f"Notificación de solicitud enviada"
    mensaje['From'] = REMITENTE
    mensaje['To'] = notificacion.data.destinatario.correo

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as servidor:
            servidor.starttls()
            servidor.login(REMITENTE, CONTRASEÑA)
            servidor.send_message(mensaje)
    except smtplib.SMTPAuthenticationError:
        raise Exception("Error de autenticación. Verifica tu usuario y contraseña.")
    except smtplib.SMTPConnectError:
        raise Exception("Error de conexión al servidor SMTP.")
    except smtplib.SMTPException as e:
        raise Exception(f"Error al enviar el correo: {e}")