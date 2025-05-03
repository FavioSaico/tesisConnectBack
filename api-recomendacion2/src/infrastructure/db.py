from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from src.config.settings import settings

DATABASE_URL = settings.DATABASE_URL  # Definimos la URL en el archivo settings.py

# Creación de la conexión a la base de datos
engine = create_engine(DATABASE_URL, echo=True)

# Creación de sesiones de la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declaración de la base para los modelos
Base = declarative_base()