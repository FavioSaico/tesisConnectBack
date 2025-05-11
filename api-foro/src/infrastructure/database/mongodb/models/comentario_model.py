from bson import ObjectId
from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ComentarioModel(BaseModel):
    contenido: str
    idUsuario: int
    idPublicacion: int
    idComentarioPadre: Optional[ObjectId] = None
    fechaCreacion: Optional[datetime] = None
    visible: bool = True
    idComentario: Optional[ObjectId] = None
    class Config:
        arbitrary_types_allowed=True
        json_encoders = {
            ObjectId: str
        }