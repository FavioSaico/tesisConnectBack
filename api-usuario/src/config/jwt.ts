// Aquí usamos el patron adaptador
import * as jwt from 'jsonwebtoken';
import { envs } from './envs';

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {

    static async generateToken( 
        payload: Object,
        duration: string = '5h' ) // duración del token
        :Promise<string|null> {
        
        return new Promise( ( resolve ) => {
        
                // el token incluye el id
                jwt.sign( payload, JWT_SEED, { expiresIn: duration } as jwt.SignOptions, (err, token) => {
        
                    if ( err ) return resolve(null); // retorna null
            
                    resolve(token!); // retorna el token
                });
            } 
        );
    }


    // validamos y retornamos el contenido del token
    static validateToken<T>( token: string ): Promise<T | null> {
        return new Promise( (resolve) => {

            jwt.verify( token,JWT_SEED, (err, decoded) => { 

                if ( err ) return resolve(null);  // el token no es valido
                
                // retornamos el decoded
                // decoded los vamos a trata del tipo T, 
                resolve(decoded as T); 
            });
        });
    }
}