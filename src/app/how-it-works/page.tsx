import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

export default function HowItWorksPage() {
  const questions = [
    "What drugs may impact conditions related to <disease>?",
    "What chemicals may increase the activity of a <gene>?",
    "What chemicals may decrease the activity of a <gene>?",
    "What genes’ activity may be increased by <chemical>?",
    "What genes’ activity may be decreased by <chemical>?",
  ];

  const comparisons = [
    {
      dimension: "Search & Discovery",
      manual: "Keyword searches across papers, labels, and databases; time-consuming, inconsistent coverage.",
      bioinsights: "Graph traversal across normalized entities (drug/chemical/gene/disease) with directionality.",
    },
    {
      dimension: "Evidence Aggregation",
      manual: "Copy/paste into notes/spreadsheets; hard to keep current or consistent.",
      bioinsights: "Unified evidence packets with sources, timestamps, and de-duplication.",
    },
    {
      dimension: "Provenance & Audit",
      manual: "Manually tracked citations; prone to gaps.",
      bioinsights: "Every edge stores source IDs, collection method, and update history.",
    },
    {
      dimension: "Prioritization",
      manual: "Reviewer judgment; varies by team.",
      bioinsights: "Confidence scoring that weights provenance, recency, and consensus.",
    },
    {
      dimension: "Reproducibility",
      manual: "Difficult to re-run consistently.",
      bioinsights: "Deterministic pipelines with versioned snapshots.",
    },
  ];

  const faq = [
    {
      q: "What data sources can BioInsights use?",
      a: "Curated biomedical corpora, label-like datasets, ontologies, and graph resources. All inputs are normalized into a common schema with retained provenance.",
    },
    {
      q: "How are results ranked?",
      a: "By a confidence function that combines provenance, recency, consensus, and specificity. Each result keeps a transparent breakdown.",
    },
    {
      q: "Can I export the evidence?",
      a: "Yes. Evidence packets include relationships, citations, timestamps, and version metadata suitable for review records.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b bg-white/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold">How BioInsights Works</h1>
            <p className="mt-3 max-w-3xl text-slate-600">
              BioInsights turns structured biomedical questions into traceable evidence. It normalizes entities,
              traverses directional relationships, and returns graded results with full provenance — built for
              regulatory rigor and reproducibility.
            </p>
          </div>
        </section>

        {/* Visual Pipeline */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold">From Question → Evidence Packet</h2>
            <p className="mt-2 text-slate-600">A concise view of the end-to-end flow.</p>

            <div className="mt-6 overflow-hidden rounded-2xl border">
              <div className="bg-slate-50 p-4 text-sm text-slate-600">Pipeline overview</div>
              <div className="p-6">
                {/* Inline SVG: dependency-free */}
                <svg viewBox="0 0 960 260" className="w-full h-auto" aria-hidden>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                  </defs>

                  {/* swimlane backgrounds */}
                  <rect x="20" y="60" width="920" height="140" rx="14" fill="#f8fafc" stroke="#e2e8f0" />

                  {/* Nodes */}
                  {[
                    { x: 120, y: 130, label: "Ingest & Normalize", hint: "Clean + map to common schema" },
                    { x: 340, y: 130, label: "Entity Resolution", hint: "IDs, synonyms, classes" },
                    { x: 560, y: 130, label: "Graph Traversal", hint: "Directional edges" },
                    { x: 780, y: 130, label: "Grading & Output", hint: "Confidence + packet" },
                  ].map((n, i) => (
                    <g key={i} transform={`translate(${n.x},${n.y})`}>
                      <rect x="-110" y="-36" width="220" height="72" rx="14" fill="white" stroke="#e2e8f0" />
                      <text x="0" y="-4" textAnchor="middle" className="fill-slate-700" style={{ fontSize: 14 }}>
                        {n.label}
                      </text>
                      <text x="0" y="16" textAnchor="middle" className="fill-slate-500" style={{ fontSize: 12 }}>
                        {n.hint}
                      </text>
                    </g>
                  ))}

                  {/* Arrows */}
                  {[{ x: 230 }, { x: 450 }, { x: 670 }].map((a, i) => (
                    <g key={i} transform={`translate(${a.x},130)`}>
                      <line x1="0" y1="0" x2="70" y2="0" stroke="url(#g1)" strokeWidth="4" />
                      <polygon points="70,0 60,-6 60,6" fill="url(#g1)" />
                    </g>
                  ))}
                </svg>

                <div className="mt-6 grid md:grid-cols-4 gap-4 text-sm text-slate-700">
                  <div>
                    <div className="font-medium">Ingest & Normalize</div>
                    <p className="mt-1">
                      Literature-like corpora, label-like data, ontologies, and graph resources standardized into a common schema.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Entity Resolution</div>
                    <p className="mt-1">
                      Resolve synonyms/identifiers to a unified ID space for chemicals, drugs, genes, and diseases.
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Graph Traversal</div>
                    <p className="mt-1">
                      Traverse relationships with directionality (e.g., <em>increases_activity</em>, <em>decreases_activity</em>, <em>treats</em>).
                    </p>
                  </div>
                  <div>
                    <div className="font-medium">Grading & Output</div>
                    <p className="mt-1">
                      Rank by confidence (provenance × recency × consensus × specificity) and produce an auditable evidence packet.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Supported Questions */}
            <div className="mt-10 rounded-2xl border">
              <div className="bg-slate-50 p-4 text-sm text-slate-600">Supported question types</div>
              <div className="p-6 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {questions.map((q) => (
                  <div key={q} className="rounded-xl border p-4 text-sm text-slate-700 bg-white">
                    {q}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Evidence Scoring */}
        <section className="py-10 bg-slate-50 border-t border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold">Evidence Grading & Confidence</h2>
            <p className="mt-2 text-slate-600">
              Each result includes a confidence score. The score is a weighted combination of:
            </p>
            <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { t: "Provenance", d: "Source authority and transparency; curated/peer-reviewed sources preferred." },
                { t: "Recency", d: "Favors newer or recently corroborated evidence with source and ingest timestamps." },
                { t: "Consensus", d: "Agreement across independent sources; penalizes conflicts and singletons." },
                { t: "Specificity", d: "Precision of entities/relations (e.g., gene isoforms, directionality present)." },
              ].map((x) => (
                <div key={x.t} className="rounded-2xl border bg-white p-4">
                  <div className="font-medium">{x.t}</div>
                  <p className="mt-1 text-sm text-slate-700">{x.d}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border bg-white p-4 text-sm text-slate-700">
              <div className="font-medium">Interpreting scores</div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><span className="font-medium">≥ 0.85</span> — Strong, convergent evidence from high-quality sources.</li>
                <li><span className="font-medium">0.70–0.84</span> — Good support; consider subpopulation specifics.</li>
                <li><span className="font-medium">0.50–0.69</span> — Hypothesis-generating; prioritize follow-up.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Governance */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold">Data Governance & Reproducibility</h2>
            <div className="mt-4 grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border p-5">
                <div className="font-medium">Versioning & Snapshots</div>
                <p className="mt-1 text-sm text-slate-700">
                  Monthly incremental updates; quarterly full rebuilds. Each release carries a semantic version and changelog.
                </p>
              </div>
              <div className="rounded-2xl border p-5">
                <div className="font-medium">Lineage Tracking</div>
                <p className="mt-1 text-sm text-slate-700">
                  Every edge stores upstream source IDs, normalization rules, and timestamps for auditability.
                </p>
              </div>
              <div className="rounded-2xl border p-5">
                <div className="font-medium">Schema Stability</div>
                <p className="mt-1 text-sm text-slate-700">
                  A common, stable schema across entities enables downstream validation and programmatic reuse.
                </p>
              </div>
              <div className="rounded-2xl border p-5">
                <div className="font-medium">Access Controls</div>
                <p className="mt-1 text-sm text-slate-700">
                  Role-appropriate exports and redactions when sharing summaries or evidence externally.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-10 bg-slate-50 border-t border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold">Compared to Manual Review</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border bg-white">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600">
                  <tr className="text-left">
                    <th className="px-4 py-3 w-48">Dimension</th>
                    <th className="px-4 py-3">Traditional Workflow</th>
                    <th className="px-4 py-3">BioInsights</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {comparisons.map((row) => (
                    <tr key={row.dimension}>
                      <td className="px-4 py-3 font-medium text-slate-700">{row.dimension}</td>
                      <td className="px-4 py-3 text-slate-700">{row.manual}</td>
                      <td className="px-4 py-3 text-slate-700">{row.bioinsights}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Schema callout */}
            <div className="mt-6 rounded-2xl border bg-white p-4 text-sm text-slate-700">
              <div className="font-medium">Common Schema</div>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li><strong>entity_id</strong>, <strong>entity_type</strong> (drug/chemical/gene/disease)</li>
                <li><strong>relation</strong> (e.g., increases_activity, decreases_activity, treats, associated_with)</li>
                <li><strong>evidence_score</strong> (0–1), <strong>provenance</strong>, <strong>source_ids</strong></li>
                <li><strong>timestamps</strong> (ingested_at, updated_at), <strong>source_url</strong> (when available)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Micro-FAQ */}
        <section className="py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-semibold">Frequently Asked</h2>
            <div className="mt-4 grid md:grid-cols-3 gap-6">
              {faq.map((f) => (
                <div key={f.q} className="rounded-2xl border p-5">
                  <div className="font-medium">{f.q}</div>
                  <p className="mt-1 text-sm text-slate-700">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
