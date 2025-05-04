class Usuario:
    def __init__(self, id, descripcion, lineaInvestigacion, rolTesista, rolAsesor):
        self.id = id
        self.descripcion = descripcion
        self.lineaInvestigacion = lineaInvestigacion
        self.rolTesista = rolTesista
        self.rolAsesor = rolAsesor
        self.especialidades = []
        self.publicaciones = []

    def agregarEspecialidad(self, especialidad):
        if especialidad not in self.especialidades:
            self.especialidades.append(especialidad)

    def agregarPublicacion(self, publicacion):
        if publicacion not in self.publicaciones:
            self.publicaciones.append(publicacion)