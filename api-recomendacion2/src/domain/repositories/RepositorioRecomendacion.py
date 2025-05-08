
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
    def obtener_recomendaciones_por_fecha(self, fecha: date):
        pass

    @abstractmethod
    def obtener_recomendaciones_por_tipo(self, tipo: str):
        pass

    @abstractmethod
    def obtener_recomendaciones_por_fecha_y_tipo(self, fecha: date, tipo: str):
        pass