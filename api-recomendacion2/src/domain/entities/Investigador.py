# src/domain/entities/Investigador.py
class Investigador:
    def __init__(self, id, descripcion, lineaInvestigacion, rolTesista, rolAsesor, especialidades=[], publicaciones=[]):
        self.id = id
        self.descripcion = descripcion or ""
        self.lineaInvestigacion = lineaInvestigacion or ""
        self.rolTesista = rolTesista
        self.rolAsesor = rolAsesor
        self.especialidades = especialidades
        self.publicaciones = publicaciones

    def texto_completo(self):
        texto = f"{self.descripcion} {self.lineaInvestigacion} {' '.join(self.especialidades)} {' '.join(self.publicaciones)}"
        return texto.strip()