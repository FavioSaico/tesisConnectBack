from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from src.config.database import settings  # <--- importar la instancia, no la clase

# 🔧 Usa la instancia para obtener la cadena, no la clase
DATABASE_URL = settings.DATABASE_URL

# Crear el engine correctamente
engine = create_engine(DATABASE_URL, echo=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()