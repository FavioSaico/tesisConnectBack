from typing import List, Optional
from sqlalchemy.orm import Session
from domain.entities.categoria_publicacion import CategoriaPublicacion
from domain.repositories.repositorio_categoria_publicacion import RepositorioCategoriaPublicacion
from infrastructure.database.mysql.models.categoria_publicacion_model import CategoriaPublicacionModel
from application.mappers.categoria_publicacion_mapper import model_a_entidad

class RepositorioCategoriaPublicacionImpl(RepositorioCategoriaPublicacion):
    def __init__(self, db: Session):
        self.db = db

    def listar(self) -> List[CategoriaPublicacion]:
        categorias = self.db.query(CategoriaPublicacionModel).all()
        return [model_a_entidad(m) for m in categorias]