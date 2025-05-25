import { RegisterUserDto,AuthRepository, AuthDatasource } from '../../domain';
import { AuthResponseDto } from '../../domain/dtos/auth/auth-response.dto';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';

export class AuthRepositoryImpl implements AuthRepository{

    constructor(
        private readonly authDatasource: AuthDatasource
    ){}

    async register(registerUserDto: RegisterUserDto): Promise<AuthResponseDto> {
        return this.authDatasource.register(registerUserDto);
    }

    async login(loginUserDto: LoginUserDto):Promise<AuthResponseDto> {
        return this.authDatasource.login(loginUserDto);
    }

    async conseguirInformacionPorID(id: number): Promise<AuthResponseDto> {
        return this.authDatasource.conseguirInformacionPorID(id); // Delegación al datasource
    }

    async usuariosPorIds(ids: number[]): Promise<AuthResponseDto[]> {
        return this.authDatasource.usuariosPorIds(ids)
    }
}

