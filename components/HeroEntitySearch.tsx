"use client";

import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export type EntityType = "gene" | "pathway" | "disease" | "drug" | "adverse_event";

const ENTITY_TYPES: EntityType[] = ["gene", "pathway", "disease", "drug", "adverse_event"];

const placeholders: Record<EntityType, string> = {
  gene: "e.g., TP53, BRCA1",
  pathway: "e.g., PI3K-Akt signaling pathway",
  disease: "e.g., Type 2 diabetes",
  drug: "e.g., Metformin",
  adverse_event: "e.g., hepatotoxicity",
};

export default function HeroEntitySearch({
  initialType = "gene",
  initialQuery = "",
  destination = "/results", // ✅ default to /results
}: {
  initialType?: EntityType;
  initialQuery?: string;
  destination?: string;
}) {
  const router = useRouter();
  const [type, setType] = useState<EntityType>(initialType);
  const [q, setQ] = useState(initialQuery);
  const [err, setErr] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ph = useMemo(() => placeholders[type], [type]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const value = q.trim();
    if (!value) {
      setErr("Please enter a value.");
      inputRef.current?.focus();
      return;
    }
    setErr(null);
    const params = new URLSearchParams({ type, q: value });
    router.push(`${destination}?${params.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      {/* Type chooser */}
      <div className="flex flex-wrap gap-2 mb-3" role="radiogroup" aria-label="Entity type">
        {ENTITY_TYPES.map((t) => {
          const active = t === type;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={active}
              className={`px-3 py-1.5 rounded-full text-xs border transition
                ${active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 hover:bg-slate-50"}`}
            >
              {t === "adverse_event" ? "Adverse event" : t[0].toUpperCase() + t.slice(1)}
            </button>
          );
        })}
      </div>

      {/* Input + submit */}
      <div className="flex items-stretch gap-2">
        <div className="flex-1">
          <label htmlFor="hero-entity-input" className="sr-only">
            {type === "adverse_event" ? "Adverse event" : type}
          </label>
          <input
            id="hero-entity-input"
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={ph}
            className={`w-full border rounded-md px-3 py-2 text-sm ${
              err ? "border-red-500" : ""
            }`}
            autoComplete="off"
          />
          {err && <p className="mt-1 text-xs text-red-600">{err}</p>}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {/* Helper line */}
      <p className="mt-2 text-xs text-slate-600">
        Enter a {type === "adverse_event" ? "term" : type} to explore joins, provenance, and linked datasets.
      </p>
    </form>
  );
}
