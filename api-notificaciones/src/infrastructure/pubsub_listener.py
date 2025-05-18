import os
from dotenv import load_dotenv
from google.cloud import pubsub_v1
import json
from src.application.use_cases import procesar_notificacion
from src.domain.models import Notificacion
from src.config.settings import settings  # ✅ importa tus settings centralizados

# Carga variables del entorno .env si existe (solo en local)
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

# Si estamos en entorno local y se define el emulador, lo usamos
if settings.ENV == "development" and settings.PUBSUB_EMULATOR_HOST:
    os.environ["PUBSUB_EMULATOR_HOST"] = settings.PUBSUB_EMULATOR_HOST
    print(f"📡 Conectando al emulador de Pub/Sub en {settings.PUBSUB_EMULATOR_HOST}")

# Importar después de definir la variable del emulador
from google.cloud import pubsub_v1

from src.application.use_cases import procesar_notificacion
from src.domain.models import Notificacion

project_id = settings.PUBSUB_PROJECT_ID
subscription_name = settings.PUBSUB_SUBSCRIPTION_NAME

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_name)

def callback(message):
    print(f"🔔 Mensaje recibido: {message.data}")
    try:
        data_dict = json.loads(message.data.decode("utf-8"))
        notificacion_obj = Notificacion.parse_obj(data_dict)
        procesar_notificacion(notificacion_obj)
        message.ack()
    except Exception as e:
        print(f"❌ Error procesando mensaje: {e}")
        message.nack()

def iniciar_escucha():
    print(f"🟢 Escuchando en {subscription_path}...")
    streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
    try:
        streaming_pull_future.result()
    except KeyboardInterrupt:
        streaming_pull_future.cancel()
        print("🛑 Listener detenido.")

if __name__ == "__main__":
    iniciar_escucha()