// /api/src/adapters/datasets-adapter.ts
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

function resolveCandidate(p: string) {
  const tries = [
    p,
    p.endsWith(".ts") ? p.replace(/\.ts$/, ".js") : p,
    ...(!path.extname(p) ? [`${p}.ts`, `${p}.js`, `${p}.mjs`] : [])
  ];
  for (const c of tries) if (fs.existsSync(c)) return c;
  throw new Error(`datasets module not found. Tried:\n${tries.map(t => " - " + t).join("\n")}`);
}

function pickArrayFromModule(mod: any): any[] | null {
  // 🔎 Explicitly check your shape first
  if (Array.isArray(mod.DATASETS)) return mod.DATASETS;

  // Common shapes
  if (Array.isArray(mod.default)) return mod.default;
  if (Array.isArray(mod.datasets)) return mod.datasets;
  if (Array.isArray(mod.default?.datasets)) return mod.default.datasets;

  // Other likely keys
  for (const k of ["items", "list", "records", "data"]) {
    if (Array.isArray(mod[k])) return mod[k];
    if (Array.isArray(mod.default?.[k])) return mod.default[k];
  }

  // First array among top-level/default exports
  for (const [k, v] of Object.entries(mod)) if (Array.isArray(v)) return v as any[];
  if (mod?.default && typeof mod.default === "object") {
    for (const [k, v] of Object.entries(mod.default)) if (Array.isArray(v)) return v as any[];
  }
  return null;
}

export async function loadDatasetsModule(): Promise<any[]> {
  const base = process.env.DATASETS_PATH;
  if (!base) throw new Error("DATASETS_PATH is not set");
  const abs = path.resolve(base);
  const found = resolveCandidate(abs);
  const fileUrl = url.pathToFileURL(found).href;

  try {
    const mod = await import(fileUrl);
    const arr = pickArrayFromModule(mod);
    if (!arr) {
      const keys = Object.keys(mod).join(", ");
      const defKeys =
        mod?.default && typeof mod.default === "object" ? Object.keys(mod.default).join(", ") : "(none)";
      throw new Error(
        `No array export found. Top-level keys: [${keys}]; default keys: [${defKeys}]. ` +
        `Expected an array (e.g., DATASETS, default export array, or named 'datasets').`
      );
    }
    return arr;
  } catch (e: any) {
    throw new Error(`Failed to import datasets from ${found}: ${e?.message || e}`);
  }
}

export function datasetId(ds: any) {
  return String(ds?.id ?? ds?.slug ?? ds?.name ?? "");
}

export function normalizeDataset(ds: any) {
  return {
    id: datasetId(ds),
    name: String(ds?.name ?? ds?.title ?? ds?.id ?? ""),
    // your file uses `category` instead of `type`
    type: ds?.type ?? ds?.category ?? "unknown",
    description: ds?.description ?? "",
    updatedAt: ds?.lastUpdated ?? ds?.updatedAt ?? null,
    count: ds?.records ?? ds?.count ?? ds?.size ?? null,
    raw: ds
  };
}
