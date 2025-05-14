from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

class CrearPublicacionDTO(BaseModel):
    idUsuario: int = Field(..., gt=0)
    idCategoria: int = Field(..., gt=0)
    titulo: str = Field(..., min_length=1, max_length=100)
    contenido: str = Field(..., min_length=1, max_length=200)

class MostrarPublicacionDTO(BaseModel):
    idPublicacion: int = Field(..., gt=0)
    idUsuario: int = Field(..., gt=0)
    idCategoria: int = Field(..., gt=0)
    titulo: str = Field(..., min_length=1, max_length=100)
    contenido: str = Field(..., min_length=1, max_length=200)
    idEstado: int = Field(..., gt=0)
    idComentarioRespuesta: Optional[str] = None
    fechaCreacion: datetime