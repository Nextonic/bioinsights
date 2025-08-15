// src/app/results/page.tsx
import React, { Suspense } from "react";
import ResultsClient from "./ResultsClient";

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-6 text-sm text-slate-600">Loading results…</div>}>
      <ResultsClient />
    </Suspense>
  );
}
