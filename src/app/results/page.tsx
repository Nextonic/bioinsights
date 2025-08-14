import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl font-bold mb-6">Results</h1>
        <p className="text-slate-500 mb-8">
          Here are your results from the BioInsights Suite.
        </p>

        {/* Example static results */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Aspirin</h3>
              <span className="text-xs px-2 py-0.5 rounded-full border">Drug</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              May reduce inflammation and impact clotting factors.
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Curcumin</h3>
              <span className="text-xs px-2 py-0.5 rounded-full border">Chemical</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Increases activity of antioxidant genes.
            </p>
          </div>

          <div className="rounded-2xl border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">TP53</h3>
              <span className="text-xs px-2 py-0.5 rounded-full border">Gene</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Tumor suppressor gene activated by various compounds.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
