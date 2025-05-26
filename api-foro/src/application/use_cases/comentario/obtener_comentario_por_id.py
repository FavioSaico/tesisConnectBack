from domain.services.servicio_foro_academico import ServicioForoAcademico
from domain.repositories.repositorio_comentario import RepositorioComentario
from domain.repositories.repositorio_publicacion import RepositorioPublicacion
from application.mappers.comentario_mapper import construir_comentarios_jerarquicos

class ObtenerComentarioPorIdUseCase:
    def __init__(self, comentario_repo: RepositorioComentario, publicacion_repo: RepositorioPublicacion):
        self.comentario_repo = comentario_repo
        self.publicacion_repo = publicacion_repo


    def ejecutar(self, id_comentario: str, id_publicacion:int):
        publicacion = self.publicacion_repo.obtener_por_id(id_publicacion)
        if not publicacion:
            raise ValueError("La publicacion no existe")
        comentarios = self.comentario_repo.obtener_con_respuestas_por_id(id_comentario)
        if not comentarios:
            raise ValueError("El comentario no existe")
        comentario_raiz = comentarios[0]
        print("Comentarios encontrados:")
        for c in comentarios:
            print(f"ID={c.idComentario}, Padre={c.idComentarioPadre}")
        ServicioForoAcademico.ValidarComentarioPublicacion(publicacion, comentario_raiz)
        return construir_comentarios_jerarquicos(comentarios)
        