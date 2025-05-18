import os
import json
from google.cloud import pubsub_v1

os.environ["PUBSUB_EMULATOR_HOST"] = "localhost:8085"
os.environ["PUBSUB_PROJECT_ID"] = "mi-proyecto-local"

project_id = os.getenv("PUBSUB_PROJECT_ID")
topic_name = "notificaciones"
topic_path = f"projects/{project_id}/topics/{topic_name}"

publisher = pubsub_v1.PublisherClient()

def publicar_mensaje(data: dict):
    data_str = json.dumps(data)
    data_bytes = data_str.encode("utf-8")
    future = publisher.publish(topic_path, data=data_bytes)
    print(f"Mensaje publicado con ID: {future.result()}")

if __name__ == "__main__":
    mensaje = {
        "type": "solicitudEnviada",
        "data": {
            "remitente": {
                "id": "user_01",
                "nombre": "Juan Pérez",
                "correo": "juan@example.com"
            },
            "destinatario": {
                "id": "user_02",
                "nombre": "María López",
                "correo": "jhordanbrayan64@gmail.com"
            },
            "tituloProyecto": "Algoritmo de Naive Bayes para la ruleta del casino",
            "areaInvestigacion": "Ciencias del Fracaso",
            "universidad": "Universidad Sideral Carrion"
        }
    }
    print("Publicando mensaje...")
    publicar_mensaje(mensaje)