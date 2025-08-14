import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function FdaUseCasesPage() {
  const useCases = [
    {
      center: "CDER",
      title: "Drug Evaluation & Research",
      text: "Support pre- and post-market safety reviews by surfacing mechanistic connections between drugs, target pathways, and observed adverse events. Identify potential class effects and drug-drug interactions earlier in the review cycle.",
      bullets: [
        "Assess mechanism of action overlap across approved and investigational drugs",
        "Spot possible off-target effects based on gene and pathway relationships",
        "Prioritize post-market surveillance targets"
      ],
    },
    {
      center: "CBER",
      title: "Biologics & Gene Therapy",
      text: "Evaluate potential immune and genetic pathway impacts for cell, gene, and tissue-based therapies. Identify risks from vector components, transgenes, or manufacturing impurities.",
      bullets: [
        "Map viral vector components to known immune response pathways",
        "Identify genes with altered activity due to therapy components",
        "Flag potential long-term gene regulation changes"
      ],
    },
    {
      center: "CFSAN",
      title: "Food & Environmental Safety",
      text: "Connect environmental chemicals, food additives, and contaminants to gene-level activity and disease outcomes, enabling faster response to emerging risks.",
      bullets: [
        "Identify food additive → gene interactions linked to metabolic disorders",
        "Trace environmental exposure pathways to target organ systems",
        "Prioritize risk assessment for vulnerable populations"
      ],
    },
    {
      center: "CDRH",
      title: "Devices & Combination Products",
      text: "Support evaluation of diagnostics, imaging agents, and combination products by linking biomarkers and device-delivered agents to molecular effects.",
      bullets: [
        "Map diagnostic biomarkers to gene expression and disease states",
        "Analyze radiological or contrast agents for off-target interactions",
        "Inform device labeling with molecular risk data"
      ],
    },
    {
      center: "OC/Policy",
      title: "Office of the Commissioner & Policy Makers",
      text: "Enable population-level insights to inform safety communications, labeling changes, and guidance updates, especially for at-risk subgroups.",
      bullets: [
        "Identify trends in gene–disease associations for vulnerable demographics",
        "Support evidence-based policy with cross-domain molecular data",
        "Rapidly evaluate public health impact of new safety findings"
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <NavBar />
      <main className="flex-1">
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">Use Cases</h1>
          <p className="mt-4 text-slate-600">
            BioInsights adapts to the needs of each FDA center, from drug and biologic reviews to environmental safety and policy-making.  
            Below are tailored applications for different FDA audiences, along with example tasks and benefits.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {useCases.map((c) => (
              <div key={c.title} className="rounded-2xl border p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border">{c.center}</span>
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                </div>
                <p className="mt-2 text-slate-600">{c.text}</p>
                <ul className="mt-4 list-disc pl-5 text-sm text-slate-600 space-y-1">
                  {c.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border p-6 bg-slate-50">
            <h2 className="text-xl font-semibold">How BioInsights Integrates with FDA Workflows</h2>
            <p className="mt-2 text-slate-600">
              By answering structured biomedical questions in seconds, BioInsights streamlines evidence gathering for regulatory decisions:
            </p>
            <ol className="mt-4 list-decimal pl-6 space-y-1 text-slate-600">
              <li>Reviewer enters a structured query (e.g., “What drugs may impact conditions related to Parkinson’s Disease?”)</li>
              <li>BioInsights retrieves relevant relationships from curated biomedical knowledge graphs</li>
              <li>Results are ranked, annotated, and linked to source citations for auditability</li>
              <li>Reviewers can export evidence packets for inclusion in regulatory reviews or safety communications</li>
            </ol>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
