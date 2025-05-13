from domain.entities.publicacion import Publicacion
from domain.entities.comentario import Comentario

class ServicioForoAcademico:
    
    @staticmethod
    def ValidarComentarioPublicacion(publicacion: Publicacion, comentario: Comentario):
        if comentario.idPublicacion != publicacion.idPublicacion:
            raise ValueError("El comentario no pertenece a esta publicación.")

    @staticmethod
    def MarcarComentarioComoRespuesta(publicacion: Publicacion, comentario: Comentario):
        if comentario.idComentarioPadre is not None:
            comentario.idComentario=comentario.idComentarioPadre
            
        if publicacion.idEstado == 2:
            raise ValueError("La publicación ya está en estado solucionada.")

        publicacion.cambiar_estado(2)
        publicacion.idComentarioRespuesta = comentario.idComentario

    @staticmethod
    def DesmarcarComentarioComoRespuesta(publicacion: Publicacion):
        if publicacion.idEstado == 1:
            raise ValueError("La publicación ya está en estado abierta.")

        publicacion.cambiar_estado(1) 
        publicacion.idComentarioRespuesta = None