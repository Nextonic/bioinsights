export default function FdaLifecycleVisual() {
  return (
    <section className="py-16 bg-slate-50 border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-slate-900">
          Connecting Data Across the FDA-Regulated Development Lifecycle
        </h2>
        <p className="mt-3 max-w-4xl text-slate-600">
          BioInsights integrates biomedical data from each stage of the device and drug development process,
          aligning with the phases and review checkpoints the FDA monitors. This ensures a continuous, auditable
          evidence chain from early discovery to post-market surveillance.
        </p>

        {/* Visual diagram */}
        <div className="mt-10 bg-white rounded-2xl shadow border p-6">
          <svg viewBox="0 0 1100 380" className="w-full h-auto" aria-hidden>
            <defs>
              <linearGradient id="phaseGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>

            {/* Timeline bar */}
            <line x1="80" y1="190" x2="1020" y2="190" stroke="url(#phaseGrad)" strokeWidth="6" />

            {/* Phases */}
            {[
              { x: 120, label: "Discovery & Preclinical", desc: "Biomarker identification, in vitro/in vivo data" },
              { x: 300, label: "Investigational Device/Drug (IDE/IND)", desc: "Regulatory submissions, early safety data" },
              { x: 500, label: "Clinical Trials", desc: "Phase I–III data, efficacy endpoints" },
              { x: 700, label: "FDA Review & Approval", desc: "NDA/BLA/PMA review packages" },
              { x: 900, label: "Post-Market Surveillance", desc: "Adverse events, real-world evidence" },
            ].map((p, i) => (
              <g key={i} transform={`translate(${p.x},190)`}>
                <circle r="40" fill="white" stroke="#cbd5e1" strokeWidth="2" />
                <text
                  x="0"
                  y="-55"
                  textAnchor="middle"
                  className="fill-slate-800"
                  style={{ fontSize: 14, fontWeight: "bold" }}
                >
                  {p.label}
                </text>
                <foreignObject x="-70" y="50" width="140" height="80">
                  <div style={{ fontSize: "12px", color: "#475569", textAlign: "center" }}>
                    {p.desc}
                  </div>
                </foreignObject>
              </g>
            ))}

            {/* BioInsights collector */}
            <rect x="460" y="280" width="180" height="60" rx="10" fill="#2563eb" />
            <text x="550" y="315" textAnchor="middle" fill="white" style={{ fontSize: 16, fontWeight: "bold" }}>
              BioInsights
            </text>

            {/* Data flow arrows to BioInsights */}
            {[120, 300, 500, 700, 900].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1="230"
                x2="550"
                y2="280"
                stroke="#94a3b8"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
            ))}

            {/* Arrowhead marker */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="6"
                markerHeight="6"
                refX="5"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Description */}
        <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm text-slate-700">
          <div>
            <h3 className="font-medium">Data Sources at Each Phase</h3>
            <p className="mt-1">
              From early lab notebooks and preclinical assays to structured trial registries, regulatory
              submissions, and real-world monitoring — BioInsights ingests and harmonizes data from all points.
            </p>
          </div>
          <div>
            <h3 className="font-medium">Regulatory Alignment</h3>
            <p className="mt-1">
              Each ingestion step is tagged to an FDA oversight domain, making it easier to generate targeted
              evidence for CDRH, CDER, or CBER review pathways.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
