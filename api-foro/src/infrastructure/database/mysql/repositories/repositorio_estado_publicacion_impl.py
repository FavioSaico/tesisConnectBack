from typing import List, Optional
from sqlalchemy.orm import Session
from domain.entities.estado_publicacion import EstadoPublicacion
from domain.repositories.repositorio_estado_publicacion import RepositorioEstadoPublicacion
from infrastructure.database.mysql.models.estado_publicacion_model import EstadoPublicacionModel
from application.mappers.estado_publicacion_mapper import model_a_entidad

class RepositorioEstadoPublicacionImpl(RepositorioEstadoPublicacion):
    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> List[EstadoPublicacion]:
        estados = self.db.query(EstadoPublicacionModel).all()
        return [model_a_entidad(e) for e in estados]