import { FastifyInstance } from 'fastify';
import { loadDatasetsModule, datasetId, normalizeDataset } from '../adapters/datasets-adapter.js';

export default async function datasetRoutes(app: FastifyInstance) {
  app.get('/datasets', async () => {
    const list = await loadDatasetsModule();
    return list.map(normalizeDataset);
  });

  app.get("/datasets/debug/module", async () => {
  const p = process.env.DATASETS_PATH!;
  const abs = require("node:path").resolve(p);
  const { pathToFileURL } = await import("node:url");
  try {
    const mod = await import(pathToFileURL(abs).href);
    return {
      path: abs,
      keys: Object.keys(mod),
      defaultType: typeof (mod as any).default,
      defaultKeys: (mod as any).default && typeof (mod as any).default === "object"
        ? Object.keys((mod as any).default) : []
    };
  } catch (e: any) {
    return { path: abs, error: e?.message || String(e) };
  }
});


  app.get<{ Params: { id: string } }>('/datasets/:id', async (req, reply) => {
    const list = await loadDatasetsModule();
    const ds = list.find(d => datasetId(d) === req.params.id);
    if (!ds) return reply.code(404).send({ message: 'Dataset not found' });
    return normalizeDataset(ds);
  });

  app.get<{ Params: { id: string }; Querystring: { page?: string; limit?: string; q?: string } }>
  ('/datasets/:id/records', async (req, reply) => {
    const list = await loadDatasetsModule();
    const ds = list.find(d => datasetId(d) === req.params.id);
    if (!ds) return reply.code(404).send({ message: 'Dataset not found' });

    const page = Math.max(1, parseInt(req.query.page ?? '1', 10));
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit ?? '50', 10)));
    const q = (req.query.q ?? '').toLowerCase();

    let records: any[] =
      typeof (ds as any).getRecords === 'function' ? await (ds as any).getRecords() :
      Array.isArray((ds as any).records) ? (ds as any).records : [];

    if (q) records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));

    const start = (page - 1) * limit;
    return { datasetId: datasetId(ds), page, limit, total: records.length, records: records.slice(start, start + limit) };
  });

  app.get<{ Querystring: { q?: string; limit?: string } }>('/datasets/search', async (req) => {
    const q = String(req.query.q ?? '').toLowerCase();
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit ?? '50', 10)));

    const list = await loadDatasetsModule();
    const results: any[] = [];
    for (const ds of list) {
      const meta = JSON.stringify(ds).toLowerCase();
      if (!q || meta.includes(q)) results.push({ datasetId: datasetId(ds), match: { kind: 'dataset', data: ds } });

      const records: any[] =
        typeof (ds as any).getRecords === 'function' ? await (ds as any).getRecords() :
        Array.isArray((ds as any).records) ? (ds as any).records : [];
      for (const r of records) {
        if (!q || JSON.stringify(r).toLowerCase().includes(q)) {
          results.push({ datasetId: datasetId(ds), match: { kind: 'record', data: r } });
          if (results.length >= limit) break;
        }
      }
      if (results.length >= limit) break;
    }
    return { total: results.length, results: results.slice(0, limit) };
  });
}
