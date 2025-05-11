from dotenv import load_dotenv
load_dotenv()

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field


class Settings(BaseSettings):
    # Configuración para usar dotenv (comentada porque usaremos valores fijos)
    # model_config = SettingsConfigDict(env_file=".env")

    MYSQL_HOST: str = Field(..., env="MYSQL_HOST")
    MYSQL_PORT: int = Field(..., env="MYSQL_PORT")
    MYSQL_USER: str = Field(..., env="MYSQL_USER")
    MYSQL_PASS: str = Field(..., env="MYSQL_PASS")
    MYSQL_DB_NAME: str = Field(..., env="MYSQL_DB_NAME")

    PORT: int = Field(..., env="PORT")

    model_config = SettingsConfigDict(env_file=".env")

    @property
    def DATABASE_URL(self):
        return (
            f"mysql+mysqlconnector://{self.MYSQL_USER}:{self.MYSQL_PASS}"
            f"@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DB_NAME}"
        )

settings = Settings()