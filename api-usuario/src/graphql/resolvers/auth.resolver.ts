import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { RegisterUserDto, LoginUserDto } from '../../domain';
import { LoginUser, RegisterUser } from '../../application/use-cases/auth';
import { GraphQLContext } from '../types/context';

export const MutationAuth = {
  login: async (_: any, args: { loginDto: LoginUserDto }, ctx: GraphQLContext) => {

    const loginUserDto = plainToInstance(LoginUserDto, args.loginDto);

    await validateOrReject(loginUserDto);

    return await new LoginUser(ctx.authRepository)
                .execute(loginUserDto!)
  },
  register: async (_: any, args: { registerDto: RegisterUserDto }, ctx: GraphQLContext) => {

    const registerUserDto = plainToInstance(RegisterUserDto, args.registerDto);

    await validateOrReject(registerUserDto);

    return await new RegisterUser(ctx.authRepository)
                .execute(registerUserDto!)
  },
}