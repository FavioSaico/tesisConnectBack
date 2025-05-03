import { CustomError, RegisterUserDto,AuthRepository, AuthDatasource } from '../../domain';
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
}

