import { compareSync, hashSync } from 'bcryptjs';

// creamos el adaptador
export class BcryptAdapter {
    // usamos métodos estaticos, si creamos un constructo es porque necesitamos inyección de dependencias
    static hash( password: string ): string {
        return hashSync( password); // encriptamos la contraseña
    }

    // comparamos si las contraseñas hacen match, no que sean iguales (es diferente)
    static compare( password: string, hashed: string ): boolean { // recibe el password que ingresa el usuario al logearse
        return compareSync( password, hashed );
    }
}