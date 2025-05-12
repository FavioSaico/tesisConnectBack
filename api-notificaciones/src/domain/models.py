from pydantic import BaseModel, EmailStr

class Notificacion(BaseModel):
    destinatario: EmailStr
    asunto: str
    cuerpo: str
