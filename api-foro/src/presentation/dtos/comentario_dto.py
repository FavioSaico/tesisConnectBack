from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class CrearComentarioDTO(BaseModel):
    idUsuario: int = Field(..., gt=0)
    idPublicacion: int = Field(..., gt=0)
    contenido: str = Field(..., min_length=1, max_length=200)
    idComentarioPadre: Optional[str] = None

class MostrarComentarioDTO(BaseModel):
    idUsuario: int = Field(..., gt=0)
    idPublicacion: int = Field(..., gt=0)
    contenido: str = Field(..., min_length=1, max_length=200)
    idComentarioPadre: Optional[str] = None
    fechaCreacion: datetime