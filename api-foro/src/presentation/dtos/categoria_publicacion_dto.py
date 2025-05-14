from pydantic import BaseModel, Field

class MostrarCategoriaPublicacionDTO(BaseModel):
    id: int = Field(..., gt=0)
    nombre: str = Field(..., min_length=1, max_length=50)