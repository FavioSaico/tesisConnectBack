from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_HOST = os.getenv("MONGO_HOST")
MONGO_PORT = int(os.getenv("MONGO_PORT", 27017))

MONGO_URI = f"{MONGO_HOST}"
MONGO_DB_NAME = os.getenv("MONGO_DB_NAME")

# Cliente Mongo
client = MongoClient(MONGO_URI)
db = client[MONGO_DB_NAME]

def get_mongo_collection(nombre_coleccion: str):
    return db[nombre_coleccion]