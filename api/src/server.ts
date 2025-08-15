import Fastify from "fastify";
import cors from "@fastify/cors";
import rateLimit from "@fastify/rate-limit";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import healthRoutes from "./routes/health.js";
import datasetRoutes from "./routes/datasets.js";
import graphRoutes from "./routes/graph.js";

const app = Fastify({ logger: true });

await app.register(cors, { origin: true, methods: ["GET", "HEAD", "OPTIONS"] });
await app.register(rateLimit, { max: 1000, timeWindow: "1 minute" });

/** --- Swagger/OpenAPI --- */
await app.register(swagger, {
  openapi: {
    info: {
      title: "BioInsights API",
      description: "GET-only API for datasets and graph queries",
      version: "1.0.0"
    },
    servers: [{ url: "/api/v1" }]
  }
});
await app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: { docExpansion: "list", deepLinking: false }
});
/** ----------------------- */

app.register(async (r) => {
  await r.register(healthRoutes, { prefix: "/" });
  await r.register(datasetRoutes, { prefix: "/" });
  await r.register(graphRoutes, { prefix: "/" });
}, { prefix: "/api/v1" });

const port = Number(process.env.PORT ?? 8080);
app.listen({ port, host: "0.0.0.0" }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});
