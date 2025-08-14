import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function HowItWorksPage() {
  const steps = [
    { title: "Ingest & Normalize", text: "Unify heterogeneous biomedical sources into a consistent knowledge graph." },
    { title: "Ask", text: "Pose structured questions (drug→disease, chemical→gene activity, gene→chemical modifiers)." },
    { title: "Traverse & Rank", text: "Explore edges and weigh signals by provenance, recency, and consensus." },
    { title: "Explain", text: "Produce traceable evidence with citations and clear reasoning paths." },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <NavBar />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">How BioInsights Works</h1>
          <p className="mt-4 text-slate-600">
            From question to defensible evidence, BioInsights keeps the full chain of reasoning auditable.
          </p>

          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {steps.map((s) => (
              <div key={s.title} className="rounded-2xl border p-5">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Supported question types</h2>
            <ul className="mt-3 list-disc pl-6 text-slate-600 space-y-1">
              <li>What drugs may impact conditions related to &lt;disease&gt;?</li>
              <li>What chemicals may increase the activity of a &lt;gene&gt;?</li>
              <li>What chemicals may decrease the activity of a &lt;gene&gt;?</li>
              <li>What genes’ activity may be increased by &lt;chemical&gt;?</li>
              <li>What genes’ activity may be decreased by &lt;chemical&gt;?</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
