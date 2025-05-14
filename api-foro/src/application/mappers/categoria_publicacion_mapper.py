from domain.entities.categoria_publicacion import CategoriaPublicacion
from infrastructure.database.mysql.models.categoria_publicacion_model import CategoriaPublicacionModel
from presentation.dtos.categoria_publicacion_dto import MostrarCategoriaPublicacionDTO

def model_a_entidad(modelo: CategoriaPublicacionModel) -> CategoriaPublicacion:
    return CategoriaPublicacion(
        id=modelo.id,
        nombre=modelo.nombre
    )

def entidad_a_DTO(entidad: CategoriaPublicacion) -> MostrarCategoriaPublicacionDTO:
    return MostrarCategoriaPublicacionDTO(
        id=entidad.id,
        nombre=entidad.nombre
    )