from pymongo import MongoClient
import os

# URI y nombre de la base de datos
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME", "Foro")

# Cliente Mongo
client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

def get_mongo_collection(nombre_coleccion: str):
    return db[nombre_coleccion]