"use client";

import { useMemo, useState } from "react";

type EntityType = "drug" | "chemical" | "gene" | "disease";
type RelationType = "increases_activity" | "decreases_activity" | "treats" | "associated_with";

export interface EvidenceSource {
  id: string;
  label: string;
  url?: string;
  date?: string;
  provenance?: string;
}

export interface EvidencePacket {
  id: string;
  subject: { id: string; label: string; type: EntityType };
  relation: RelationType;
  object: { id: string; label: string; type: EntityType };
  confidence: number; // 0..1
  timestamps?: { ingested_at?: string; updated_at?: string };
  sources: EvidenceSource[];
  notes?: string;
  version?: string;
}

export default function EvidenceView({ packet }: { packet: EvidencePacket }) {
  const [copied, setCopied] = useState(false);
  const confidencePct = useMemo(() => Math.round(packet.confidence * 100), [packet.confidence]);
  const grade = useMemo(() => {
    if (packet.confidence >= 0.85) return { tag: "strong", color: "bg-emerald-500" };
    if (packet.confidence >= 0.7)  return { tag: "good",   color: "bg-blue-600" };
    return { tag: "exploratory", color: "bg-amber-500" };
  }, [packet.confidence]);

  const json = useMemo(() => JSON.stringify(packet, null, 2), [packet]);

  async function copyJSON() {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  }

  function downloadJSON() {
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const safe = packet.subject.label.replace(/[^\w\-]+/g, "_");
    a.download = `evidence_${safe}_${packet.id}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xl font-semibold text-foreground">evidence packet</div>
          <div className="text-xs text-foreground/60 mt-1">
            id: {packet.id}{packet.version ? ` • snapshot ${packet.version}` : ""}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={copyJSON}
            className="h-9 px-3 rounded-xl border border-border text-sm text-foreground/90 hover:bg-surface"
            title="copy JSON"
          >
            {copied ? "copied!" : "copy JSON"}
          </button>
          <button
            onClick={downloadJSON}
            className="h-9 px-3 rounded-xl text-sm font-medium text-white"
            style={{ background: "var(--ns-primary, #0A66FF)" }}
            title="download JSON"
          >
            download
          </button>
        </div>
      </div>

      {/* relationship */}
      <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
        <div className="text-sm text-foreground/70">relationship</div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <Pill label={packet.subject.label} sub={packet.subject.type} />
          <Arrow />
          <span className="text-sm font-medium">{prettyRel(packet.relation)}</span>
          <Arrow />
          <Pill label={packet.object.label} sub={packet.object.type} />
        </div>
      </div>

      {/* confidence / timestamps */}
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <div className="text-sm text-foreground/70">confidence</div>
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2 w-40 rounded-full bg-foreground/10 overflow-hidden">
              <div className={`h-2 ${grade.color}`} style={{ width: `${confidencePct}%` }} />
            </div>
            <div className="text-sm font-medium">{confidencePct}%</div>
            <span className="text-xs rounded-full bg-foreground/10 border border-border px-2 py-0.5">{grade.tag}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface p-5 md:col-span-2">
          <div className="text-sm text-foreground/70">timestamps</div>
          <div className="mt-2 text-sm">
            ingested: {packet.timestamps?.ingested_at || "—"} &nbsp;•&nbsp; updated: {packet.timestamps?.updated_at || "—"}
          </div>
        </div>
      </div>

      {/* sources */}
      <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
        <div className="text-sm text-foreground/70">sources</div>
        <ul className="mt-3 space-y-2">
          {packet.sources.map((s) => (
            <li key={s.id} className="text-sm">
              <span className="font-medium">{s.label}</span>{" "}
              {s.url ? (
                <a href={s.url} className="text-ns-primary hover:underline" target="_blank" rel="noreferrer">
                  {s.id}
                </a>
              ) : (
                <>{s.id}</>
              )}
              {s.date ? <> • <span className="text-foreground/60">{s.date}</span></> : null}
              {s.provenance ? <> • <span className="text-foreground/60">{s.provenance}</span></> : null}
            </li>
          ))}
        </ul>
      </div>

      {/* notes */}
      {packet.notes ? (
        <div className="mt-5 rounded-2xl border border-border bg-surface p-5">
          <div className="text-sm text-foreground/70">notes</div>
          <p className="mt-2 text-sm">{packet.notes}</p>
        </div>
      ) : null}

      {/* raw json */}
      <details className="mt-5 rounded-2xl border border-border bg-surface">
        <summary className="cursor-pointer px-5 py-3 text-sm">view JSON</summary>
        <pre className="px-5 pb-5 pt-2 text-xs overflow-auto">{json}</pre>
      </details>
    </div>
  );
}

/* UI bits */
function Pill({ label, sub }: { label: string; sub: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/5 px-3 py-1">
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-foreground/70">{sub}</span>
    </span>
  );
}
function Arrow() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 text-foreground/60" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
    </svg>
  );
}
function prettyRel(r: RelationType) {
  if (r === "increases_activity") return "increases activity";
  if (r === "decreases_activity") return "decreases activity";
  if (r === "treats") return "treats";
  return "associated with";
}
