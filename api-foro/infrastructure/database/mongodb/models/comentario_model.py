from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ComentarioModel(BaseModel):
    contenido: str
    idUsuario: int
    idPublicacion: int
    idComentarioPadre: Optional[str] = None
    fechaCreacion: Optional[datetime] = None
    visible: bool = True
    id: Optional[str] = None