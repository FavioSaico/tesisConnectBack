import { Validators } from "../../../config";

export class RegisterUserDto{

    private constructor(
        public name: string,
        public email: string,
        // public password: string,
    ){
        
    }

    static create(object:{ [key:string]:any }):[string?, RegisterUserDto?]{
        const {name, email, password} = object;
        
        // Validaciones
        if (!name) return ['Missing name', undefined];
        if (!email) return ['Missing email']; // no es necesario colocar undefined, porque RegisterUserDto es opcional
        if (!Validators.email.test(email)) return ['Email is not valid'];
        // if (!password) return ['Missing password'];
        // if (password.length < 6) return ['Password to short'];
        
        return [ 
            undefined,
            new RegisterUserDto(name, email.toLowerCase())
        ]
    }
}
