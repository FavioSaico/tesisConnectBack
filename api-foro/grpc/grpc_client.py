import grpc

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'proto_generated')))

import foro_pb2
import foro_pb2_grpc

def run():
    with grpc.insecure_channel('localhost:50052') as channel:
        stub = foro_pb2_grpc.ForoServiceStub(channel)
        response = stub.GetPost(foro_pb2.PostRequest(post_id="123", user_id="2"))
        print("Título:", response.title)
        print("Contenido:", response.content)
        print("Autor:", response.author_name)

if __name__ == '__main__':
    run()
