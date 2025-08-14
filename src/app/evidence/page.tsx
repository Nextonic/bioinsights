// src/app/evidence/page.tsx
"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// layout
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

// viewer
import EvidenceView, { EvidencePacket } from "./EvidenceView";

/** Demo registry — replace with your data layer later */
const REGISTRY: Record<string, EvidencePacket> = {
  "ev-000124": {
    id: "ev-000124",
    subject: { id: "CHEMBL:25", label: "Acetylcysteine", type: "drug" },
    relation: "treats",
    object: { id: "MONDO:0005148", label: "COPD", type: "disease" },
    confidence: 0.82,
    timestamps: { ingested_at: "2025-08-01", updated_at: "2025-08-10" },
    sources: [
      {
        id: "PMID:34567890",
        label: "Clinical study",
        url: "https://pubmed.ncbi.nlm.nih.gov/34567890",
        date: "2024-11-03",
        provenance: "literature",
      },
      { id: "CHEMBL:25→MONDO:0005148", label: "Graph edge", provenance: "curated-db" },
    ],
    notes:
      "Signal consistent across two independent sources; consider phenotype stratification.",
    version: "v2025.08",
  },
  "ev-000221": {
    id: "ev-000221",
    subject: { id: "PUBCHEM:5793", label: "Dexamethasone", type: "drug" },
    relation: "decreases_activity",
    object: { id: "HGNC:4193", label: "IL6", type: "gene" },
    confidence: 0.9,
    timestamps: { ingested_at: "2025-07-15", updated_at: "2025-08-09" },
    sources: [
      {
        id: "PMID:32012345",
        label: "In vitro assay",
        url: "https://pubmed.ncbi.nlm.nih.gov/32012345",
        date: "2023-05-12",
        provenance: "literature",
      },
    ],
    version: "v2025.08",
  },
};

function EvidenceContent() {
  const params = useSearchParams(); // CSR dynamic API → must be inside <Suspense>
  const id = params.get("id") ?? "";
  const packet = useMemo(() => (id ? REGISTRY[id] : undefined), [id]);

  return (
    <>
      {/* Hero header strip */}
      <section
        className="border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-xs font-semibold tracking-wide uppercase"
               style={{ color: "var(--ns-muted, #667085)" }}>
            evidence
          </div>
          <h1 className="mt-2 text-2xl font-semibold"
              style={{ color: "var(--foreground)" }}>
            evidence packet
          </h1>
          <p className="mt-2 text-sm"
             style={{ color: "color-mix(in oklab, var(--foreground) 65%, transparent)" }}>
            Open, auditable relationship details with provenance and confidence scoring.
          </p>
        </div>
      </section>

      {/* Body */}
      <main>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {!id || !packet ? (
            <div className="rounded-2xl border p-6"
                 style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <div className="text-base font-medium" style={{ color: "var(--foreground)" }}>
                no evidence found
              </div>
              <p className="mt-2 text-sm"
                 style={{ color: "color-mix(in oklab, var(--foreground) 70%, transparent)" }}>
                Open from the results list, or pass an id like:
              </p>
              <pre className="mt-4 rounded-xl border p-4 text-sm overflow-auto"
                   style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
{`/evidence?id=ev-000124`}
              </pre>
              <div className="mt-4">
                <Link
                  href="/results"
                  className="inline-flex items-center h-10 px-4 rounded-xl text-sm font-medium text-white"
                  style={{ background: "var(--ns-primary, #0A66FF)" }}
                >
                  back to results
                </Link>
              </div>
            </div>
          ) : (
            <EvidenceView packet={packet} />
          )}
        </div>
      </main>
    </>
  );
}

export default function EvidencePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <Navbar />

      {/* Suspense wrapper required for useSearchParams */}
      <Suspense
        fallback={
          <section className="border-b" style={{ borderColor: "var(--border)" }}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
              <div style={{ color: "color-mix(in oklab, var(--foreground) 80%, transparent)" }}>
                loading evidence…
              </div>
            </div>
          </section>
        }
      >
        <EvidenceContent />
      </Suspense>

      <Footer />
    </div>
  );
}
