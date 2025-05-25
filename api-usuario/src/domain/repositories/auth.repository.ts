import { RegisterUserDto } from '../dtos/auth/register-user.dto';
import { LoginUserDto } from '../dtos/auth/login-user.dto';
import { AuthResponseDto } from "../dtos/auth/auth-response.dto";

export abstract class AuthRepository{
    
    abstract login(loginUserDto: LoginUserDto):Promise<AuthResponseDto>;
    abstract register(registerUserDto: RegisterUserDto):Promise<AuthResponseDto>;
    abstract conseguirInformacionPorID(id: number): Promise<AuthResponseDto>;
    abstract usuariosPorIds(ids: number[]): Promise<AuthResponseDto[]>
}