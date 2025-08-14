"use client";

import { useMemo, useState } from "react";
import NavBar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

/** ---------- Types ---------- */
type Category = "Drug" | "Chemical" | "Gene";
type Item = {
  id: string;
  name: string;
  category: Category;
  description: string;
  confidence: number; // 0..1
  tags: string[];
  sources: number; // how many citations/sources back this
  updatedAt: string; // ISO date
  evidenceId: string;
};

/** ---------- Mock Data (replace with your API later) ---------- */
const MOCK: Item[] = [
  {
    id: "1",
    evidenceId: "ev-000124",
    name: "Aspirin",
    category: "Drug",
    description:
      "Nonsteroidal agent; may reduce inflammation and impact clotting factors via COX inhibition.",
    confidence: 0.86,
    tags: ["anti-inflammatory", "cardio", "cox"],
    sources: 12,
    updatedAt: "2025-07-15",
  },
  {
    id: "2",
    name: "Curcumin",
    category: "Chemical",
    description:
      "Polyphenol in turmeric; reported to increase antioxidant gene activity and modulate NF-κB.",
    confidence: 0.74,
    tags: ["antioxidant", "nfkb", "nutraceutical"],
    sources: 9,
    updatedAt: "2025-06-03",
    evidenceId: "ev-000124",
  },
  {
    id: "3",
    name: "TP53",
    category: "Gene",
    description:
      "Tumor suppressor; activated by DNA damage and various compounds; critical in apoptosis.",
    confidence: 0.92,
    tags: ["oncology", "apoptosis", "dna-damage"],
    sources: 20,
    updatedAt: "2025-05-12",
    evidenceId: "ev-000124",
  },
  {
    id: "4",
    name: "Nicotine",
    category: "Chemical",
    description:
      "Alkaloid; can decrease activity of certain metabolic genes and modulate cholinergic signaling.",
    confidence: 0.63,
    tags: ["neuro", "addiction", "metabolic"],
    sources: 7,
    updatedAt: "2025-03-28",
    evidenceId: "ev-000124",
  },
  {
    id: "5",
    name: "Metformin",
    category: "Drug",
    description:
      "Biguanide; affects AMPK signaling and may influence lipid/glucose metabolic pathways.",
    confidence: 0.81,
    tags: ["metabolic", "ampk", "endocrine"],
    sources: 15,
    updatedAt: "2025-04-18",
    evidenceId: "ev-000124",
  },
  {
    id: "6",
    name: "HMGCR",
    category: "Gene",
    description:
      "Rate-limiting enzyme in cholesterol synthesis; target of statins; gene activity modulated by several compounds.",
    confidence: 0.78,
    tags: ["lipids", "statins", "cardio"],
    sources: 11,
    updatedAt: "2025-05-29",
    evidenceId: "ev-000124",
  },
];

/** ---------- Utilities ---------- */
function classNames(...xs: Array<string | false | null | undefined>): string {
  return xs.filter(Boolean).join(" ");
}
function pct(n: number) {
  return Math.round(n * 100);
}
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

/** ---------- Icons (inline, no deps) ---------- */
function BadgeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.84L18.18 22 12 18.77 5.82 22 7 14.11l-5-4.84 6.91-1.01L12 2z"
        fill="currentColor"
      />
    </svg>
  );
}
function ConfidenceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M12 3l8 4v6c0 4.418-3.582 8-8 8s-8-3.582-8-8V7l8-4z"
        fill="currentColor"
        opacity="0.25"
      />
      <path d="M12 5l6 3v5c0 3.314-2.686 6-6 6s-6-2.686-6-6V8l6-3z" fill="currentColor" />
    </svg>
  );
}
function SourceIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path
        d="M4 4h16v16H4z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <path d="M7 8h10M7 12h10M7 16h6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function TimeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

/** ---------- Components ---------- */
function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={classNames(
        "h-8 px-3 rounded-full border text-sm",
        active ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-50"
      )}
    >
      {children}
    </button>
  );
}

function ConfidenceBar({ value }: { value: number }) {
  const width = Math.min(100, Math.max(0, pct(value)));
  const tone =
    value >= 0.85 ? "bg-emerald-500" : value >= 0.7 ? "bg-blue-600" : value >= 0.5 ? "bg-amber-500" : "bg-slate-400";
  return (
    <div className="mt-2">
      <div className="h-2 w-full rounded bg-slate-200 overflow-hidden">
        <div
          className={classNames("h-2", tone)}
          style={{ width: `${width}%`, transition: "width 180ms ease" }}
        />
      </div>
      <div className="mt-1 text-xs text-slate-500">{width}% confidence</div>
    </div>
  );
}

function ResultCard({ item }: { item: Item }) {
  return (
    <div className="rounded-2xl border p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={classNames(
                "text-xs px-2 py-0.5 rounded-full border",
                item.category === "Drug"
                  ? "border-blue-200 text-blue-700 bg-blue-50"
                  : item.category === "Chemical"
                  ? "border-amber-200 text-amber-700 bg-amber-50"
                  : "border-emerald-200 text-emerald-700 bg-emerald-50"
              )}
            >
              {item.category}
            </span>
            <span className="inline-flex items-center gap-1 text-xs text-slate-500">
              <TimeIcon /> Updated {formatDate(item.updatedAt)}
            </span>
          </div>
          <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
        </div>

        <div className="text-slate-500 text-xs inline-flex items-center gap-1">
          <SourceIcon />
          {item.sources} sources
        </div>
      </div>

      <p className="mt-2 text-sm text-slate-700">{item.description}</p>
      <ConfidenceBar value={item.confidence} />

      {item.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.tags.map((t) => (
            <span
              key={t}
              className="text-xs px-2 py-0.5 rounded-full border bg-white text-slate-700"
              title={`Tag: ${t}`}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center gap-2">
      <Link
  href={`/evidence?id=${item.evidenceId}`}
  className="ns-btn ns-btn--pri" 
><button className="h-9 px-3 rounded-xl bg-blue-600 text-white text-sm hover:bg-blue-700">
          Open evidence
        </button>
</Link>


        {/*<button className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-50">
          Save
        </button>
        <button className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-50">
          Share
        </button>*/}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  /** ---------- Local UI State ---------- */
  const [category, setCategory] = useState<"All" | Category>("All");
  const [query, setQuery] = useState<string>("");
  const [minConf, setMinConf] = useState<number>(0.5);
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<"relevance" | "confidence" | "newest">("relevance");
  const [page, setPage] = useState<number>(1);
  const pageSize = 6;

  /** ---------- Derived Data ---------- */
  const allTags = useMemo(() => {
    const s = new Set<string>();
    MOCK.forEach((i) => i.tags.forEach((t) => s.add(t)));
    return Array.from(s).sort((a, b) => a.localeCompare(b));
  }, []);

  const filtered = useMemo(() => {
    let items = MOCK.slice();

    if (category !== "All") {
      items = items.filter((i) => i.category === category);
    }
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q) ||
          i.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (activeTags.length) {
      items = items.filter((i) => activeTags.every((t) => i.tags.includes(t)));
    }
    items = items.filter((i) => i.confidence >= minConf);

    if (sort === "confidence") {
      items.sort((a, b) => b.confidence - a.confidence);
    } else if (sort === "newest") {
      items.sort((a, b) => +new Date(b.updatedAt) - +new Date(a.updatedAt));
    } else {
      // "relevance": a naive score based on text hit + confidence
      const q = query.trim().toLowerCase();
      const score = (i: Item) => {
        let s = i.confidence * 0.6;
        if (q) {
          const nameHit = i.name.toLowerCase().includes(q) ? 0.25 : 0;
          const descHit = i.description.toLowerCase().includes(q) ? 0.1 : 0;
          const tagHit = i.tags.some((t) => t.toLowerCase().includes(q)) ? 0.05 : 0;
          s += nameHit + descHit + tagHit;
        }
        return s;
      };
      items.sort((a, b) => score(b) - score(a));
    }

    return items;
  }, [category, query, activeTags, minConf, sort]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  const toggleTag = (t: string) => {
    setPage(1);
    setActiveTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));
  };

  /** ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      <NavBar />

      <main className="flex-1">
        {/* Header / Controls */}
        <div className="border-b bg-white/80 backdrop-blur sticky top-16 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex-1">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded bg-blue-600 text-white">
                    <BadgeIcon />
                  </span>
                  Results
                </h1>
                <p className="text-slate-500 text-sm">
                  Explore relationships across drugs, chemicals, and genes. Refine with filters below.
                </p>
              </div>

              {/* Quick search (local only) */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setPage(1);
                }}
                className="flex gap-2"
              >
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search within results…"
                  className="h-10 w-64 border rounded-xl px-3 text-sm placeholder:text-slate-400"
                />
                <button className="h-10 px-4 rounded-xl border text-sm hover:bg-slate-50" type="submit">
                  Search
                </button>
              </form>
            </div>

            {/* Tabs + Filters */}
            <div className="mt-4 flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {(["All", "Drug", "Chemical", "Gene"] as const).map((c) => (
                  <Chip key={c} active={category === c} onClick={() => { setCategory(c); setPage(1); }}>
                    {c}
                  </Chip>
                ))}
              </div>

              {/* Right-side controls */}
              <div className="flex flex-col md:flex-row gap-3 md:items-center">
                {/* Confidence slider */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-slate-600 inline-flex items-center gap-1">
                    <ConfidenceIcon /> Min confidence:
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={pct(minConf)}
                    onChange={(e) => {
                      setMinConf(Number(e.target.value) / 100);
                      setPage(1);
                    }}
                  />
                  <span className="text-sm text-slate-700 w-10 text-right">{pct(minConf)}%</span>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-600">Sort:</span>
                  <select
                    className="h-10 border rounded-xl px-2 text-sm"
                    value={sort}
                    onChange={(e) => {
                      setSort(e.target.value as typeof sort);
                      setPage(1);
                    }}
                  >
                    <option value="relevance">Relevance</option>
                    <option value="confidence">Confidence</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Tag filters */}
            <div className="mt-3 flex flex-wrap gap-2">
              {allTags.map((t) => (
                <Chip key={t} active={activeTags.includes(t)} onClick={() => toggleTag(t)}>
                  #{t}
                </Chip>
              ))}
              {activeTags.length > 0 && (
                <button
                  type="button"
                  className="text-sm text-blue-600 hover:underline"
                  onClick={() => setActiveTags([])}
                >
                  Clear tags
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {pageItems.length === 0 ? (
            <div className="rounded-2xl border p-8 bg-slate-50">
              <h3 className="font-semibold text-lg">No results match your filters</h3>
              <p className="mt-2 text-slate-600">
                Try lowering the confidence threshold, clearing some tags, or switching categories.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => setMinConf(0.3)}
                  className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-100"
                >
                  Set min confidence to 30%
                </button>
                <button
                  onClick={() => setActiveTags([])}
                  className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-100"
                >
                  Clear all tags
                </button>
                <button
                  onClick={() => setCategory("All")}
                  className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-100"
                >
                  Show all categories
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-slate-600">
                Showing <strong>{pageItems.length}</strong> of <strong>{total}</strong> items
                {category !== "All" && (
                  <>
                    {" "}in <strong>{category}</strong>
                  </>
                )}
                {activeTags.length > 0 && (
                  <>
                    {" "}matching tags: <strong>#{activeTags.join(" #")}</strong>
                  </>
                )}
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((it) => (
                  <ResultCard key={it.id} item={it} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-50 disabled:opacity-50"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-slate-600">
                    Page <strong>{page}</strong> of <strong>{totalPages}</strong>
                  </span>
                  <button
                    className="h-9 px-3 rounded-xl border text-sm hover:bg-slate-50 disabled:opacity-50"
                    disabled={page === totalPages}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
