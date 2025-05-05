from datetime import datetime
from typing import Optional

class Comentario:
    def __init__(
        self,
        contenido: str,
        idUsuario: int,
        idPublicacion: int,
        idComentarioPadre: Optional[str] = None,
        fechaCreacion: Optional[datetime] = None,
        visible: bool = True,
        id: Optional[str] = None,
    ):
        self.id = id
        self.contenido = contenido
        self.idUsuario = idUsuario
        self.idPublicacion = idPublicacion
        self.idComentarioPadre = idComentarioPadre
        self.fechaCreacion = fechaCreacion or datetime.utcnow()
        self.visible = visible

    def eliminar(self):
        self.visible = False