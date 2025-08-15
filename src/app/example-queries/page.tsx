import Link from "next/link";


export default function ExampleQueriesPage() {
  const queries = [
    "What drugs may impact conditions related to Parkinson’s Disease?",
    "What chemicals may increase the activity of the TP53 gene?",
    "What chemicals may decrease the activity of the HMGCR gene?",
    "What genes’ activity may be increased by curcumin?",
    "What genes’ activity may be decreased by nicotine?",
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">Example Queries</h1>
          <p className="mt-4 text-slate-600">
            Try these ready-made questions to see typical BioInsights use cases.
          </p>

          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {queries.map((q) => (
              <div key={q} className="rounded-2xl border p-4 flex items-center justify-between gap-4">
                <span className="text-sm text-slate-700">{q}</span>
                {/* We’re not passing params — results is static in your setup */}
                <Link href="/results" className="text-blue-600 hover:underline text-sm">Run</Link>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}
