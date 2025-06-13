import { GetOrcidUser } from "../../application/use-cases/orcid/ObtenerOrcidInfo.use-case";
import { GraphQLContext } from "../types/context"

export const QueryOrcid = {
  getUserByOrcid: async (_: any, args: { id: string }, ctx: GraphQLContext) => {

    return await new GetOrcidUser(ctx.orcidRepository)
            .execute(args.id);
  },
}