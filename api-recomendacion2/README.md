# Módulo de Gestión de Sesión y Perfil de Usuario

Pasos para ejecutar el proyecto:

1. Crear la base de datos `tesisconnect` en MySQL.
2. Crear archivo `.env`:

```
  PORT=3000
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=root
  MYSQL_DB_NAME=tesisconnect
  MYSQL_PASS=
  JWT_SEED=semillaParaJWT
```

3. Ejecutar el comando `uvicorn src.main:app --reload` para levantar el proyecto.
4. Ejecutar una petición GET al endpoint `/api/seed/gradoAcademico` para llenar la tabla de Grado Académico.
5. Prueba los endpoints y envía los datos correspondientes:
  - `/api/auth/login`.

  ```
    {
      "id_grado_academico": 1,    
      "nombre": "Juan",
      "apellido": "Perez",
      "correo": "juan@gmail.com",
      "contrasenia": "123456",
      "descripcion": "IA",
      "rol_asesor": true
    }
  ```

  - `/api/auth/register`.

  ```
    { 
      "correo": "favio4@gmail.com",
      "contrasenia": "123456"
    }
  ```


Documentación:
- [TypeORM](https://typeorm.io)