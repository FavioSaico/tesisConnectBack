import grpc

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'proto_generated')))

import user_pb2
import user_pb2_grpc

def run():
    # Conectarse al servidor en localhost
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = user_pb2_grpc.UserServiceStub(channel)
        
        # Crear una solicitud
        request = user_pb2.UserRequest(user_id="3")
        
        # Llamar al método remoto
        response = stub.GetUser(request)
        
        print(f"Nombre: {response.name}")

if __name__ == '__main__':
    run()
