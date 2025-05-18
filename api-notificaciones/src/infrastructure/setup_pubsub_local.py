import os
from google.cloud import pubsub_v1
from google.api_core.exceptions import AlreadyExists

# Variables para emulador local
# Esto solo para probarlo de manera local
os.environ["PUBSUB_EMULATOR_HOST"] = "localhost:8085"
os.environ["PUBSUB_PROJECT_ID"] = "mi-proyecto-local"

project_id = os.getenv("PUBSUB_PROJECT_ID")
topic_name = "notificaciones"
subscription_name = "notificaciones-sub"

publisher = pubsub_v1.PublisherClient()
subscriber = pubsub_v1.SubscriberClient()

topic_path = publisher.topic_path(project_id, topic_name)
subscription_path = subscriber.subscription_path(project_id, subscription_name)

# Crear topic si no existe
try:
    publisher.create_topic(request={"name": topic_path})
    print(f"Topic '{topic_name}' creado.")
except AlreadyExists:
    print(f"Topic '{topic_name}' ya existe.")

# Crear suscripción si no existe
try:
    subscriber.create_subscription(request={"name": subscription_path, "topic": topic_path})
    print(f"Suscripción '{subscription_name}' creada.")
except AlreadyExists:
    print(f"Suscripción '{subscription_name}' ya existe.")