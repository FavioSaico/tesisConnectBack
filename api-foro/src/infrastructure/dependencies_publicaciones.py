from sqlalchemy.orm import Session
from fastapi import Depends
from infrastructure.config.mysql import SessionLocal
from infrastructure.config.mongodb import get_mongo_collection
from infrastructure.database.mysql.repositories.repositorio_publicacion_impl import RepositorioPublicacionImpl
from infrastructure.database.mongodb.repositories.repositorio_comentario_impl import RepositorioComentarioImpl
from application.use_cases.publicacion.listar_publicaciones import ListarPublicacionesUseCase
from application.use_cases.publicacion.crear_publicacion import CrearPublicacionUseCase
from application.use_cases.publicacion.obtener_publicacion import ObtenerPublicacionUseCase
from application.use_cases.publicacion.eliminar_publicacion import EliminarPublicacionUseCase
from application.use_cases.publicacion.marcar_comentario_como_respuesta import MarcarComentarioComoRespuestaUseCase
from application.use_cases.publicacion.desmarcar_comentario_como_respuesta import DesmarcarComentarioComoRespuestaUseCase
from application.use_cases.comentario.obtener_comentarios_por_publicacion import ObtenerComentariosPorPublicacionUseCase
from application.use_cases.comentario.crear_comentario import CrearComentarioUseCase
from application.use_cases.comentario.obtener_comentario_por_id import ObtenerComentarioPorIdUseCase
from application.use_cases.comentario.eliminar_comentario import EliminarComentarioUseCase

# SQLAlchemy
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Repositorios
def get_repositorio_publicacion(db: Session = Depends(get_db)):
    return RepositorioPublicacionImpl(db)

def get_repositorio_comentario():
    coleccion = get_mongo_collection("comentarios")
    return RepositorioComentarioImpl(coleccion)

# Casos de uso - Publicación
def get_listar_publicaciones_use_case(publicacion_repo=Depends(get_repositorio_publicacion)):
    return ListarPublicacionesUseCase(publicacion_repo)

def get_crear_publicacion_use_case(repo=Depends(get_repositorio_publicacion)):
    return CrearPublicacionUseCase(repo)

def get_obtener_publicacion_use_case(repo=Depends(get_repositorio_publicacion)):
    return ObtenerPublicacionUseCase(repo)

def get_eliminar_publicacion_use_case(repo=Depends(get_repositorio_publicacion)):
    return EliminarPublicacionUseCase(repo)

def get_desmarcar_respuesta_use_case(repo=Depends(get_repositorio_publicacion)):
    return DesmarcarComentarioComoRespuestaUseCase(repo)

def get_marcar_respuesta_use_case(
    publicacion_repo=Depends(get_repositorio_publicacion),
    comentario_repo=Depends(get_repositorio_comentario)
):
    return MarcarComentarioComoRespuestaUseCase(publicacion_repo, comentario_repo)

# Casos de uso - Comentario
def get_crear_comentario_use_case(
    publicacion_repo=Depends(get_repositorio_publicacion),
    comentario_repo=Depends(get_repositorio_comentario)
):
    return CrearComentarioUseCase(comentario_repo, publicacion_repo)

def get_obtener_comentario_por_id_use_case(
    publicacion_repo=Depends(get_repositorio_publicacion),
    comentario_repo=Depends(get_repositorio_comentario)
):
    return ObtenerComentarioPorIdUseCase(comentario_repo, publicacion_repo)

def get_eliminar_comentario_use_case(
    publicacion_repo=Depends(get_repositorio_publicacion),
    comentario_repo=Depends(get_repositorio_comentario)
):
    return EliminarComentarioUseCase(comentario_repo, publicacion_repo)

def get_obtener_comentarios_por_publicacion_use_case(
    publicacion_repo=Depends(get_repositorio_publicacion),
    comentario_repo=Depends(get_repositorio_comentario)
):
    return ObtenerComentariosPorPublicacionUseCase(publicacion_repo, comentario_repo)