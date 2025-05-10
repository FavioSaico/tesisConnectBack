from pydantic import BaseModel
from typing import List
import re

class InvestigadorDto(BaseModel):
    id: int
    descripcion: str = ""
    lineaInvestigacion: str = ""
    rolTesista: int = 0
    rolAsesor: int = 0
    especialidades: List[str] = []
    publicaciones: List[str] = []

    def texto_completo(self) -> str:
        def limpiar(texto):
            texto = texto.lower()
            texto = re.sub(r'\s+', ' ', texto)
            return texto.strip()

        # Ponderación simple (mayor peso a campos clave)
        descripcion = limpiar(self.descripcion) * 3
        linea = limpiar(self.lineaInvestigacion) * 3
        especialidades = " ".join([limpiar(e) for e in self.especialidades]) * 2
        publicaciones = " ".join([limpiar(p) for p in self.publicaciones])

        return f"{descripcion} {linea} {especialidades} {publicaciones}"