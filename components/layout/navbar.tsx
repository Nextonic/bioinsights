"use client";

import Link from "next/link";

export default function NavBar() {
  return (
    <div className="sticky top-0 z-40 w-full backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-400" />
          <span className="font-semibold text-lg tracking-tight">BioInsights</span>
          <span className="ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-xs bg-slate-100 text-slate-700 border border-slate-200">
            Suite
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="/#use-cases" className="text-slate-500 hover:text-slate-900">Use cases</a>
          <a href="/#features" className="text-slate-500 hover:text-slate-900">Features</a>
          <a href="/#evidence" className="text-slate-500 hover:text-slate-900">Evidence</a>
          <a href="/#contact" className="text-slate-500 hover:text-slate-900">Contact</a>
        </nav>

        {/*<div className="flex items-center gap-2">
          <button className="hidden sm:inline-flex h-10 px-4 rounded-xl text-sm hover:bg-slate-100">
            Sign in
          </button>
          <button className="h-10 px-4 rounded-2xl text-sm text-white bg-blue-600 hover:bg-blue-700">
            Request a demo
          </button>
        </div>*/}
      </div>
    </div>
  );
}
     