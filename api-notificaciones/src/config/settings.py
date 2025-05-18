# src/config/settings.py
import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field

class Settings(BaseSettings):
    ENV: str = Field(default="development", env="ENV")
    PUBSUB_PROJECT_ID: str = Field(..., env="PUBSUB_PROJECT_ID")
    PUBSUB_SUBSCRIPTION_NAME: str = Field(..., env="PUBSUB_SUBSCRIPTION_NAME")
    PUBSUB_EMULATOR_HOST: str | None = Field(default=None, env="PUBSUB_EMULATOR_HOST")

    model_config = SettingsConfigDict(
        env_file=".env" if os.getenv("ENV") != "production" else None,
        extra="ignore"
    )

settings = Settings()