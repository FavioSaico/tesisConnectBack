from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from infrastructure.config.mysql import SessionLocal
from infrastructure.config.mongodb import get_mongo_collection
from infrastructure.database.mongodb.repositories.repositorio_comentario_impl import RepositorioComentarioImpl
from infrastructure.database.mysql.repositories.repositorio_publicacion_impl import RepositorioPublicacionImpl
from presentation.dtos.publicacion_dto import CrearPublicacionDTO
from application.use_cases.publicacion.crear_publicacion import CrearPublicacionUseCase
from application.use_cases.publicacion.obtener_publicacion import ObtenerPublicacionUseCase
from application.use_cases.publicacion.eliminar_publicacion import EliminarPublicacionUseCase
from application.use_cases.publicacion.marcar_comentario_como_respuesta import MarcarComentarioComoRespuestaUseCase
from application.use_cases.publicacion.desmarcar_comentario_como_respuesta import DesmarcarComentarioComoRespuestaUseCase

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/publicaciones/")
def listar_publicaciones(db: Session = Depends(get_db)):
    repo = RepositorioPublicacionImpl(db)
    publicaciones = repo.obtener_todas()
    return publicaciones

@router.post("/publicaciones/")
def crear_publicacion(dto: CrearPublicacionDTO, db: Session = Depends(get_db)):
    try:
        repo = RepositorioPublicacionImpl(db)
        use_case = CrearPublicacionUseCase(repo)
        nueva = use_case.ejecutar(dto)
        return {"mensaje": "Publicación creada", "id": nueva.idPublicacion}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/publicaciones/{id}")
def obtener_publicacion(id: int, db: Session = Depends(get_db)):
    try:
        repo = RepositorioPublicacionImpl(db)
        use_case = ObtenerPublicacionUseCase(repo)
        publicacion = use_case.ejecutar(id)
        return {
            "idPublicacion": publicacion.idPublicacion,
            "titulo": publicacion.titulo,
            "contenido": publicacion.contenido,
            "idUsuario": publicacion.idUsuario,
            "idCategoria": publicacion.idCategoria,
            "fechaCreacion": publicacion.fechaCreacion,
            "idEstado": publicacion.idEstado,
            "idComentarioRespuesta": publicacion.idComentarioRespuesta
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/publicaciones/{id}")
def eliminar_publicacion(id: int, db: Session = Depends(get_db)):
    try:
        repo = RepositorioPublicacionImpl(db)
        use_case = EliminarPublicacionUseCase(repo)
        use_case.ejecutar(id)
        return {"mensaje": "Publicación eliminada correctamente"}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/publicaciones/{id_publicacion}/desmarcar_respuesta")
def marcar_comentario_como_respuesta(id_publicacion: int, db: Session = Depends(get_db)):
    publicacion_repo = RepositorioPublicacionImpl(db)
    use_case = DesmarcarComentarioComoRespuestaUseCase(publicacion_repo)
    try:
        resultado = use_case.ejecutar(id_publicacion)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

def obtener_repositorio():
    coleccion = get_mongo_collection("comentarios")
    return RepositorioComentarioImpl(coleccion)

@router.post("/publicaciones/{id_publicacion}/comentarios/{id_comentario}/marcar_respuesta")
def marcar_comentario_como_respuesta(id_publicacion: int, id_comentario: str, db: Session = Depends(get_db), comentario_repo = Depends(obtener_repositorio)):
    publicacion_repo = RepositorioPublicacionImpl(db)
    use_case = MarcarComentarioComoRespuestaUseCase(publicacion_repo, comentario_repo)
    try:
        resultado = use_case.ejecutar(id_publicacion, id_comentario)
        return resultado
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))