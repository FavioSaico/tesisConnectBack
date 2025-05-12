import smtplib
from email.mime.text import MIMEText
from domain.models import Notificacion
from application.email_template import generar_html

REMITENTE = "jhamir.cespedes@unmsm.edu.pe"
CONTRASEÑA = "contraseña"

def enviar_email(notificacion: Notificacion):
    cuerpo_html = generar_html("Investigador Uno", "Título de tesis 2025", "Área", "Universidad de Prueba", "TesisConnect.com")
    mensaje = MIMEText(cuerpo_html, "html")
    mensaje['Subject'] = notificacion.asunto
    mensaje['From'] = REMITENTE
    mensaje['To'] = notificacion.destinatario

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
        raise Exception(f"Error al enviar el correo: {e}")#