import 'dotenv/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

import healthRoutes from './routes/health.js';
import datasetRoutes from './routes/datasets.js';
import graphRoutes from './routes/graph.js';

// Ensure DATASETS_PATH / GRAPH_PATH defaults
(function ensureEnv() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const apiDir = path.resolve(__dirname, '..');
  const repoRoot = path.resolve(apiDir, '..');

  if (!process.env.PROJECT_ROOT) process.env.PROJECT_ROOT = repoRoot;
  if (!process.env.DATASETS_PATH)
    process.env.DATASETS_PATH = path.join(process.env.PROJECT_ROOT, 'src', 'data', 'datasets.ts');
  if (!process.env.GRAPH_PATH)
    process.env.GRAPH_PATH = path.join(process.env.PROJECT_ROOT, 'src', 'data', 'graph.generated.ts');
})();

const app = Fastify({ logger: true });

await app.register(cors, { origin: true, methods: ['GET', 'HEAD', 'OPTIONS'] });
await app.register(rateLimit, { max: 1000, timeWindow: '1 minute' });

await app.register(swagger, {
  openapi: {
    info: {
      title: 'BioInsights API',
      description: 'GET-only API for datasets and graph queries',
      version: '1.0.0'
    },
    servers: [{ url: '/api/v1' }]
  }
});
await app.register(swaggerUI, { routePrefix: '/docs' });

app.register(async (r) => {
  await r.register(healthRoutes);
  await r.register(datasetRoutes);
  await r.register(graphRoutes);
}, { prefix: '/api/v1' });

const port = Number(process.env.PORT ?? 8080);
app.listen({ port, host: '0.0.0.0' }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
