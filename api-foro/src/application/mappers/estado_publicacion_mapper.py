from domain.entities.estado_publicacion import EstadoPublicacion
from infrastructure.database.mysql.models.estado_publicacion_model import EstadoPublicacionModel
from presentation.dtos.estado_publicacion_dto import MostrarEstadoPublicacionDTO

def model_a_entidad(modelo: EstadoPublicacionModel) -> EstadoPublicacion:
    return EstadoPublicacion(
        id=modelo.id,
        tipo=modelo.tipo
    )

def entidad_a_DTO(entidad: EstadoPublicacion) -> MostrarEstadoPublicacionDTO:
    return MostrarEstadoPublicacionDTO(
        tipo=entidad.tipo
    )