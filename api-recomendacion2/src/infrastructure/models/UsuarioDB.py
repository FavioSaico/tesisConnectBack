from sqlalchemy import Column, Integer, Text
from src.domain.entities.Usuario import Usuario
from src.infrastructure.db import Base

class UsuarioDB(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    descripcion = Column(Text, nullable=True)
    linea_investigacion = Column(Text, nullable=True)
    rol_tesista = Column(Integer, default=0)
    rol_asesor = Column(Integer, default=0)

    def __init__(self, id, descripcion, linea_investigacion, rol_tesista, rol_asesor):
        self.id = id
        self.descripcion = descripcion
        self.linea_investigacion = linea_investigacion
        self.rol_tesista = rol_tesista
        self.rol_asesor = rol_asesor

    @classmethod
    def from_usuario(cls, usuario: Usuario):
        """Convierte una instancia de Usuario a UsuarioDB."""
        return cls(
            id=usuario.id,
            descripcion=usuario.descripcion,
            linea_investigacion=usuario.lineaInvestigacion,
            rol_tesista=usuario.rolTesista,
            rol_asesor=usuario.rolAsesor,
        )

    def to_usuario(self):
        """Convierte una instancia de UsuarioDB a Usuario."""
        return Usuario(
            id=self.id,
            descripcion=self.descripcion,
            lineaInvestigacion=self.linea_investigacion,
            rolTesista=self.rol_tesista,
            rolAsesor=self.rol_asesor,
        )