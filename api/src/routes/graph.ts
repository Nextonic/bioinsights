import { FastifyInstance } from 'fastify';
import { loadGraph, stats, getNeighbors, shortestPath } from '../adapters/graph-adapter.js';

export default async function graphRoutes(app: FastifyInstance) {
  app.get('/graph/stats', async () => {
    const g = await loadGraph();
    return stats(g);
  });

  app.get<{ Querystring: { nodeId?: string; depth?: string; direction?: 'in' | 'out' | 'both' } }>
  ('/graph/neighbors', async (req, reply) => {
    const nodeId = req.query.nodeId;
    if (!nodeId) return reply.code(400).send({ message: 'nodeId is required' });
    const depth = Math.max(0, parseInt(req.query.depth ?? '1', 10));
    const direction = (req.query.direction ?? 'both') as 'in' | 'out' | 'both';
    const g = await loadGraph();
    return getNeighbors(g, nodeId, depth, direction);
  });

  app.get<{ Querystring: { sourceId?: string; targetId?: string; maxDepth?: string } }>
  ('/graph/shortest-path', async (req, reply) => {
    const { sourceId, targetId } = req.query;
    if (!sourceId || !targetId) return reply.code(400).send({ message: 'sourceId and targetId are required' });
    const maxDepth = Math.max(1, parseInt(req.query.maxDepth ?? '10', 10));
    const g = await loadGraph();
    const path = shortestPath(g, sourceId, targetId, maxDepth);
    return { path };
  });

  app.get<{ Querystring: { key?: string; op?: 'eq' | 'ne' | 'contains'; value?: string } }>
  ('/graph/filter-nodes', async (req, reply) => {
    const { key, op = 'eq', value } = req.query;
    if (!key || value === undefined) return reply.code(400).send({ message: 'key and value are required' });
    const g = await loadGraph();
    const nodes = g.nodes.filter(n => {
      const v = String((n as any)[key]);
      if (op === 'eq') return v === value;
      if (op === 'ne') return v !== value;
      return v.toLowerCase().includes(String(value).toLowerCase());
    });
    const keep = new Set(nodes.map(n => n.id));
    const edges = g.edges.filter(e => keep.has(e.source) && keep.has(e.target));
    return { nodes, edges };
  });

  app.get<{ Querystring: { nodeIds?: string } }>
  ('/graph/subgraph', async (req, reply) => {
    const ids = (req.query.nodeIds ?? '').split(',').map(s => s.trim()).filter(Boolean);
    if (!ids.length) return reply.code(400).send({ message: 'nodeIds is required' });
    const g = await loadGraph();
    const keep = new Set(ids);
    const nodes = g.nodes.filter(n => keep.has(n.id));
    const edges = g.edges.filter(e => keep.has(e.source) && keep.has(e.target));
    return { nodes, edges };
  });}
