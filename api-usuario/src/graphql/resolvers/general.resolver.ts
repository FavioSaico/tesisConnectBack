import { ObtenerCarreras } from "../../application/use-cases/general/ObtenerCarreras.use-case";
import { ObtenerEspecialidades } from "../../application/use-cases/general/ObtenerEspecialides.use-case";
import { ObtenerGradosAcademicos } from "../../application/use-cases/general/ObtenerGradosAcademicos.use-case";
import { ObtenerUniversidades } from "../../application/use-cases/general/ObtenerUniversidades.use-case";
import { GraphQLContext } from "../types/context"

export const QueryGeneral = {
  getEspecialidades: async (_: any, args: any, ctx: GraphQLContext) => {

    return await new ObtenerEspecialidades(ctx.generalRepository)
            .execute();
  },
  getGradosAcademicos: async (_: any, args: any, ctx: GraphQLContext) => {

    return await new ObtenerGradosAcademicos(ctx.generalRepository)
            .execute();
  },
  getUniversidades: async (_: any, args: any, ctx: GraphQLContext) => {

    return await new ObtenerUniversidades(ctx.generalRepository)
            .execute();
  },
  getCarrerasProfesionales: async (_: any, args: any, ctx: GraphQLContext) => {

    return await new ObtenerCarreras(ctx.generalRepository)
            .execute();
  },
}