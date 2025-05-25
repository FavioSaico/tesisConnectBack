import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { RegisterUserDto, LoginUserDto } from '../../domain';
import { LoginUser, RegisterUser } from '../../application/use-cases/auth';

const datasource = new AuthDatasourceImpl();
const authRepository = new AuthRepositoryImpl(datasource);

export const MutationAuth = {
  login: async (_: any, args: { loginDto: LoginUserDto }) => {

    const loginUserDto = plainToInstance(LoginUserDto, args.loginDto);

    await validateOrReject(loginUserDto);

    return await new LoginUser(authRepository)
                .execute(loginUserDto!)
  },
  register: async (_: any, args: { registerDto: RegisterUserDto }) => {

    const registerUserDto = plainToInstance(RegisterUserDto, args.registerDto);

    await validateOrReject(registerUserDto);

    return await new RegisterUser(authRepository)
                .execute(registerUserDto!)
  },
}