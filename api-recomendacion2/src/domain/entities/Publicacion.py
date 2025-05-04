# src/domain/entities/Publicacion.py
class Publicacion:
    def __init__(self, titulo: str):
        self.titulo = titulo

    def __eq__(self, other):
        return isinstance(other, Publicacion) and self.titulo == other.titulo