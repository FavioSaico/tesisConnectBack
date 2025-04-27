// los dtos pueden ser clases, funciones o factory functions
export class AuthResponseDto{

    constructor(
      public id: number,
      public name: string,
      public email: string,
    ){
        
    }
}