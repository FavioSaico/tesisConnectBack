import { ObtenerCarreras } from "../../application/use-cases/general/ObtenerCarreras.use-case";
import { ObtenerEspecialidades } from "../../application/use-cases/general/ObtenerEspecialides.use-case";
import { ObtenerGradosAcademicos } from "../../application/use-cases/general/ObtenerGradosAcademicos.use-case";
import { ObtenerUniversidades } from "../../application/use-cases/general/ObtenerUniversidades.use-case";
// import { graphqlQueryCounter, graphqlQueryDuration } from "../../otel";
import { GraphQLContext } from "../types/context"

// import opentelemetry from "@opentelemetry/api";

export const QueryGeneral = {
  getEspecialidades: async (_: any, args: any, ctx: GraphQLContext) => {

    // const tracer = opentelemetry.trace.getTracer("especialidad");
    // const meter = opentelemetry.metrics.getMeter("especialidad");
    // const fibonacciInvocations = meter.createCounter("especialidad.invocations", {
    //   description: "Número de invocaciones de especialidades",
    // });

    // const start = performance.now();
    // // Tu lógica
    // graphqlQueryCounter.add(1, { field: 'usuarios' });
    // graphqlQueryDuration.record(performance.now() - start, { field: 'usuarios' });

    // try {
    //   fibonacciInvocations.add(1, { "especialidad.invocations.valid.n": true });
    //   return await new ObtenerEspecialidades(ctx.generalRepository)
    //         .execute();
    // } catch (error) {
    //   fibonacciInvocations.add(1, { "especialidad.invocations.valid.n": false });
    //   const span = opentelemetry.trace.getActiveSpan();
    //   span.recordException(error);
    //   throw error;
    // }

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