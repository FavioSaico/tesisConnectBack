// // src/otel.ts
import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-grpc';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { Resource, resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { ConsoleMetricExporter, MeterProvider, PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { ExpressInstrumentation } from '@opentelemetry/instrumentation-express';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';
import { ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base';

// const traceExporter = new OTLPTraceExporter({
//   url: 'grpc://otlp.nr-data.net:4317',
//   headers: {
//     'api-key': process.env.NEW_RELIC_LICENSE_KEY!,
//     'Content-Type': 'application/grpc'
//   },
// });

// const metricExporter = new OTLPMetricExporter({
//   // url: 'grpc://otlp.nr-data.net:4317',
//   url: 'https://otlp.nr-data.net:4318/v1/metrics',
//   headers: {
//     'api-key': process.env.NEW_RELIC_LICENSE_KEY!,
//     'Content-Type': 'application/json'
//   },
// });

// const sdk = new NodeSDK({
//   resource: resourceFromAttributes({
//     [ SemanticResourceAttributes.SERVICE_NAME]: 'unknown_service:C:\\Program Files\\nodejs\\node.exe',
//   }),
//   metricReader: new PeriodicExportingMetricReader({
//     exporter: metricExporter,
//     // exporter: new ConsoleMetricExporter(),
//     exportIntervalMillis: 1000,
//   }),
//   // traceExporter: new ConsoleSpanExporter(),
//   traceExporter: traceExporter,
//   instrumentations: [
//     new HttpInstrumentation(),
//     new ExpressInstrumentation(),
//     new GraphQLInstrumentation({
//       // allowAttributes: true,
//       allowValues: true,
//       depth: 2,
//       mergeItems: true,
//     }),
//     getNodeAutoInstrumentations()
//   ],
// });

// try {
//   sdk.start();
//   console.log('OpenTelemetry iniciado');
// } catch (err) {
//   console.error('Error al iniciar OpenTelemetry:', err);
// }

// import { metrics } from '@opentelemetry/api';
// export const meter = metrics.getMeter('unknown_service:C:\\Program Files\\nodejs\\node.exe');

// Ejemplo de métrica personalizada
// export const graphqlQueryCounter = meter.createCounter('graphql_query_count', {
//   description: 'Cuenta total de queries ejecutadas en GraphQL',
// });

// export const graphqlMutationCounter = meter.createCounter('graphql_mutation_count', {
//   description: 'Cuenta total de mutations ejecutadas en GraphQL',
// });

// export const graphqlQueryDuration = meter.createHistogram('graphql_query_duration_ms', {
//   description: 'Duración de ejecución de queries GraphQL en milisegundos',
// });

// export const activeUsersGauge = meter.createUpDownCounter('active_sessions_count', {
//   description: 'Número de sesiones de usuarios activas',
// });

// setInterval(() => {
//   graphqlQueryCounter.add(1, { endpoint: '/graphql' });
//   console.log('Incrementé el contador 🚀');
// }, 1000);




// import { MeterProvider } from '@opentelemetry/sdk-metrics';
// import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
// import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
// import { resourceFromAttributes } from '@opentelemetry/resources';
// import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

const exporter = new OTLPMetricExporter({
  url: 'https://otlp.nr-data.net:4318/v1/metrics',
  // url: 'http://localhost:4000/metrics',
  headers: {
    'api-key': process.env.NEW_RELIC_LICENSE_KEY!,
  },
});

const meterProvider = new MeterProvider({
  resource: resourceFromAttributes({
    [SemanticResourceAttributes.SERVICE_NAME]: 'mi-aplicacion-nodejs',
  }),
  readers: [
    new PeriodicExportingMetricReader({
      exporter: exporter,
      exportIntervalMillis: 5000,
    })
  ],
});

const meter2 = meterProvider.getMeter('mi-aplicacion-nodejs');

const contador = meter2.createCounter('graphql_query_count_custom');

setInterval(() => {
  contador.add(1, { endpoint: '/graphql' });
  console.log('Incrementé el contador 🚀');
}, 1000);
