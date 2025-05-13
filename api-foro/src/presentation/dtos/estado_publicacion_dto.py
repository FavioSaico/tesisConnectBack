from pydantic import BaseModel, Field

class MostrarEstadoPublicacionDTO(BaseModel):
    tipo: str = Field(..., min_length=1, max_length=50)