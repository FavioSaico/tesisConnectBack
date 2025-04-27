# Módulo de Gestión de Sesión y Perfil de Usuario

Pasos para ejecutar el proyecto:

1. Ejecutar el comando `npm i`.
2. Crear la base de datos `tesisconnect` en MySQL.
3. Crear archivo `.env`:

```
  PORT=3000
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_USER=root
  MYSQL_DB_NAME=tesisconnect
  MYSQL_PASS=
  JWT_SEED=semillaParaJWT
```

4. Ejecutar el comando `npm run dev`.
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
- Documentación de [TypeORM](https://typeorm.io)