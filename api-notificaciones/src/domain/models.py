from pydantic import BaseModel, EmailStr

class Usuario(BaseModel):
    id: str
    nombre: str
    correo: EmailStr

class DataSolicitud(BaseModel):
    remitente: Usuario
    destinatario: Usuario
    tituloProyecto: str
    areaInvestigacion: str
    universidad: str

class Notificacion(BaseModel):
    type: str
    data: DataSolicitud