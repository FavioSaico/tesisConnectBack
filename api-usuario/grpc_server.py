import grpc
from concurrent import futures

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'proto_generated')))

import user_pb2
import user_pb2_grpc


class UserService(user_pb2_grpc.UserServiceServicer):
    def GetUser(self, request, context):
        fake_users = {
            "1": "Ana Torres",
            "2": "Luis Paredes",
            "3": "Valeria Díaz"
        }
        print(f"Recibido user_id: {request.user_id}")
        name = fake_users.get(request.user_id, "Desconocido")
        return user_pb2.UserResponse(name=name)

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    user_pb2_grpc.add_UserServiceServicer_to_server(UserService(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print("User gRPC server running on port 50051.")
    server.wait_for_termination()

if __name__ == '__main__':
    serve()
