import { CustomError  } from "../../domain";
import { AuthResponseDto } from "../../domain/dtos/auth/auth-response.dto";

export class UserMapper{
    // no usaremos inyección de dependencias, por lo que manejamos todos con métodos estaticos

    // recibe un objeto con keys de tipo string y el valor puede ser any
    // el objeto es lo que nos retorna la base de datos
    static userEntityFromObject(object: { [key: string]:any }){
        // puede que nos retorne id o _id
        const { id, name, email } = object; // , password, role

        // realizamos la validaciones
        if ( !id ) {
            throw CustomError.badRequest('Missing id');
        }

        if ( !name ) throw CustomError.badRequest('Missing name');
        if ( !email ) throw CustomError.badRequest('Missing email');
        // if ( !password ) throw CustomError.badRequest('Missing password');
        // if ( !role ) throw CustomError.badRequest('Missing roles');


        return new AuthResponseDto(
            id, // _id o id
            name, 
            email,
            // password,
            // role
        );
    }

}

