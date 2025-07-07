import { SearchUseCase } from "../../application/use-cases/search";
import { CustomError } from "../../domain";
import { AuthMiddleware } from "../../presentation/middleware/auth.middleware";
import { GraphQLContext } from "../types/context";

export const QuerySearch = {
  getUsersSearch: async (_: any, args: { term: string }, ctx: GraphQLContext) => {

    const term = args.term
    if (typeof term !== 'string') {
      throw CustomError.badRequest('term debe ser un string');
    }

    const validToken = await AuthMiddleware.validateJWT(ctx.req, ctx.res, ctx.authRepository);

    if(!validToken) {
      return ctx.res.status(401).json({
          message: "Token inválido",
          errors: []
      });
    }

    return await new SearchUseCase(ctx.searchRepository)
            .execute(term)
  },
}