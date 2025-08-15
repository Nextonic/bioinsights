"use client";
import React, { Suspense } from "react";
import { DATASETS } from "@/data/datasets";
import { ASSOCIATIONS, evidenceByIds, type Association } from "@/data/graph.generated";

export const dynamic = "force-dynamic";

function datasetName(id: string) {
  return DATASETS.find((d) => d.id === id)?.name ?? id;
}

export default function Page() {
  return (
    <Suspense fallback={<div className="max-w-4xl mx-auto p-6 text-sm text-slate-600">Loading evidence…</div>}>
      <EvidenceClient />
    </Suspense>
  );
}

/* =======================
   Client component inside the same file
   ======================= */

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

function EvidenceClient() {
  const sp = useSearchParams();
  const assocId = sp.get("id") ?? "";

  const assoc: Association | undefined = useMemo(
    () => ASSOCIATIONS.find((a) => a.id === assocId),
    [assocId]
  );
  const evidence = useMemo(() => (assoc ? evidenceByIds(assoc.evidenceIds) : []), [assoc]);

  if (!assoc) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold">Evidence</h1>
        <p className="text-sm text-slate-600 mt-2">
          No association found for id <span className="font-mono">{assocId || "(none)"}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Evidence</h1>
        <p className="text-sm text-gray-600">
          Association:{" "}
          <span className="font-medium">
            {assoc.subject.name} {assoc.predicate.replaceAll("_", " ")} {assoc.object.name}
          </span>
        </p>
        <p className="text-xs text-slate-500">
          {datasetName(assoc.subject.datasetId)} → {datasetName(assoc.object.datasetId)}
        </p>
      </header>

      <div className="space-y-4">
        {evidence.map((e) => (
          <div key={e.id} className="border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-semibold">{datasetName(e.datasetId)}</h2>
                <p className="text-xs text-slate-500">
                  Score: {e.score.toFixed(2)} • Source:{" "}
                  <a href={e.url} target="_blank" rel="noreferrer" className="underline">
                    {e.title}
                  </a>
                </p>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-700">{e.snippet}</p>
          </div>
        ))}
        {evidence.length === 0 && <div className="text-sm text-slate-600">No evidence items attached.</div>}
      </div>
    </div>
  );
}
