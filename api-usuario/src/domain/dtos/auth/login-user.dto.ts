import { Validators } from "../../../config";

// los dtos pueden ser clases, funciones o factory functions
export class LoginUserDto{

    private constructor(
        public email: string,
        public password: string,
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, LoginUserDto?]{
        const {email, password} = object;
        
        // Validaciones
        if (!email) return ['Missing email']; // no es necesario colocar undefined, porque RegisterUserDto es opcional
        if (!Validators.email.test(email)) return ['Email is not valid'];
        // if (!password) return ['Missing password'];
        // if (password.length < 6) return ['Password to short'];
        
        return [ 
            undefined, // no retorno un mensaje de error
            new LoginUserDto(email.toLowerCase(), password) // creo la instancia usando el constructor privado recien
        ]
    }
}
