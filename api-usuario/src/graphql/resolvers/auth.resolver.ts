import { plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { RegisterUserDto, LoginUserDto, CustomError } from '../../domain';
import { LoginUser, RegisterUser, UserByIdUseCase } from '../../application/use-cases/auth';
import { GraphQLContext } from '../types/context';
import { UsersByIdsUseCase } from '../../application/use-cases/auth/users-by-ids.use-case';
import { AuthMiddleware } from '../../presentation/middleware/auth.middleware';
import { AuthResponseDto } from '../../domain/dtos/auth/auth-response.dto';

interface UserToken {
    token: string;
    usuario: AuthResponseDto
}


export const QueryAuth = {
  getUser: async (_: any, args: { id: number }, ctx: GraphQLContext) => {

    const id = args.id;
    if(Number.isNaN(id)) {
      throw CustomError.badRequest('Usuario no encontrado');
    }

    const validToken = await AuthMiddleware.validateJWT(ctx.req, ctx.res, ctx.authRepository);

    if(!validToken) {
      return ctx.res.status(401).json({
          message: "Token inválido",
          errors: []
      });
    }

    return await new UserByIdUseCase(ctx.authRepository)
          .execute(id)
  },

  getUserAuthenticated: async (_: any, args: any, ctx: GraphQLContext)=> {

    const validToken = await AuthMiddleware.validateJWT(ctx.req, ctx.res, ctx.authRepository);

    if(!validToken || typeof validToken === 'boolean') {
      throw CustomError.unauthorized('Token inválido');
    }
    return {
      token: '-',
      usuario: validToken.user
    }
  },
  getUsers: async (_: any, args: { ids: number[] }, ctx: GraphQLContext) => {

    const ids = args.ids
    if (!Array.isArray(ids)) {
      throw CustomError.badRequest('ids debe ser un arreglo');
    }

    const validToken = await AuthMiddleware.validateJWT(ctx.req, ctx.res, ctx.authRepository);

    if(!validToken) {
      return ctx.res.status(401).json({
          message: "Token inválido",
          errors: []
      });
    }

    return await new UsersByIdsUseCase(ctx.authRepository)
            .execute(ids)
  },
}


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