from datetime import datetime
from typing import Optional

class Publicacion:
    def __init__(
        self,
        idPublicacion: int,
        idUsuario: int,
        idCategoria: int,
        titulo: str,
        contenido: str,
        fechaCreacion: datetime,
        visible: bool,
        idEstado: int,
        idComentarioRespuesta: Optional[str] = None
    ):
        self.idPublicacion = idPublicacion
        self.idUsuario = idUsuario
        self.idCategoria = idCategoria
        self.titulo = titulo
        self.contenido = contenido
        self.fechaCreacion = fechaCreacion
        self.visible = visible
        self.idEstado = idEstado
        self.idComentarioRespuesta = idComentarioRespuesta

    def eliminar(self):
        self.visible = False