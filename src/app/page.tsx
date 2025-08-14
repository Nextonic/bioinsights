"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Beaker,
  ActivitySquare,
  Dna,
  Microscope,
  LineChart,
  ShieldCheck,
  Database,
  ScrollText,
  Sparkles,
  Share2,
  Layers,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";



const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function NavBar() {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400" />
          <span className="font-semibold text-lg tracking-tight">BioInsights</span>
          <Badge className="ml-2" variant="secondary">Suite</Badge>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#use-cases" className="text-muted-foreground hover:text-foreground">Use cases</a>
          <a href="#features" className="text-muted-foreground hover:text-foreground">Features</a>
          <a href="#audiences" className="text-muted-foreground hover:text-foreground">FDA centers</a>
          <a href="#evidence" className="text-muted-foreground hover:text-foreground">Evidence</a>
          <a href="#contact" className="text-muted-foreground hover:text-foreground">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex">Sign in</Button>
          <Button className="rounded-2xl">Request a demo</Button>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-blue-200 to-cyan-100 blur-3xl opacity-60" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-tr from-indigo-200 to-purple-100 blur-3xl opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-24">
        <motion.div {...fadeUp} className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          AI‑driven biomedical relationship discovery
        </motion.div>
        <motion.h1 {...fadeUp} transition={{...fadeUp.transition, delay: 0.06}} className="mt-4 text-4xl md:text-6xl font-semibold tracking-tight">
          Clarity for complex <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">drug–gene–disease</span> decisions
        </motion.h1>
        <motion.p {...fadeUp} transition={{...fadeUp.transition, delay: 0.1}} className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground">
          BioInsights helps FDA reviewers and scientists surface actionable evidence from chemicals, genes, and disease pathways—accelerating reviews, improving safety, and guiding policy.
        </motion.p>

        <motion.div {...fadeUp} transition={{...fadeUp.transition, delay: 0.16}} className="mt-6 flex flex-col sm:flex-row gap-3">
          <Button size="lg" className="rounded-2xl group">
            Launch interactive demo
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-2xl" asChild>
            <a href="/Translator_for_FDA_Pitch_Sheet.pdf" target="_blank" rel="noopener noreferrer">
              Download pitch sheet
            </a>
          </Button>
        </motion.div>

        <motion.div {...fadeUp} transition={{...fadeUp.transition, delay: 0.22}} className="mt-10">
          <Card className="shadow-sm border-muted/60">
            <CardHeader className="pb-2">
              <CardTitle className="text-base md:text-lg">Try a question</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="flex-1">
                <Input placeholder="What drugs may impact conditions related to asthma?" className="h-11 rounded-xl" />
              </div>
              <div className="flex gap-2">
                <Button className="rounded-xl">Ask</Button>
                <Button variant="outline" className="rounded-xl">View examples</Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div {...fadeUp} transition={{...fadeUp.transition, delay: 0.28}} className="mt-12 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-6 text-muted-foreground">
          {["CDER", "CBER", "CFSAN", "CDRH", "OCS", "Policy"].map((x) => (
            <div key={x} className="text-center text-xs md:text-sm opacity-80">{x}</div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc }: { icon: LucideIcon; title: string; desc: string }) {
  return (
    <Card className="shadow-sm border-muted/60">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">{desc}</CardContent>
    </Card>
  );
}

function Features() {
  const items = [
    { icon: Beaker, title: "Mechanism validation", desc: "Cross-check candidate mechanisms by mapping chemicals to gene activity and disease pathways." },
    { icon: ActivitySquare, title: "Safety signal triage", desc: "Prioritize potential adverse effects via gene modulation patterns across related drugs." },
    { icon: Dna, title: "Genomic context", desc: "Incorporate population variants and gene targets to assess subpopulation risks." },
    { icon: Microscope, title: "Regulatory research", desc: "Generate hypotheses from chemical–gene–disease linkages to guide regulatory science." },
    { icon: LineChart, title: "Evidence grading", desc: "Weight signals with transparent provenance and confidence indicators." },
    { icon: ShieldCheck, title: "Reproducible decisions", desc: "Create shareable evidence packets that trace every claim back to source." },
  ];
  return (
    <section id="features" className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-semibold tracking-tight">Built for regulatory rigor</motion.h2>
        <motion.p {...fadeUp} transition={{...fadeUp.transition, delay: 0.06}} className="mt-2 max-w-2xl text-muted-foreground">BioInsights unifies biomedical knowledge to help reviewers, scientists, and policy teams reach confident, auditable decisions.</motion.p>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((it) => (
            <motion.div key={it.title} {...fadeUp}>
              <FeatureCard icon={it.icon} title={it.title} desc={it.desc} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  const cases = [
    { center: "CDER", icon: Layers, headline: "Pre‑ & post‑market safety", blurb: "Map drug–gene–disease links to confirm MoA, detect class effects, and triage adverse signals.", example: "What drugs may impact conditions related to autoimmune diseases?" },
    { center: "CBER", icon: Share2, headline: "Biologics & gene therapy", blurb: "Evaluate immune pathways and off‑target effects for vaccines, cell and gene therapies.", example: "What genes' activity may be increased by a vaccine adjuvant?" },
    { center: "CFSAN", icon: Beaker, headline: "Food & environmental safety", blurb: "Identify gene–chemical interactions from additives or contaminants that influence chronic disease.", example: "What chemicals may increase the activity of a metabolic disorder gene?" },
    { center: "CDRH", icon: ShieldCheck, headline: "Diagnostics & combos", blurb: "Align biomarkers with therapeutic effects and assess radiological agent risks.", example: "What genes' activity may be decreased by a therapeutic compound?" },
    { center: "Policy", icon: ScrollText, headline: "Population‑aware guidance", blurb: "Surface risks for vulnerable populations; inform advisories and targeted policy.", example: "What chemicals may increase the activity of a gene linked to birth defects?" },
  ];

  return (
    <section id="use-cases" className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-2xl md:3xl font-semibold tracking-tight">Targeted FDA use cases</motion.h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {cases.map((c) => (
            <motion.div key={c.center} {...fadeUp}>
              <Card className="h-full shadow-sm border-muted/60">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center">
                      <c.icon className="h-4 w-4" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{c.center}</Badge>
                      <CardTitle className="text-base">{c.headline}</CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{c.blurb}</p>
                  <div className="mt-3 text-xs text-slate-600 bg-slate-50 border rounded-xl px-3 py-2 inline-flex items-center gap-2">
                    <ChevronRight className="h-3.5 w-3.5" />
                    <span className="italic">{c.example}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Evidence() {
  const steps = [
    { icon: Database, title: "Integrate", text: "Aggregate biomedical sources and normalize entities into a unified knowledge graph." },
    { icon: Microscope, title: "Analyze", text: "Traverse gene–chemical–disease edges to uncover mechanisms and risks." },
    { icon: LineChart, title: "Grade", text: "Assign confidence using provenance, recency, and consensus signals." },
    { icon: ShieldCheck, title: "Decide", text: "Export auditable evidence packets for transparent, reproducible reviews." },
  ];
  return (
    <section id="evidence" className="py-16 md:py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 {...fadeUp} className="text-2xl md:text-3xl font-semibold tracking-tight">From question to defensible evidence</motion.h2>
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s) => (
            <motion.div key={s.title} {...fadeUp}>
              <Card className="h-full shadow-sm border-muted/60">
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400 text-white flex items-center justify-center">
                      <s.icon className="h-4 w-4" />
                    </div>
                    <CardTitle className="text-base">{s.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">{s.text}</CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="shadow-sm border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50">
          <CardContent className="py-10 md:py-14">
            <div className="grid md:grid-cols-3 gap-6 items-center">
              <div className="md:col-span-2">
                <h3 className="text-xl md:text-2xl font-semibold tracking-tight">Ready to see BioInsights in action?</h3>
                <p className="mt-2 text-muted-foreground">Schedule a deep‑dive on CDER, CBER, CFSAN, or CDRH workflows—or try the interactive demo with sample queries.</p>
              </div>
              <div className="flex md:justify-end gap-2">
                <Button size="lg" className="rounded-2xl">Request a demo</Button>
                <Button size="lg" variant="outline" className="rounded-2xl">Talk to an expert</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-10 border-t bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400" />
          <span>BioInsights Suite</span>
        </div>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-foreground">Security</a>
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
        </div>
        <div>© {new Date().getFullYear()} Nextonic Solutions</div>
      </div>
    </footer>
  );
}

export default function BioInsightsHome() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavBar />
      <Hero />
      <Features />
      <UseCases />
      <Evidence />
      <CTA />
      <Footer />
    </div>
  );
}