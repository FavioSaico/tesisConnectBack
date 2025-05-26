import grpc
from concurrent import futures
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'grpc-test', 'proto_generated')))

import user_pb2
import user_pb2_grpc

from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker

DATABASE_URL = "mysql+pymysql://root:admin@localhost:3306/tesisconnect"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()

class Usuario(Base):
    __tablename__ = 'Usuarios'
    id = Column(Integer, primary_key=True)
    nombre_completo = Column(String(100))

class UserService(user_pb2_grpc.UserServiceServicer):
    def GetUser(self, request, context):
        with SessionLocal() as db:
            user_id = int(request.user_id)
            user = db.query(Usuario).filter(Usuario.id == user_id).first()
            print(f"Buscando usuario con ID: {user_id}")
            if user:
                return user_pb2.UserResponse(name=user.nombre_completo)
            else:
                context.set_code(grpc.StatusCode.NOT_FOUND)
                context.set_details("Usuario no encontrado")
                return user_pb2.UserResponse()

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("User gRPC server running on port 50051.")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
