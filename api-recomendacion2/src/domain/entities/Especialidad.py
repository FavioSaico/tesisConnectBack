# src/domain/entities/Especialidad.py
class Especialidad:
    def __init__(self, nombre: str):
        self.nombre = nombre

    def __eq__(self, other):
        return isinstance(other, Especialidad) and self.nombre == other.nombre
