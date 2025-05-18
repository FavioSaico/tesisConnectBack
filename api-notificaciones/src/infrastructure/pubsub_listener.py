import os
import json
from google.cloud import pubsub_v1
from src.application.use_cases import procesar_notificacion
from src.domain.models import Notificacion

# Para LOCAL: si quieres usar emulador Pub/Sub, define esta variable de entorno externamente
# Ejemplo local: export PUBSUB_EMULATOR_HOST=localhost:8085
#pubsub_emulator = os.getenv("PUBSUB_EMULATOR_HOST")
#if pubsub_emulator:
#    os.environ["PUBSUB_EMULATOR_HOST"] = pubsub_emulator  # Sólo si está definida externamente

project_id = os.getenv("PUBSUB_PROJECT_ID")
subscription_name = os.getenv("PUBSUB_SUBSCRIPTION_NAME")

if not project_id or not subscription_name:
    raise RuntimeError("Las variables de entorno PUBSUB_PROJECT_ID y PUBSUB_SUBSCRIPTION_NAME deben estar definidas")

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
        print("Listener detenido.")

if __name__ == "__main__":
    iniciar_escucha()