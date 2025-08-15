// src/app/results/ResultsClient.tsx
"use client";

import React, { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { DATASETS } from "@/data/datasets";
import {
  ASSOCIATIONS,
  associationsForQuestion,
  evidenceByIds,
  type Association,
  type Evidence,
  type DatasetId,
} from "@/data/graph.generated";

type EntityFilter = "all" | "gene" | "disease" | "drug" | "chemical" | "pathway";

const FDA_IDS = new Set(DATASETS.filter(d => d.fda_relevant).map(d => d.id));
const datasetName = (id: string) => DATASETS.find(d => d.id === id)?.name ?? id;

function scoreAssociation(_a: Association, ev: Evidence[]) {
  const avg = ev.length ? ev.reduce((s, e) => s + (e.score ?? 0), 0) / ev.length : 0;
  const fdaBoost = ev.some(e => FDA_IDS.has(e.datasetId)) ? 0.08 : 0;
  return Math.min(1, avg + fdaBoost);
}

export default function ResultsClient() {
  const sp = useSearchParams();
  const qParam = sp.get("q");
  const q = (qParam && qParam.trim()) || "What drug can cure asthma?";

  // Base matches (fallback to first 25 so we always render something)
  const matches = useMemo<Association[]>(() => {
    const m = associationsForQuestion(q);
    return m.length ? m : ASSOCIATIONS.slice(0, 25);
  }, [q]);

  // Decorate with evidence + score up front (filters are cheap)
  const rows = useMemo(() => {
    return matches.map(a => {
      const ev = evidenceByIds(a.evidenceIds);
      return { a, ev, score: scoreAssociation(a, ev) };
    });
  }, [matches]);

  // Filter bar state — fully typed
  const [datasetFilter, setDatasetFilter] = useState<"all" | DatasetId>("all");
  const [entityTypeFilter, setEntityTypeFilter] = useState<EntityFilter>("all");
  const [fdaOnly, setFdaOnly] = useState<boolean>(false);

  const filtered = useMemo(() => {
    return rows.filter(({ a, ev }) => {
      // dataset filter: subject/object/evidence may match
      if (datasetFilter !== "all") {
        const inSubject = a.subject.datasetId === datasetFilter;
        const inObject  = a.object.datasetId === datasetFilter;
        const inEvidence = ev.some(e => e.datasetId === datasetFilter);
        if (!inSubject && !inObject && !inEvidence) return false;
      }
      // entity-type filter
      if (entityTypeFilter !== "all") {
        const hit =
          a.subject.entityType === entityTypeFilter ||
          a.object.entityType === entityTypeFilter;
        if (!hit) return false;
      }
      // FDA-only
      if (fdaOnly) {
        const fdaHit =
          FDA_IDS.has(a.subject.datasetId) ||
          FDA_IDS.has(a.object.datasetId) ||
          ev.some(e => FDA_IDS.has(e.datasetId));
        if (!fdaHit) return false;
      }
      return true;
    });
  }, [rows, datasetFilter, entityTypeFilter, fdaOnly]);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 py-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">Results</h1>
        <p className="text-sm text-gray-600">
          Question: <span className="font-medium">{q}</span>
        </p>
      </header>

      {/* Filter bar (matching the demo style) */}
      <div className="flex flex-wrap gap-4 bg-white border rounded-lg p-4 shadow-sm">
        {/* Dataset */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Dataset</label>
          <select
            value={datasetFilter}
            onChange={(e) => setDatasetFilter(e.target.value as "all" | DatasetId)}
            className="border rounded-md p-2 text-sm"
          >
            <option value="all">All datasets</option>
            {DATASETS.map(ds => (
              <option key={ds.id} value={ds.id}>{ds.name}</option>
            ))}
          </select>
        </div>

        {/* Entity Type */}
        <div>
          <label className="block text-xs uppercase tracking-wide text-gray-500 mb-1">Entity Type</label>
          <select
            value={entityTypeFilter}
            onChange={(e) => setEntityTypeFilter(e.target.value as EntityFilter)}
            className="border rounded-md p-2 text-sm"
          >
            <option value="all">All</option>
            <option value="gene">Gene</option>
            <option value="disease">Disease</option>
            <option value="drug">Drug</option>
            <option value="chemical">Chemical</option>
            <option value="pathway">Pathway</option>
          </select>
        </div>

        {/* FDA only */}
        <label className="flex items-center gap-2 ml-auto">
          <input
            type="checkbox"
            checked={fdaOnly}
            onChange={(e) => setFdaOnly(e.target.checked)}
          />
          <span className="text-sm">FDA sources only</span>
        </label>
      </div>

      {/* Results list */}
      <ol className="space-y-4">
        {filtered.length === 0 && (
          <li className="text-sm text-slate-600">No results match your filters.</li>
        )}
        {filtered.map(({ a, ev, score }) => (
          <li key={a.id} className="bg-white border rounded-lg p-4 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {a.subject.name}{" "}
                  <span className="text-slate-500">{a.predicate.replaceAll("_", " ")}</span>{" "}
                  {a.object.name}
                </h2>
                <div className="text-xs text-gray-500">
                  Score: {score.toFixed(2)} •{" "}
                  <span title={a.subject.datasetId}>{datasetName(a.subject.datasetId)}</span>
                  {"  →  "}
                  <span title={a.object.datasetId}>{datasetName(a.object.datasetId)}</span>
                </div>
              </div>
              <a href={`/evidence?id=${encodeURIComponent(a.id)}`} className="text-xs underline text-blue-600">
                View evidence
              </a>
            </div>

            {/* Evidence preview */}
            <div className="mt-3 space-y-2">
              <div className="text-sm font-medium">Evidence</div>
              <ul className="list-disc ml-6 text-sm text-gray-700">
                {ev.map(e => (
                  <li key={e.id}>
                    <span className="font-medium">{datasetName(e.datasetId)}</span>{" — "}
                    <a className="underline" href={e.url} target="_blank" rel="noreferrer">
                      {e.title}
                    </a>{" "}
                    <span className="text-xs text-slate-500">({e.score.toFixed(2)})</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
