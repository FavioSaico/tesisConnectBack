from sqlalchemy.orm import Session
from fastapi import Depends
from infrastructure.config.mysql import SessionLocal

from infrastructure.database.mysql.repositories.repositorio_categoria_publicacion_impl import RepositorioCategoriaPublicacionImpl
from infrastructure.database.mysql.repositories.repositorio_estado_publicacion_impl import RepositorioEstadoPublicacionImpl
from application.use_cases.categoria_publicacion.listar_categorias import ListarCategoriasUseCase
from application.use_cases.estado_publicacion.listar_estados import ListarEstadosUseCase

# SQLAlchemy
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Repositorios
def get_repositorio_categoria(db: Session = Depends(get_db)):
    return RepositorioCategoriaPublicacionImpl(db)

def get_repositorio_estado(db: Session = Depends(get_db)):
    return RepositorioEstadoPublicacionImpl(db)


# Casos de uso - Categoria
def get_listar_categorias_use_case(categoria_repo=Depends(get_repositorio_categoria)):
    return ListarCategoriasUseCase(categoria_repo)

# Casos de uso - Estado
def get_listar_estados_use_case(estado_repo=Depends(get_repositorio_estado)):
    return ListarEstadosUseCase(estado_repo)