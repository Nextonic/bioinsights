import { FastifyInstance } from "fastify";
import { loadDatasetsModule, datasetId, normalizeDataset } from "../adapters/datasets-adapter.js";

export default async function datasetRoutes(app: FastifyInstance) {
  app.get("/datasets", {
    schema: {
      tags: ["datasets"],
      summary: "List datasets",
      response: {
        200: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              type: { type: "string" },
              description: { type: "string" },
              updatedAt: { anyOf: [{ type: "string" }, { type: "null" }] },
              count: { anyOf: [{ type: "number" }, { type: "null" }] },
              raw: { type: "object" }
            }
          }
        }
      }
    }
  }, async () => {
    const list = await loadDatasetsModule();
    return list.map(normalizeDataset);
  });

  app.get<{
    Params: { id: string }
  }>("/datasets/:id", {
    schema: {
      tags: ["datasets"],
      summary: "Get a dataset",
      params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] }
    }
  }, async (req, reply) => {
    const list = await loadDatasetsModule();
    const ds = list.find(d => datasetId(d) === req.params.id);
    if (!ds) return reply.code(404).send({ message: "Dataset not found" });
    return normalizeDataset(ds);
  });

  app.get<{
    Params: { id: string },
    Querystring: { page?: string; limit?: string; q?: string }
  }>("/datasets/:id/records", {
    schema: {
      tags: ["datasets"],
      summary: "Dataset records (paginated)",
      params: { type: "object", properties: { id: { type: "string" } }, required: ["id"] },
      querystring: {
        type: "object",
        properties: {
          page: { type: "string", default: "1" },
          limit: { type: "string", default: "50" },
          q: { type: "string" }
        }
      }
    }
  }, async (req, reply) => {
    const list = await loadDatasetsModule();
    const ds = list.find(d => datasetId(d) === req.params.id);
    if (!ds) return reply.code(404).send({ message: "Dataset not found" });

    const page = Math.max(1, parseInt(req.query.page ?? "1", 10));
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit ?? "50", 10)));
    const q = (req.query.q ?? "").toLowerCase();

    let records: any[] =
      typeof (ds as any).getRecords === "function" ? await (ds as any).getRecords() :
      Array.isArray((ds as any).records) ? (ds as any).records : [];

    if (q) records = records.filter(r => JSON.stringify(r).toLowerCase().includes(q));

    const start = (page - 1) * limit;
    return { datasetId: datasetId(ds), page, limit, total: records.length, records: records.slice(start, start + limit) };
  });

  app.get<{
    Querystring: { q?: string; limit?: string }
  }>("/datasets/search", {
    schema: {
      tags: ["datasets"],
      summary: "Search across datasets",
      querystring: {
        type: "object",
        properties: {
          q: { type: "string" },
          limit: { type: "string", default: "50" }
        }
      }
    }
  }, async (req) => {
    const q = String(req.query.q ?? "").toLowerCase();
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit ?? "50", 10)));

    const list = await loadDatasetsModule();
    const results: any[] = [];
    for (const ds of list) {
      const meta = JSON.stringify(ds).toLowerCase();
      if (!q || meta.includes(q)) results.push({ datasetId: datasetId(ds), match: { kind: "dataset", data: ds } });

      const records: any[] =
        typeof (ds as any).getRecords === "function" ? await (ds as any).getRecords() :
        Array.isArray((ds as any).records) ? (ds as any).records : [];
      for (const r of records) {
        if (!q || JSON.stringify(r).toLowerCase().includes(q)) {
          results.push({ datasetId: datasetId(ds), match: { kind: "record", data: r } });
          if (results.length >= limit) break;
        }
      }
      if (results.length >= limit) break;
    }
    return { total: results.length, results: results.slice(0, limit) };
  });
}
