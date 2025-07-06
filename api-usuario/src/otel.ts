import { NodeSDK } from '@opentelemetry/sdk-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { GraphQLInstrumentation } from '@opentelemetry/instrumentation-graphql';

const traceExporter = new OTLPTraceExporter({
  url: 'https://otlp.nr-data.net/v1/traces',
  headers: {
    'api-key': process.env.NEW_RELIC_LICENSE_KEY!,
    'Content-Type': 'application/json'
  },
});

const metricExporter = new OTLPMetricExporter({
  url: 'https://otlp.nr-data.net:4318/v1/metrics',
  headers: {
    'api-key': process.env.NEW_RELIC_LICENSE_KEY!,
    'Content-Type': 'application/json'
  },
});

export const startOTel = () => {
  const sdk = new NodeSDK({
    resource: resourceFromAttributes({
      [ SemanticResourceAttributes.SERVICE_NAME]: 'api-usuario',
    }),
    metricReader: new PeriodicExportingMetricReader({
      exporter: metricExporter,
      exportIntervalMillis: 5000,
    }),
    traceExporter: traceExporter,
    instrumentations: [
      getNodeAutoInstrumentations(),
      new GraphQLInstrumentation()
    ],
  });

  try {
    sdk.start();
    console.log('OpenTelemetry iniciado');
  } catch (err) {
    console.error('Error al iniciar OpenTelemetry:', err);
  }
}