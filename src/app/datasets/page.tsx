import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { DATASETS, type Dataset } from "@/data/datasets";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function Action({
  href,
  children,
  kind = "primary",
}: {
  href?: string;
  children: React.ReactNode;
  kind?: "primary" | "secondary";
}) {
  const base =
    "h-9 px-3 rounded-xl text-sm inline-flex items-center justify-center whitespace-nowrap";
  if (href) {
    return (
      <a
        href={href}
        className={
          kind === "primary"
            ? `${base} bg-blue-600 text-white hover:bg-blue-700`
            : `${base} border hover:bg-slate-50`
        }
      >
        {children}
      </a>
    );
  }
  // Disabled/static (no onClick in Server Components)
  return (
    <span
      className={
        kind === "primary"
          ? `${base} bg-blue-300 text-white opacity-60 cursor-not-allowed`
          : `${base} border opacity-60 cursor-not-allowed`
      }
      aria-disabled="true"
      title="Coming soon"
    >
      {children}
    </span>
  );
}

export default function DatasetsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <section className="border-b bg-white/80 backdrop-blur">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold">Datasets</h1>
            <p className="mt-2 text-slate-600 max-w-3xl">
              Explore the BioInsights data foundation. Every dataset includes normalized identifiers,
              provenance tracking, and evidence grading suitable for regulatory workflows and audit.
            </p>
          </div>
        </section>

        {/* Grid */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 md:grid-cols-2">
            {DATASETS.map((ds) => (
              <article key={ds.id} className="rounded-2xl border p-5 hover:shadow-sm transition-shadow">
                <header className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{ds.name}</h2>
                    <div className="mt-1 text-xs text-slate-500">
                      v{ds.version} • Updated {fmtDate(ds.lastUpdated)} • {ds.records} • {ds.size}
                    </div>
                  </div>
                  <span className="text-xs px-2 py-0.5 rounded-full border bg-slate-50">
                    {ds.license}
                  </span>
                </header>

                <p className="mt-3 text-sm text-slate-700">{ds.description}</p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {ds.tags.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full border bg-white text-slate-700">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Provenance & sources */}
                <div className="mt-4 rounded-xl border bg-slate-50 p-3">
                  <div className="text-xs text-slate-500">Provenance</div>
                  <div className="text-sm text-slate-700">{ds.provenance}</div>
                  <div className="mt-2 text-xs text-slate-500">Primary sources</div>
                  <ul className="mt-1 list-disc pl-5 text-sm text-slate-700">
                    {ds.sources.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>

                {/* Actions (no onClick passed) */}
                <div className="mt-5 flex flex-wrap gap-2">
                  <Action href={ds.downloadHref} kind="primary">
                    Download
                  </Action>
                  <Action href={ds.docsHref} kind="secondary">
                    Documentation
                  </Action>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
