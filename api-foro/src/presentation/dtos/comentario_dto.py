from datetime import datetime
from pydantic import BaseModel, Field, field_validator
from typing import Optional

class CrearComentarioDTO(BaseModel):
    idUsuario: int = Field(..., gt=0)
    contenido: str = Field(..., min_length=1, max_length=200)
    idComentarioPadre: Optional[str] = None

class MostrarComentarioDTO(BaseModel):
    idComentario: str = Field(..., min_length=1, max_length=25)
    idUsuario: int = Field(..., gt=0)
    idPublicacion: int = Field(..., gt=0)
    contenido: str = Field(..., min_length=1, max_length=200)
    idComentarioPadre: Optional[str] = None
    fechaCreacion: datetime