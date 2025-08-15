"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Beaker,
  ActivitySquare,
  Dna,
  Microscope,
  LineChart,
  ShieldCheck,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: "easeOut", delay },
});

export default function HomePage() {
  const router = useRouter();
  const [q, setQ] = useState("");

    function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // 🚀 No params — just go to results
    router.push("/results");
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      

      <main className="flex-1">
        {/* ===== HERO ===== */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div
              {...fadeUp(0)}
              className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-slate-500"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI-driven biomedical relationship discovery
            </ div>

            < h1
              {...fadeUp(0.06)}
              className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight"
            >
              Clarity for complex{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                drug–gene–disease
              </span>{" "}
              decisions
            </ h1>

            < p
              {...fadeUp(0.1)}
              className="mt-4 max-w-2xl text-base md:text-lg text-slate-500"
            >
              BioInsights helps FDA reviewers and scientists surface actionable evidence from chemicals, genes,
              and disease pathways—accelerating reviews, improving safety, and guiding policy.
            </ p>

            {/* Ask box */}
            < div {...fadeUp(0.18)} className="mt-10 rounded-2xl border bg-white/80">
              <div className="p-4 border-b">
                <h2 className="text-base md:text-lg font-semibold">Try a question</h2>
              </div>
              <div className="p-4 flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <form onSubmit={handleSubmit} className="flex w-full gap-3">
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="What drugs may impact conditions related to asthma?"
                    className="flex-1 h-11 rounded-xl border border-slate-300 px-3 text-sm placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                  <button
                    type="submit"
                    className="h-11 px-5 rounded-xl text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Ask
                  </button>
                </form>
          
              </div>
            </ div>
           
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 {...fadeUp(0)} className="text-2xl md:text-3xl font-semibold tracking-tight">
              Built for regulatory rigor
            </h2>
            <p {...fadeUp(0.06)} className="mt-2 max-w-2xl text-slate-500">
              BioInsights unifies biomedical knowledge to help reviewers, scientists, and policy teams reach
              confident, auditable decisions.
            </p>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: Beaker,
                  title: "Mechanism validation",
                  desc:
                    "Cross-check candidate mechanisms by mapping chemicals to gene activity and disease pathways.",
                },
                {
                  icon: ActivitySquare,
                  title: "Safety signal triage",
                  desc:
                    "Prioritize potential adverse effects via gene modulation patterns across related drugs.",
                },
                {
                  icon: Dna,
                  title: "Genomic context",
                  desc:
                    "Incorporate population variants and gene targets to assess subpopulation risks.",
                },
                {
                  icon: Microscope,
                  title: "Regulatory research",
                  desc:
                    "Generate hypotheses from chemical–gene–disease linkages to guide regulatory science.",
                },
                {
                  icon: LineChart,
                  title: "Evidence grading",
                  desc:
                    "Weight signals with transparent provenance and confidence indicators.",
                },
                {
                  icon: ShieldCheck,
                  title: "Reproducible decisions",
                  desc: "Create shareable evidence packets that trace every claim back to source.",
                },
              ].map((f, i) => (
                < div key={f.title} {...fadeUp(0.08 + i * 0.03)}>
                  <FeatureCard icon={f.icon} title={f.title} desc={f.desc} />
                </ div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FDA USE CASES ===== */}
        <section id="use-cases" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            < h2 {...fadeUp(0)} className="text-2xl md:text-3xl font-semibold tracking-tight">
              Targeted FDA use cases
            </ h2>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  center: "CDER",
                  headline: "Pre- & post-market safety",
                  blurb:
                    "Map drug–gene–disease links to confirm MoA, detect class effects, and triage adverse signals.",
                  example: "What drugs may impact conditions related to autoimmune diseases?",
                },
                {
                  center: "CBER",
                  headline: "Biologics & gene therapy",
                  blurb:
                    "Evaluate immune pathways and off-target effects for vaccines, cell and gene therapies.",
                  example: "What genes' activity may be increased by a vaccine adjuvant?",
                },
                {
                  center: "CFSAN",
                  headline: "Food & environmental safety",
                  blurb:
                    "Identify gene–chemical interactions from additives or contaminants that influence chronic disease.",
                  example: "What chemicals may increase the activity of a metabolic disorder gene?",
                },
                {
                  center: "CDRH",
                  headline: "Diagnostics & combos",
                  blurb:
                    "Align biomarkers with therapeutic effects and assess radiological agent risks.",
                  example: "What genes' activity may be decreased by a therapeutic compound?",
                },
                {
                  center: "Policy",
                  headline: "Population-aware guidance",
                  blurb:
                    "Surface risks for vulnerable populations; inform advisories and targeted policy.",
                  example: "What chemicals may increase the activity of a gene linked to birth defects?",
                },
              ].map((c, i) => (
                < div key={c.center} {...fadeUp(0.06 + i * 0.03)}>
                  <UseCaseCard
                    badge={c.center}
                    title={c.headline}
                    blurb={c.blurb}
                    example={c.example}
                  />
                </ div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== EVIDENCE PIPELINE ===== */}
        <section id="evidence" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            < h2 {...fadeUp(0)} className="text-2xl md:text-3xl font-semibold tracking-tight">
              From question to defensible evidence
            </ h2>

            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: "Integrate", text: "Aggregate biomedical sources and normalize entities into a unified knowledge graph." },
                { title: "Analyze", text: "Traverse gene–chemical–disease edges to uncover mechanisms and risks." },
                { title: "Grade", text: "Assign confidence using provenance, recency, and consensus signals." },
                { title: "Decide", text: "Export auditable evidence packets for transparent, reproducible reviews." },
              ].map((s, i) => (
                < div key={s.title} {...fadeUp(0.06 + i * 0.03)}>
                  <StepCard title={s.title} text={s.text} />
                </ div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== 
        <section id="contact" className="py-16 md:py-24">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            < div
              {...fadeUp(0)}
              className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50"
            >
              <div className="py-10 md:py-14 px-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                  <div className="md:col-span-2">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
                      Ready to see BioInsights in action?
                    </h3>
                    <p className="mt-2 text-slate-600">
                      Schedule a deep-dive on CDER, CBER, CFSAN, or CDRH workflows—or try the interactive demo with
                      sample queries.
                    </p>
                  </div>
                  <div className="flex md:justify-end gap-2">
                    <button className="h-11 px-5 rounded-2xl text-white bg-blue-600 hover:bg-blue-700">
                      Request a demo
                    </button>
                    <button className="h-11 px-5 rounded-2xl border border-slate-300 hover:bg-slate-50">
                      Talk to an expert
                    </button>
                  </div>
                </div>
              </div>
            </ div>
          </div>
        </section>*/}
      </main>


    </div>
  );
}

/* ---------- Small presentational cards ---------- */

function FeatureCard({
  icon: Icon,
  title,
  desc,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center">
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-600">{desc}</p>
    </div>
  );
}

function UseCaseCard({
  badge,
  title,
  blurb,
  example,
}: {
  badge: string;
  title: string;
  blurb: string;
  example: string;
}) {
  return (
    <div className="h-full rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
          {badge}
        </span>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-600">{blurb}</p>
      <div className="mt-3 text-xs text-slate-600 bg-slate-50 border rounded-xl px-3 py-2 inline-flex items-center gap-2">
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="italic">{example}</span>
      </div>
    </div>
  );
}

function StepCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="h-full rounded-2xl border bg-white p-4 shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center">
          {/* simple dot as an accent */}
          <div className="h-2.5 w-2.5 rounded-full bg-white" />
        </div>
        <h3 className="text-base font-semibold">{title}</h3>
      </div>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
}
