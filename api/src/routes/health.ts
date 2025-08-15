import { FastifyInstance } from 'fastify';

export default async function healthRoutes(app: FastifyInstance) {
  app.get('/health', { schema: { tags: ['meta'], summary: 'Liveness' } }, async () => ({ status: 'ok' }));

  app.get('/version', { schema: { tags: ['meta'], summary: 'Service & data versions' } }, async () => ({
    service: process.env.SERVICE_NAME ?? 'bioinsights-api',
    commit: process.env.GIT_SHA ?? null,
    dataPaths: {
      datasets: process.env.DATASETS_PATH,
      graph: process.env.GRAPH_PATH
    }
  }));
}
