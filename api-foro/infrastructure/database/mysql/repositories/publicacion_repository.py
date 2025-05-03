from sqlalchemy.orm import Session
from infrastructure.database.mysql.models.publicacion_model import PublicacionModel

class PublicacionRepository:
    def __init__(self, db: Session):
        self.db = db

    def obtener_todas(self):
        return self.db.query(PublicacionModel).filter_by(visible=True).all()