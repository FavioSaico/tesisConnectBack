from sqlalchemy.orm import Session
from domain.entities.publicacion import Publicacion
from infrastructure.database.mysql.models.publicacion_model import PublicacionModel
from application.mappers.publicacion_mapper import model_a_entidad, entidad_a_model, actualizar_model

class PublicacionRepository:
    def __init__(self, db: Session):
        self.db = db

    def obtener_todas(self):
        return self.db.query(PublicacionModel).filter_by(visible=True).all()

    def crear(self, publicacion: Publicacion) -> Publicacion:
        nueva = entidad_a_model(publicacion)
        self.db.add(nueva)
        self.db.commit()
        self.db.refresh(nueva)
        publicacion.idPublicacion = nueva.idPublicacion
        return publicacion
    
    def obtener_por_id(self, id_publicacion: int) -> Publicacion | None:
        modelo = (
            self.db.query(PublicacionModel)
            .filter(PublicacionModel.idPublicacion == id_publicacion)
            .filter(PublicacionModel.visible == True)
            .first()
        )
        if not modelo:
            return None
        return model_a_entidad(modelo)
    
    def eliminar(self, id_publicacion: int) -> bool:
        publicacion_bd= self.db.query(PublicacionModel).filter_by(idPublicacion=id_publicacion).first()
        if publicacion_bd and publicacion_bd.visible:
            publicacion = model_a_entidad(publicacion_bd)
            publicacion.eliminar()
            actualizar_model(publicacion_bd, publicacion)
            self.db.commit()
            return True
        return False

    def actualizar(self, actualizada: Publicacion) -> bool:
        publicacion_bd = self.db.query(PublicacionModel).filter_by(idPublicacion=actualizada.idPublicacion).first()
        if not publicacion_bd:
            return False
        actualizar_model(publicacion_bd, actualizada)
        self.db.commit()
        return True