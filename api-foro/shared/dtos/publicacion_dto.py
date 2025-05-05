from pydantic import BaseModel, Field
from typing import Optional

class CrearPublicacionDTO(BaseModel):
    idUsuario: int = Field(..., gt=0)
    idCategoria: int = Field(..., gt=0)
    titulo: str = Field(..., min_length=1, max_length=100)
    contenido: str = Field(..., min_length=1, max_length=200)
    idEstado: Optional[int] = Field(default=1)
    idComentarioRespuesta: Optional[str] = None