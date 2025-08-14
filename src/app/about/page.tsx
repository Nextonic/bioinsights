import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <NavBar />
      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-bold">About BioInsights</h1>
          <p className="mt-4 text-slate-600">
            BioInsights is a suite for AI-assisted biomedical relationship discovery — connecting
            chemicals, genes, and diseases to help regulators and scientists make defensible decisions.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">Our mission</h2>
              <p className="mt-2 text-slate-600">
                Accelerate safe, evidence-based decisions by surfacing high-quality signals from
                biomedical data — with full provenance and transparency.
              </p>
            </div>
            <div className="rounded-2xl border p-6">
              <h2 className="text-xl font-semibold">Why now</h2>
              <p className="mt-2 text-slate-600">
                The knowledge base is exploding. Reviewers need a faster, auditable way to trace
                mechanisms and risks across drugs, chemicals, and genes.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border p-6">
            <h2 className="text-xl font-semibold">Team</h2>
            <p className="mt-2 text-slate-600">
              We’re a cross-functional group of data scientists, engineers, and regulatory experts
              focused on practical impact and scientific rigor.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
