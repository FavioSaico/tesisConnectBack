
import { NextFunction, Request, Response } from 'express';
import { JwtAdapter } from '../../config/jwt';
import { UserModel } from '../../infrastructure/data/mongodb';

export class AuthMiddleware {

    // NextFunction es la función que se llamara cuando la validación sea correcta
    static validateJWT = async(req: Request, res: Response, next: NextFunction ) => {

        // console.log("Paso por el middleware");
        
        // obtenemos el Authorization del header
        const authorization = req.header('Authorization');
        if ( !authorization ) return res.status(401).json({ error: 'No token provided' }); // no hay token
        if ( !authorization.startsWith('Bearer ') ) return res.status(401).json({ error: 'Invalid Bearer token' }); // debe empezar con Bearer y un espacio
    
        const token = authorization.split(' ').at(1) || ''; // extraigo el token
    
        try {
    
            // implementamos el METODO validateToken
            const payload = await JwtAdapter.validateToken<{id:string}>(token);
            if ( !payload ) return res.status(401).json({ error: 'Invalid token' });
    
            // Con el id del usuario es que vamos a obtenerkis y validarlo
            // Por el momento mezclamos nuestro middleware con la base de datos, esto lo modificaremos despues.
            const user = await UserModel.findById(payload.id);
            if ( !user ) return res.status(401).json({ error: 'Invalid token - user not found' })
    
            // Colocamos el usuario en al peticion para que el controllador los user
            req.body.user = user;
            // req.body.payload=payload; // retornamos el token en el body de la petición

            next(); // método que ejecuta el siguiente método, que será un middleware o el controlador
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal server error' });
        }

    }
}