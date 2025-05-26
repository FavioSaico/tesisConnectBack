import grpc
from concurrent import futures

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'proto_generated')))

import user_pb2
import user_pb2_grpc
import foro_pb2
import foro_pb2_grpc

class ForoService(foro_pb2_grpc.ForoServiceServicer):
    def GetPost(self, request, context):
        # Cliente gRPC que consulta al servicio de usuario
        with grpc.insecure_channel('localhost:50051') as channel:
            stub = user_pb2_grpc.UserServiceStub(channel)
            user_response = stub.GetUser(user_pb2.UserRequest(user_id=request.user_id))

        return foro_pb2.PostResponse(
            title="Presentación de Proyecto",
            content="Este es un post de bienvenida al sistema.",
            author_name=user_response.name
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
