from src.application.services.RecomendacionServicio import RecomendacionServicio
from src.infrastructure.repositories.RepositorioRecomendacionImpl import RepositorioRecomendacionImpl

def get_recomendacion_servicio():
    repositorio = RepositorioRecomendacionImpl()
    return RecomendacionServicio(repositorio)