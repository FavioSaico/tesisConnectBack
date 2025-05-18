pip install pydantic[email]

http://127.0.0.1:8000/notificacion/

docker build -t notificaciones-service .

docker run -d -p 8080:8080 --name notificaciones notificaciones-service