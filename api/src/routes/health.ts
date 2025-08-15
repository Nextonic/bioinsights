import { FastifyInstance } from "fastify";

export default async function healthRoutes(app: FastifyInstance) {
  app.get("/health", {
    schema: {
      tags: ["meta"],
      summary: "Liveness/Readiness",
      response: { 200: { type: "object", properties: { status: { type: "string" } } } }
    }
  }, async () => ({ status: "ok" }));

  app.get("/version", {
    schema: {
      tags: ["meta"],
      summary: "Service & data versions",
      response: {
        200: {
          type: "object",
          properties: {
            service: { type: "string" },
            commit: { type: ["string", "null"] },
            dataPaths: {
              type: "object",
              properties: {
                datasets: { type: "string" },
                graph: { type: "string" }
              }
            }
          }
        }
      }
    }
  }, async () => ({
    service: process.env.SERVICE_NAME ?? "bioinsights-api",
    commit: process.env.GIT_SHA ?? null,
    dataPaths: { datasets: process.env.DATASETS_PATH, graph: process.env.GRAPH_PATH }
  }));
}
