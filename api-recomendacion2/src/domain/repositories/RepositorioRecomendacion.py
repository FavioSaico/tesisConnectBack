
# src/domain/repositories/RepositorioRecomendacion.py
from abc import ABC, abstractmethod
from datetime import date

class RepositorioRecomendacion(ABC):
    @abstractmethod
    def guardar_recomendaciones(self, recomendaciones):
        pass

    @abstractmethod
    def obtener_recomendaciones(self):
        pass

    @abstractmethod
    def obtener_recomendaciones_por_id(self, id_investigador: int):
        pass

    @abstractmethod
    def obtener_usuarios_con_especialidades_y_publicaciones(self):
        pass
    
    @abstractmethod
    def obtener_recomendaciones_por_id_y_fecha_asesor(self, id_investigador: int):
        pass
