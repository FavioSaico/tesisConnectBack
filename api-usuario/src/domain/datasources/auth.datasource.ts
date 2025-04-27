import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { LoginUserDto } from "../dtos/auth/login-user.dto";
import { AuthResponseDto } from "../dtos/auth/auth-response.dto";

// Datasource: puede ser de mongo, mysql, postgres, etc. que contienen las reglas de negocio
export abstract class AuthDatasource{

    abstract login(loginUserDto: LoginUserDto):Promise<AuthResponseDto>
    abstract register(registerUserDto: RegisterUserDto):Promise<AuthResponseDto>
}