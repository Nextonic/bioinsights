"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroEntitySearch, { type EntityType } from "@/components/HeroEntitySearch";

type SearchItem = {
  id: string;
  label: string;
  kind: EntityType;
  snippet?: string;
};

export default function ResultsClient({
  initialType,
  initialQuery,
}: {
  initialType: EntityType;
  initialQuery: string;
}) {
  const searchParams = useSearchParams();

  // Live values from the URL (fallback to server-provided defaults)
  const type = useMemo<EntityType>(() => {
    const t = (searchParams.get("type") ?? initialType).toLowerCase().trim();
    const valid: EntityType[] = ["gene", "pathway", "disease", "drug", "adverse_event"];
    return (valid.includes(t as EntityType) ? t : "gene") as EntityType;
  }, [searchParams, initialType]);

  const q = (searchParams.get("q") ?? initialQuery).trim();

  const [items, setItems] = useState<SearchItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // Fetch on type/q change
  useEffect(() => {
    if (!q) {
      setItems(null);
      setErr(null);
      setLoading(false);
      return;
    }

    const ctrl = new AbortController();
    setLoading(true);
    setErr(null);

    const params = new URLSearchParams({ type, q });
    fetch(`/api/search?${params.toString()}`, { signal: ctrl.signal })
      .then((r) => {
        if (!r.ok) throw new Error(`Search failed (${r.status})`);
        return r.json();
      })
      .then((data) => {
        // Expecting { items: SearchItem[] }
        setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch((e) => {
        if (e.name !== "AbortError") setErr(e.message || "Search error");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [type, q]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold">Results</h1>
        <p className="text-sm text-slate-600">
          {q ? (
            <>
              Showing matches for <span className="font-medium">{q}</span> in{" "}
              <span className="font-medium">
                {type === "adverse_event" ? "adverse events" : `${type}s`}
              </span>
              .
            </>
          ) : (
            "Choose a type and enter a value to get started."
          )}
        </p>
      </header>

      {/* Refinement UI (stays on /results) */}
      <div className="bg-white border rounded-xl p-4 shadow-sm">
        <HeroEntitySearch
          initialType={type}
          initialQuery={q}
          destination="/results"
        />
      </div>

      {/* States */}
      {!q ? (
        <div className="text-sm text-slate-600 border rounded-xl p-6 bg-slate-50">
          Tip: try <span className="font-medium">TP53</span> (gene) or{" "}
          <span className="font-medium">Metformin</span> (drug).
        </div>
      ) : loading ? (
        <div className="text-sm text-slate-600 border rounded-xl p-6 bg-slate-50">
          Searching…
        </div>
      ) : err ? (
        <div className="text-sm text-red-700 border rounded-xl p-6 bg-red-50">
          {err}
        </div>
      ) : items && items.length === 0 ? (
        <div className="text-sm text-slate-600 border rounded-xl p-6 bg-slate-50">
          No results for <span className="font-medium">{q}</span> in{" "}
          <span className="font-medium">
            {type === "adverse_event" ? "adverse events" : `${type}s`}
          </span>
          . Try another term or a different type.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items?.map((item) => (
            <article key={item.id} className="border rounded-2xl p-4 shadow-sm bg-white">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-lg font-semibold leading-snug">{item.label}</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full border bg-slate-50 self-start">
                  {item.kind === "adverse_event" ? "Adverse event" : item.kind}
                </span>
              </div>
              {item.snippet && (
                <p className="mt-2 text-sm text-slate-700 line-clamp-3">{item.snippet}</p>
              )}
              <div className="mt-3 text-xs text-slate-600">
                <span className="font-medium">ID:</span> {item.id}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
