import grpc
from concurrent import futures
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'grpc-test', 'proto_generated')))

import user_pb2
import user_pb2_grpc
import foro_pb2
import foro_pb2_grpc

from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "mysql+pymysql://root:admin@localhost:3306/foro"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Publicacion(Base):
    __tablename__ = "publicaciones"
    idPublicacion = Column(Integer, primary_key=True, index=True)
    idUsuario = Column(Integer, nullable=False)
    titulo = Column(String(255))
    contenido = Column(Text)
    fechaCreacion = Column(DateTime)

class ForoService(foro_pb2_grpc.ForoServiceServicer):
    def __init__(self):
        self.db = SessionLocal()

    def GetPost(self, request, context):
        post = self.db.query(Publicacion).filter(Publicacion.idPublicacion == request.post_id).first()
        if not post:
            context.abort(grpc.StatusCode.NOT_FOUND, "Publicación no encontrada.")

        author_name = "Usuario no encontrado"

        try:
            with grpc.insecure_channel('localhost:50051') as channel:
                stub = user_pb2_grpc.UserServiceStub(channel)
                user_response = stub.GetUser(user_pb2.UserRequest(user_id=str(post.idUsuario)))
                author_name = user_response.name
        except grpc.RpcError as e:
            if e.code() == grpc.StatusCode.NOT_FOUND:
                print(f"Usuario no encontrado para ID = {post.idUsuario}, mostrando nombre por defecto.")
            else:
                print(f"Error inesperado al llamar al servicio de usuario: {e}")

        return foro_pb2.PostResponse(
            title=post.titulo,
            content=post.contenido,
            author_name=author_name
        )

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    foro_pb2_grpc.add_ForoServiceServicer_to_server(ForoService(), server)
    server.add_insecure_port('[::]:50052')
    server.start()
    print("Foro gRPC server running on port 50052.")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
