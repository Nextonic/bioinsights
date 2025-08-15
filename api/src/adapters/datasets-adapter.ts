import path from "node:path";

export async function loadDatasetsModule(): Promise<any[]> {
  const p = process.env.DATASETS_PATH!;
  const mod = await import(path.resolve(p));
  const list: any[] = mod.default ?? mod.datasets ?? [];
  if (!Array.isArray(list)) {
    throw new Error("datasets.ts must export an array (default or `datasets`).");
  }
  return list;
}

export function datasetId(ds: any) {
  return String(ds.id ?? ds.slug ?? ds.name);
}

export function normalizeDataset(ds: any) {
  return {
    id: datasetId(ds),
    name: String(ds.name ?? ds.title ?? ds.id),
    type: ds.type ?? ds.category ?? "unknown",
    description: ds.description ?? "",
    updatedAt: ds.updatedAt ?? ds.lastUpdated ?? null,
    count: ds.count ?? ds.size ?? (Array.isArray(ds.records) ? ds.records.length : null),
    raw: ds
  };
}
