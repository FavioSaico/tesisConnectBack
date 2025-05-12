#from dotenv import load_dotenv
#load_dotenv()
import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

# Solo carga .env si no estás en producción
if os.getenv("ENV") != "production":
    from dotenv import load_dotenv
    load_dotenv()

class Settings(BaseSettings):
    # Configuración para usar dotenv (comentada porque usaremos valores fijos)
    # model_config = SettingsConfigDict(env_file=".env")
    

    MYSQL_HOST: str = Field(..., env="MYSQL_HOST")
    MYSQL_PORT: int = Field(..., env="MYSQL_PORT")
    MYSQL_USER: str = Field(..., env="MYSQL_USER")
    MYSQL_PASS: str = Field(..., env="MYSQL_PASS")
    MYSQL_DB_NAME: str = Field(..., env="MYSQL_DB_NAME")
    ENV: str = Field(..., env="ENV")

    PORT: int = Field(..., env="PORT")

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def DATABASE_URL(self):
        return (
            f"mysql+mysqlconnector://{self.MYSQL_USER}:{self.MYSQL_PASS}"
            f"@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB_NAME}"
        )

settings = Settings()