import ResultsClient from "./ResultsClient";

const VALID_TYPES = ["gene", "pathway", "disease", "drug", "adverse_event"] as const;
type EntityType = (typeof VALID_TYPES)[number];

// Promise-compatible concrete type (assignable to Promise<any>)
type SearchParamMap = Readonly<Record<string, string | undefined>>;

function normalizeType(t?: string): EntityType {
  const v = (t ?? "").toLowerCase().trim();
  return (VALID_TYPES as readonly string[]).includes(v) ? (v as EntityType) : "gene";
}

export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<SearchParamMap>;
}) {
  const sp = (await (searchParams ?? Promise.resolve({} as SearchParamMap)));
  const type = normalizeType(sp.type);
  const q = (sp.q ?? "").trim();

  return <ResultsClient initialType={type} initialQuery={q} />;
}
