import path from "node:path";

export type GraphNode = { id: string; label?: string; type?: string; [k: string]: any };
export type GraphEdge = { source: string; target: string; type?: string; [k: string]: any };
export type GraphData = { nodes: GraphNode[]; edges: GraphEdge[] };

export async function loadGraph(): Promise<GraphData> {
  const p = process.env.GRAPH_PATH!;
  const mod = await import(path.resolve(p));
  const nodes = (mod.nodes ?? mod.default?.nodes ?? []) as GraphNode[];
  const edges = (mod.edges ?? mod.default?.edges ?? []) as GraphEdge[];
  if (!Array.isArray(nodes) || !Array.isArray(edges)) {
    throw new Error("graph.generated.ts must export arrays `nodes` and `edges`.");
  }
  return { nodes, edges };
}

function freq(items: string[]) {
  const m = new Map<string, number>();
  for (const x of items) m.set(x, (m.get(x) ?? 0) + 1);
  return [...m.entries()].map(([value, count]) => ({ value, count }));
}

export function stats(g: GraphData) {
  return {
    nodeCount: g.nodes.length,
    edgeCount: g.edges.length,
    nodeTypes: freq(g.nodes.map(n => n.type ?? "unknown")),
    edgeTypes: freq(g.edges.map(e => e.type ?? "unknown"))
  };
}

export function buildAdj(g: GraphData) {
  const out = new Map<string, Set<string>>();
  const inn = new Map<string, Set<string>>();
  for (const { source, target } of g.edges) {
    if (!out.has(source)) out.set(source, new Set());
    if (!inn.has(target)) inn.set(target, new Set());
    out.get(source)!.add(target);
    inn.get(target)!.add(source);
  }
  return { out, inn };
}

export function getNeighbors(g: GraphData, nodeId: string, depth = 1, direction: "out"|"in"|"both" = "both") {
  const { out, inn } = buildAdj(g);
  const seen = new Set<string>([nodeId]);
  let frontier = new Set<string>([nodeId]);

  for (let d = 0; d < depth; d++) {
    const next = new Set<string>();
    for (const n of frontier) {
      if (direction !== "in")  for (const t of out.get(n) ?? []) if (!seen.has(t)) { seen.add(t); next.add(t); }
      if (direction !== "out") for (const s of inn.get(n) ?? []) if (!seen.has(s)) { seen.add(s); next.add(s); }
    }
    if (!next.size) break;
    frontier = next;
  }

  const keep = new Set(seen);
  const nodes = g.nodes.filter(n => keep.has(n.id));
  const edges = g.edges.filter(e => keep.has(e.source) && keep.has(e.target));
  return { nodes, edges };
}

export function shortestPath(g: GraphData, sourceId: string, targetId: string, maxDepth = 10) {
  const { out } = buildAdj(g);
  const q: string[] = [sourceId];
  const prev = new Map<string, string | null>([[sourceId, null]]);
  let depth = 0;

  while (q.length && depth <= maxDepth) {
    const size = q.length;
    for (let i = 0; i < size; i++) {
      const cur = q.shift()!;
      if (cur === targetId) {
        const path: string[] = [];
        let at: string | null = targetId;
        while (at) { path.push(at); at = prev.get(at) ?? null; }
        return path.reverse();
      }
      for (const t of out.get(cur) ?? []) {
        if (!prev.has(t)) { prev.set(t, cur); q.push(t); }
      }
    }
    depth++;
  }
  return null;
}
