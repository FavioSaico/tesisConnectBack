from sqlalchemy.orm import Session
from domain.entities.publicacion import Publicacion
from infrastructure.database.mysql.models.publicacion_model import PublicacionModel

class PublicacionRepository:
    def __init__(self, db: Session):
        self.db = db

    def obtener_todas(self):
        return self.db.query(PublicacionModel).filter_by(visible=True).all()
    
    def crear(self, publicacion: Publicacion):
        nueva = PublicacionModel(
            idUsuario=publicacion.idUsuario,
            idCategoria=publicacion.idCategoria,
            titulo=publicacion.titulo,
            contenido=publicacion.contenido,
            fechaCreacion=publicacion.fechaCreacion,
            visible=publicacion.visible,
            idEstado=publicacion.idEstado,
            idComentarioRespuesta=publicacion.idComentarioRespuesta
        )
        self.db.add(nueva)
        self.db.commit()
        self.db.refresh(nueva)
        publicacion.idPublicacion = nueva.idPublicacion
        return publicacion
    
    def obtener_por_id(self, id_publicacion: int):
        return (
            self.db.query(PublicacionModel)
            .filter(PublicacionModel.idPublicacion == id_publicacion)
            .filter(PublicacionModel.visible == True)
            .first()
        )
    
    def eliminar(self, id_publicacion: int):
        publicacion = self.db.query(PublicacionModel).filter_by(idPublicacion=id_publicacion).first()
        if publicacion and publicacion.visible:
            publicacion.visible = False
            self.db.commit()
            return True
        return False

    def actualizar(self, publicacion: Publicacion):
        publicacion_bd = self.db.query(PublicacionModel).filter_by(idPublicacion=publicacion.idPublicacion).first()
        if not publicacion_bd:
            return False

        publicacion_bd.idUsuario = publicacion.idUsuario
        publicacion_bd.idCategoria = publicacion.idCategoria
        publicacion_bd.titulo = publicacion.titulo
        publicacion_bd.contenido = publicacion.contenido
        publicacion_bd.fechaCreacion = publicacion.fechaCreacion
        publicacion_bd.visible = publicacion.visible
        publicacion_bd.idEstado = publicacion.idEstado
        publicacion_bd.idComentarioRespuesta = publicacion.idComentarioRespuesta

        self.db.commit()
        return True