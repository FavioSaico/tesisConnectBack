from pydantic import BaseModel, Field

class MostrarEstadoPublicacionDTO(BaseModel):
    id: int = Field(..., gt=0)
    tipo: str = Field(..., min_length=1, max_length=50)