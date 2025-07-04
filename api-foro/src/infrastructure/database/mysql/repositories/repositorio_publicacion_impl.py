import re
from typing import List, Optional
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_, func, asc, desc
from domain.entities.publicacion import Publicacion
from infrastructure.database.mysql.models.publicacion_model import PublicacionModel
from application.mappers.publicacion_mapper import model_a_entidad, entidad_a_model, actualizar_model
from domain.repositories.repositorio_publicacion import RepositorioPublicacion

class RepositorioPublicacionImpl(RepositorioPublicacion):
    def __init__(self, db: Session):
        self.db = db

    def listar(self, texto: Optional[str], id_categoria: Optional[List[int]], id_estado: Optional[List[int]], orden: Optional[str] = 'recientes') -> List[Publicacion]:
        query = self.db.query(PublicacionModel).filter_by(visible=True)
        if texto:
            texto_limpio = re.sub(r'[^\w\s]', '', texto)
            palabras = texto_limpio.lower().split()
            condiciones = []

            def limpiar_signos(campo):
                for signo in ['.', ',', ';', ':', '?', '!', '(', ')', '\'', '"', '/', '\\', '[', ']', '{', '}', '-', '_', '*', '=', '+']:
                    campo = func.replace(campo, signo, ' ')
                return campo

            for palabra in palabras:
                like_pattern = f"% {palabra} %"
                condiciones.append(
                    or_(
                        func.lower(func.concat(' ', limpiar_signos(PublicacionModel.titulo), ' ')).like(like_pattern),
                        func.lower(func.concat(' ', limpiar_signos(PublicacionModel.contenido), ' ')).like(like_pattern)
                    )
                )
            query = query.filter(and_(*condiciones))

        if id_categoria:
            query = query.filter(PublicacionModel.idCategoria.in_(id_categoria))

        if id_estado:
            query = query.filter(PublicacionModel.idEstado.in_(id_estado))

        if orden == 'antiguos':
            query = query.order_by(asc(PublicacionModel.fechaCreacion))
        else:
            query = query.order_by(desc(PublicacionModel.fechaCreacion))

        modelos = query.all()
        return [model_a_entidad(m) for m in modelos]

    def crear(self, publicacion: Publicacion) -> int:
        nueva = entidad_a_model(publicacion)
        self.db.add(nueva)
        self.db.commit()
        self.db.refresh(nueva)
        return nueva.idPublicacion
    
    def obtener_por_id(self, id_publicacion: int) -> Optional[Publicacion]:
        publicacion_bd = (
            self.db.query(PublicacionModel)
            .filter(PublicacionModel.idPublicacion == id_publicacion)
            .filter(PublicacionModel.visible == True)
            .first()
        )
        if not publicacion_bd:
            return None
        return model_a_entidad(publicacion_bd)
    
    def eliminar(self, id_publicacion: int) -> bool:
        publicacion_bd= self.db.query(PublicacionModel).filter_by(idPublicacion=id_publicacion).first()
        if publicacion_bd and publicacion_bd.visible:
            publicacion = model_a_entidad(publicacion_bd)
            publicacion.eliminar() # Cambia visible a False
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