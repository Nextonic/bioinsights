// src/app/datasets/page.tsx
"use client";

import React, { useMemo, useState } from "react";
import { DATASETS } from "@/data/datasets";

type Category = "all" | "gene" | "disease" | "drug" | "multi";
type SortKey = "updated" | "name" | "fda";

const categories: Category[] = ["all", "gene", "disease", "drug", "multi"];

function fmtDate(d?: string | Date) {
  if (!d) return "—";
  const dt = typeof d === "string" ? new Date(d) : d;
  return Number.isNaN(+dt) ? "—" : dt.toLocaleDateString();
}
function normalize(str: string) {
  return str.toLowerCase().replace(/\s+/g, " ").trim();
}

export default function Page() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category>("all");
  const [fdaOnly, setFdaOnly] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("updated");

  // ✅ Strictly typed counts (no `any`)
  const countsByCat = useMemo<Record<Category, number>>(() => {
    const base: Record<Exclude<Category, "all">, number> = {
      gene: 0,
      disease: 0,
      drug: 0,
      multi: 0,
    };
    for (const d of DATASETS) {
      base[d.category] += 1;
    }
    return { all: DATASETS.length, ...base };
  }, []);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    let list = DATASETS.filter((d) => {
      if (cat !== "all" && d.category !== cat) return false;
      if (fdaOnly && !d.fda_relevant) return false;

      if (nq) {
        const hay = normalize(
          `${d.name} ${d.description} ${d.id} ${d.category} ${d.license} ${d.updateCadence}`
        );
        if (!hay.includes(nq)) return false;
      }
      return true;
    });

    // Sort
    list = list.slice().sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "fda") {
        if (a.fda_relevant !== b.fda_relevant) return a.fda_relevant ? -1 : 1;
        return a.name.localeCompare(b.name);
      }
      const at = a.lastUpdated ? +new Date(a.lastUpdated) : 0;
      const bt = b.lastUpdated ? +new Date(b.lastUpdated) : 0;
      if (at !== bt) return bt - at; // newest first
      return a.name.localeCompare(b.name);
    });

    return list;
  }, [q, cat, fdaOnly, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Datasets</h1>
        <p className="text-sm text-slate-600">
          FDA, gene, disease, drug, chemicals & pathways — curated for cross‑query.
        </p>
      </header>

      {/* Filter bar */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:gap-6">
          {/* Search */}
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">Search</label>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, description, ID…"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          {/* Category chips */}
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => {
                const active = cat === c;
                const count = countsByCat[c];
                return (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={`px-3 py-1.5 rounded-full text-xs border transition
                      ${active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:bg-slate-50"}`}
                    aria-pressed={active}
                  >
                    {c[0].toUpperCase() + c.slice(1)} <span className="opacity-70">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FDA toggle */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">FDA Relevance</label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="checkbox" checked={fdaOnly} onChange={(e) => setFdaOnly(e.target.checked)} />
              <span>Show FDA‑only</span>
            </label>
          </div>

          {/* Sort */}
          <div>
            <label className="block text-xs uppercase tracking-wide text-slate-500 mb-1">Sort</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortKey)}
              className="border rounded-md px-3 py-2 text-sm"
            >
              <option value="updated">Updated (newest)</option>
              <option value="name">Name (A–Z)</option>
              <option value="fda">FDA first</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="text-xs text-slate-600">
        Showing <span className="font-medium">{filtered.length}</span> of{" "}
        <span className="font-medium">{DATASETS.length}</span> datasets
        {fdaOnly ? " (FDA‑only)" : ""}.
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-sm text-slate-600 border rounded-xl p-6 bg-slate-50">
          No datasets match your filters. Try clearing search or toggles.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((ds) => (
            <article
              key={ds.id}
              className="border rounded-2xl p-4 shadow-sm bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold leading-snug">{ds.name}</h2>
                  {ds.fda_relevant && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full border bg-slate-50 self-start">
                      FDA
                    </span>
                  )}
                </div>

                <div className="mt-1 text-xs text-slate-500 flex flex-wrap gap-x-2 gap-y-1">
                  <span>v{ds.version ?? "—"}</span>
                  <span>•</span>
                  <span>Updated {fmtDate(ds.lastUpdated)}</span>
                  <span>•</span>
                  <span>{typeof ds.records === "number" ? ds.records.toLocaleString() : ds.records ?? "—"}</span>
                  <span>•</span>
                  <span>{ds.size ?? "—"}</span>
                </div>

                <p className="mt-2 text-sm text-slate-700">{ds.description}</p>

                <div className="mt-3 text-xs text-slate-600">
                  <span className="font-medium">Category:</span> {ds.category} •{" "}
                  <span className="font-medium">Cadence:</span> {ds.updateCadence}
                </div>

                {ds.sampleJoinHints?.length ? (
                  <div className="mt-3">
                    <div className="text-xs font-medium text-slate-700 mb-1">Join hints</div>
                    <ul className="list-disc ml-5 text-xs text-slate-600 space-y-1">
                      {ds.sampleJoinHints.slice(0, 3).map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <a
  href={ds.homepage}
  target="_blank"
  rel="noreferrer"
  className="inline-block text-sm px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
>
  View source
</a>
                <code className="text-[11px] text-slate-500 bg-slate-50 border rounded px-2 py-1">
                  {ds.id}
                </code>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
