import os
import json
from google.cloud import pubsub_v1
from src.application.use_cases import procesar_notificacion
from src.domain.models import Notificacion

# Configuración para el emulador local de Pub/Sub
os.environ["PUBSUB_EMULATOR_HOST"] = "localhost:8085"
os.environ["PUBSUB_PROJECT_ID"] = "mi-proyecto-local"

project_id = os.getenv("PUBSUB_PROJECT_ID")
subscription_name = "notificaciones-sub"

subscriber = pubsub_v1.SubscriberClient()
subscription_path = subscriber.subscription_path(project_id, subscription_name)

def callback(message):
    print(f"🔔 Mensaje recibido: {message.data}")
    try:
        data_dict = json.loads(message.data.decode("utf-8"))
        # Convertir dict a objeto Notificacion usando parse_obj (Pydantic)
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
        streaming_pull_future.result()  # Bloquea y mantiene el listener activo
    except KeyboardInterrupt:
        streaming_pull_future.cancel()
        print("Listener detenido.")

if __name__ == "__main__":
    iniciar_escucha()