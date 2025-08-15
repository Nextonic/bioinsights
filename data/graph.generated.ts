/* src/data/graph.generated.ts
   Synthetic biomedical graph matching YOUR dataset IDs exactly.

   Outputs:
   - DATASET_IDS (matches your DATASETS[].id list 1:1)
   - DATASET_ROWS[datasetId] -> 100 rows per dataset (2,300 total)
   - ASSOCIATIONS -> 1,000 mixed associations across entities
   - EVIDENCE -> 10 items referenced by associations
   - Helpers: associationsForQuestion, evidenceByIds, findDatasetRow

   Zero dependencies. Deterministic via SEED.
*/

export type EntityType = "gene" | "disease" | "drug" | "chemical" | "pathway";
export type Predicate =
  | "treats"
  | "target_of"
  | "associated_with"
  | "ingredient_of"
  | "involved_in";

export type DatasetRow = {
  datasetId: string;      // e.g., "fda-spl"
  rowId: string;          // e.g., "row-0001"
  entityType: EntityType;
  primaryId: string;      // RxCUI / MONDO / HGNC / CID / GO / etc.
  name: string;           // human-readable label
  extras?: Record<string, string | number | boolean>;
};

export type DatasetRef = {
  datasetId: string;
  rowId: string;
  entityType: EntityType;
  primaryId: string;
  name: string;
};

export type Evidence = {
  id: string;
  title: string;
  datasetId: string;
  url: string;
  snippet: string;
  score: number; // 0..1
};

export type Association = {
  id: string;
  subject: DatasetRef;
  predicate: Predicate;
  object: DatasetRef;
  evidenceIds: string[]; // references into EVIDENCE
};

/*───────────────────────────────────────────────────────────────────────────*/
/* Deterministic PRNG                                                       */
/*───────────────────────────────────────────────────────────────────────────*/
const SEED = 42;
let _s = SEED >>> 0;
function rnd() {
  _s ^= _s << 13;
  _s ^= _s >>> 17;
  _s ^= _s << 5;
  return ((_s >>> 0) % 1_000_000) / 1_000_000;
}
function pick<T>(arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}
function pickN<T>(arr: T[], n: number): T[] {
  const a = arr.slice();
  const out: T[] = [];
  while (out.length < n && a.length) {
    const i = Math.floor(rnd() * a.length);
    out.push(a.splice(i, 1)[0]);
  }
  return out;
}
function id(prefix: string, i: number, width = 4) {
  return `${prefix}${String(i).padStart(width, "0")}`;
}

/*───────────────────────────────────────────────────────────────────────────*/
/* YOUR dataset IDs — EXACT match to src/data/datasets.ts                   */
/*───────────────────────────────────────────────────────────────────────────*/
export const DATASET_IDS = [
  "fda-faers",
  "fda-spl",
  "fda-drugsatfda",
  "fda-orange-book",
  "fda-purple-book",
  "fda-ndc",
  "fda-recalls",
  "fda-shortages",
  "clinicaltrials",
  "rxnorm",
  "chembl",
  "pubchem",
  "pharmgkb",
  "disgenet",
  "mesh",
  "go",
  "hgnc",
  "ensembl",
  "uniprot",
  "mondo",
  "ncit",
  "drugcentral",
  "openfda-ndc",
] as const;
export type DatasetId = typeof DATASET_IDS[number];

/* Dominant entity type per dataset for row synthesis */
const DATASET_ENTITY: Record<DatasetId, EntityType> = {
  "fda-faers": "drug",
  "fda-spl": "drug",
  "fda-drugsatfda": "drug",
  "fda-orange-book": "drug",
  "fda-purple-book": "drug",
  "fda-ndc": "drug",
  "fda-recalls": "drug",
  "fda-shortages": "drug",
  clinicaltrials: "disease", // condition-centric
  rxnorm: "drug",
  chembl: "chemical",
  pubchem: "chemical",
  pharmgkb: "gene",
  disgenet: "disease",
  mesh: "disease",
  go: "pathway",             // model GO Biological Process as pathway node
  hgnc: "gene",
  ensembl: "gene",
  uniprot: "gene",
  mondo: "disease",
  ncit: "disease",           // NCIt includes more, but rows synthesized as diseases
  drugcentral: "drug",
  "openfda-ndc": "drug",
};

/*───────────────────────────────────────────────────────────────────────────*/
/* Seed vocabularies                                                        */
/*───────────────────────────────────────────────────────────────────────────*/
const GENES = [
  "ADRB2","IL5","IL4","IL13","FCER1A","GATA3","TNF","IL6","JAK1","STAT6",
  "BCR","ABL1","EGFR","ALK","KRAS","NRAS","PIK3CA","PTEN","TP53","BRCA1",
  "PCSK9","LDLR","HMGCR","SLC6A4","HTR2A","DRD2","CFTR","GBA","SMN1","APP",
  "INS","PPARG","SOD1","VEGFA","PDGFRA","KIT","MTOR","MAPK1","IL2RA","CTLA4",
  "PDCD1","TNFRSF13B","NFKB1","CXCR4","CCR5","ABCB1","SLCO1B1","UGT1A1","CYP2D6"
];

const DISEASES = [
  ["MONDO:0004979","Asthma"],
  ["MONDO:0005148","Type 2 diabetes mellitus"],
  ["MONDO:0007254","Hypercholesterolemia"],
  ["MONDO:0005002","Chronic myeloid leukemia"],
  ["MONDO:0007256","Hypertension"],
  ["MONDO:0100096","COVID-19"],
  ["MONDO:0004981","Atopic dermatitis"],
  ["MONDO:0016575","Eosinophilic asthma"],
  ["MONDO:0005301","Cystic fibrosis"],
  ["MONDO:0005015","Breast cancer"],
  ["MONDO:0005059","Non-small cell lung carcinoma"],
  ["MONDO:0004992","Parkinson disease"],
  ["MONDO:0016576","Ulcerative colitis"],
  ["MONDO:0002161","Rheumatoid arthritis"],
  ["MONDO:0005359","HIV infection"],
  ["MONDO:0005010","Alzheimer disease"],
  ["MONDO:0018076","Familial hypercholesterolemia"],
  ["MONDO:0005147","Type 1 diabetes mellitus"],
  ["MONDO:0007255","Metabolic syndrome"],
  ["MONDO:0004975","Allergic rhinitis"],
] as const;

const DRUGS = [
  ["RxCUI:435","Albuterol"],
  ["RxCUI:2393","Budesonide"],
  ["RxCUI:83367","Atorvastatin"],
  ["RxCUI:2551","Imatinib"],
  ["RxCUI:1373469","Dolutegravir"],
  ["RxCUI:617314","Omeprazole"],
  ["RxCUI:1114195","Adalimumab"],
  ["RxCUI:617320","Metformin"],
  ["RxCUI:207106","Losartan"],
  ["RxCUI:198211","Amlodipine"],
  ["RxCUI:617317","Insulin glargine"],
  ["RxCUI:617316","Insulin lispro"],
  ["RxCUI:2284718","Remdesivir"],
  ["RxCUI:617331","Montelukast"],
  ["RxCUI:617333","Fluticasone"],
  ["RxCUI:617334","Mepolizumab"],
  ["RxCUI:617335","Omalizumab"],
  ["RxCUI:617329","Epinephrine"],
  ["RxCUI:617318","Formoterol"],
  ["RxCUI:6173140","Salmeterol"],
] as const;

const CHEMICALS = [
  ["CID:2083","Epinephrine (PubChem)"],
  ["CID:2083-ALB","Albuterol (PubChem)"],
  ["CID:5280443","Imatinib (PubChem)"],
  ["CID:5280961","Atorvastatin (PubChem)"],
  ["CID:5288826","Montelukast (PubChem)"],
  ["CID:441336","Fluticasone (PubChem)"],
  ["CID:5411","Budesonide (PubChem)"],
  ["CID:14233","Omeprazole (PubChem)"],
  ["CID:4091","Metformin (PubChem)"],
  ["CID:24768","Amlodipine (PubChem)"],
] as const;

const PATHWAYS = [
  ["GO:0007186","G-protein coupled receptor signaling pathway (GO)"],
  ["GO:0006954","Inflammatory response (GO)"],
  ["GO:0007165","Signal transduction (GO)"],
  ["GO:0008286","Insulin receptor signaling pathway (GO)"],
  ["GO:0000187","Activation of MAPK activity (GO)"],
  ["GO:0034097","Response to cytokine (GO)"],
  ["GO:0009719","Response to endogenous stimulus (GO)"],
  ["GO:0006955","Immune response (GO)"],
  ["GO:0043405","Regulation of MAPK cascade (GO)"],
  ["GO:0008284","Positive regulation of cell proliferation (GO)"],
] as const;

/*───────────────────────────────────────────────────────────────────────────*/
/* Generate 100 rows per dataset                                            */
/*───────────────────────────────────────────────────────────────────────────*/
const ROWS_PER_DATASET = 100;

function synthRow(datasetId: DatasetId, i: number): DatasetRow {
  const et = DATASET_ENTITY[datasetId];
  switch (et) {
    case "drug": {
      const [primaryId, name] = DRUGS[i % DRUGS.length];
      return {
        datasetId,
        rowId: id("row-", i + 1),
        entityType: "drug",
        primaryId,
        name,
        extras: {
          ndc: `NDC-${Math.floor(100000 + rnd() * 899999)}`,
          rxnorm: primaryId.replace("RxCUI:", ""),
        },
      };
    }
    case "gene": {
      const symbol = GENES[i % GENES.length];
      return {
        datasetId,
        rowId: id("row-", i + 1),
        entityType: "gene",
        primaryId: `HGNC:${symbol}`,
        name: symbol,
        extras: { entrez: Math.floor(1000 + rnd() * 900000) },
      };
    }
    case "disease": {
      const [mondo, label] = DISEASES[i % DISEASES.length];
      return {
        datasetId,
        rowId: id("row-", i + 1),
        entityType: "disease",
        primaryId: mondo,
        name: label,
        extras: { mesh: `MESH:${Math.floor(100000 + rnd() * 900000)}` },
      };
    }
    case "chemical": {
      const [cid, label] = CHEMICALS[i % CHEMICALS.length];
      return {
        datasetId,
        rowId: id("row-", i + 1),
        entityType: "chemical",
        primaryId: cid,
        name: label,
        extras: { chembl: `CHEMBL${Math.floor(10000 + rnd() * 90000)}` },
      };
    }
    case "pathway": {
      const [pid, label] = PATHWAYS[i % PATHWAYS.length];
      return {
        datasetId,
        rowId: id("row-", i + 1),
        entityType: "pathway",
        primaryId: pid,
        name: label,
        extras: { source: datasetId === "go" ? "GO" : "Other" },
      };
    }
  }
}

export const DATASET_ROWS: Record<DatasetId, DatasetRow[]> = Object.fromEntries(
  DATASET_IDS.map((ds) => [ds, Array.from({ length: ROWS_PER_DATASET }, (_, i) => synthRow(ds, i))])
) as Record<DatasetId, DatasetRow[]>;

/* Pools by entity type across all datasets */
function poolByType(t: EntityType): DatasetRow[] {
  const all: DatasetRow[] = [];
  for (const ds of DATASET_IDS) {
    if (DATASET_ENTITY[ds] === t) all.push(...DATASET_ROWS[ds]);
  }
  return all;
}
const POOL_DRUGS = poolByType("drug");
const POOL_GENES = poolByType("gene");
const POOL_DISEASES = poolByType("disease");
const POOL_CHEMS = poolByType("chemical");
const POOL_PATHS = poolByType("pathway");

/*───────────────────────────────────────────────────────────────────────────*/
/* Evidence (10 items)                                                      */
/*───────────────────────────────────────────────────────────────────────────*/
export const EVIDENCE: Evidence[] = [
  {
    id: "ev1",
    title: "SPL label: Albuterol — Indications & Usage",
    datasetId: "fda-spl",
    url: "https://api.fda.gov/drug/label.json?search=albuterol",
    snippet: "Albuterol sulfate is indicated for relief of bronchospasm in asthma.",
    score: 0.95,
  },
  {
    id: "ev2",
    title: "RxNorm concept for Albuterol (RxCUI 435)",
    datasetId: "rxnorm",
    url: "https://rxnav.nlm.nih.gov/",
    snippet: "RxNorm normalizes clinical drug identifiers and relationships.",
    score: 0.8,
  },
  {
    id: "ev3",
    title: "ClinicalTrials.gov — Beta-2 agonists in asthma",
    datasetId: "clinicaltrials",
    url: "https://clinicaltrials.gov/",
    snippet: "Randomized trials show SABA efficacy for acute bronchospasm.",
    score: 0.78,
  },
  {
    id: "ev4",
    title: "Drugs@FDA — Imatinib approval",
    datasetId: "fda-drugsatfda",
    url: "https://www.accessdata.fda.gov/scripts/cder/daf/",
    snippet: "Imatinib approved for Ph+ chronic myeloid leukemia.",
    score: 0.93,
  },
  {
    id: "ev5",
    title: "FAERS — Atorvastatin safety signals",
    datasetId: "fda-faers",
    url: "https://api.fda.gov/drug/event.json?search=atorvastatin",
    snippet: "Reports include myalgia and elevated liver enzymes.",
    score: 0.62,
  },
  {
    id: "ev6",
    title: "GO:0007186 — GPCR signaling pathway",
    datasetId: "go",
    url: "http://amigo.geneontology.org/",
    snippet: "β2AR couples to Gs to activate cAMP signaling.",
    score: 0.7,
  },
  {
    id: "ev7",
    title: "PharmGKB — SLCO1B1 & statin myopathy",
    datasetId: "pharmgkb",
    url: "https://www.pharmgkb.org/",
    snippet: "SLCO1B1 variants increase risk of statin-associated myopathy.",
    score: 0.74,
  },
  {
    id: "ev8",
    title: "DisGeNET — Gene–disease: Asthma",
    datasetId: "disgenet",
    url: "https://www.disgenet.org/",
    snippet: "IL4, IL13, ADRB2 implicated in asthma susceptibility.",
    score: 0.68,
  },
  {
    id: "ev9",
    title: "PubChem — Imatinib compound record",
    datasetId: "pubchem",
    url: "https://pubchem.ncbi.nlm.nih.gov/",
    snippet: "Canonical structure and synonyms for imatinib.",
    score: 0.6,
  },
  {
    id: "ev10",
    title: "NCIt — Breast cancer concept",
    datasetId: "ncit",
    url: "https://ncit.nci.nih.gov/",
    snippet: "NCIt concept hierarchy and cross-refs for breast cancer.",
    score: 0.66,
  },
];

/*───────────────────────────────────────────────────────────────────────────*/
/* Build 1,000 associations                                                 */
/*───────────────────────────────────────────────────────────────────────────*/
const ASSOCIATION_COUNT = 1000;

function refFromRow(r: DatasetRow): DatasetRef {
  return {
    datasetId: r.datasetId,
    rowId: r.rowId,
    entityType: r.entityType,
    primaryId: r.primaryId,
    name: r.name,
  };
}

function makeAssociation(i: number): Association {
  // rotate among 5 schemas for variety
  const mode = i % 5;
  switch (mode) {
    case 0: {
      // drug treats disease
      const s = pick(POOL_DRUGS);
      const o = pick(POOL_DISEASES);
      return {
        id: id("assoc-", i + 1, 5),
        subject: refFromRow(s),
        predicate: "treats",
        object: refFromRow(o),
        evidenceIds: pickN(EVIDENCE.map((e) => e.id), 2),
      };
    }
    case 1: {
      // gene target_of drug (drug targets the gene product)
      const s = pick(POOL_GENES);
      const o = pick(POOL_DRUGS);
      return {
        id: id("assoc-", i + 1, 5),
        subject: refFromRow(s),
        predicate: "target_of",
        object: refFromRow(o),
        evidenceIds: pickN(EVIDENCE.map((e) => e.id), 2),
      };
    }
    case 2: {
      // gene associated_with disease
      const s = pick(POOL_GENES);
      const o = pick(POOL_DISEASES);
      return {
        id: id("assoc-", i + 1, 5),
        subject: refFromRow(s),
        predicate: "associated_with",
        object: refFromRow(o),
        evidenceIds: pickN(EVIDENCE.map((e) => e.id), 2),
      };
    }
    case 3: {
      // chemical ingredient_of drug
      const s = pick(POOL_CHEMS);
      const o = pick(POOL_DRUGS);
      return {
        id: id("assoc-", i + 1, 5),
        subject: refFromRow(s),
        predicate: "ingredient_of",
        object: refFromRow(o),
        evidenceIds: pickN(EVIDENCE.map((e) => e.id), 2),
      };
    }
    case 4: {
      // gene involved_in pathway (GO)
      const s = pick(POOL_GENES);
      const o = pick(POOL_PATHS);
      return {
        id: id("assoc-", i + 1, 5),
        subject: refFromRow(s),
        predicate: "involved_in",
        object: refFromRow(o),
        evidenceIds: pickN(EVIDENCE.map((e) => e.id), 2),
      };
    }
    default:
      throw new Error("unreachable");
  }
}

export const ASSOCIATIONS: Association[] = Array.from(
  { length: ASSOCIATION_COUNT },
  (_, i) => makeAssociation(i)
);

/*───────────────────────────────────────────────────────────────────────────*/
/* UI helpers                                                               */
/*───────────────────────────────────────────────────────────────────────────*/
export function findDatasetRow(datasetId: DatasetId, rowId: string) {
  return DATASET_ROWS[datasetId]?.find((r) => r.rowId === rowId);
}

export function associationsForQuestion(q: string): Association[] {
  const ql = q.toLowerCase();
  return ASSOCIATIONS.filter((a) => {
    const s = `${a.subject.name} ${a.subject.primaryId} ${a.subject.entityType}`.toLowerCase();
    const o = `${a.object.name} ${a.object.primaryId} ${a.object.entityType}`.toLowerCase();
    const p = a.predicate.toLowerCase();
    return s.includes(ql) || o.includes(ql) || p.includes(ql);
  }).slice(0, 50);
}

export function evidenceByIds(ids: string[]): Evidence[] {
  const map = new Map(EVIDENCE.map((e) => [e.id, e]));
  return ids.map((x) => map.get(x)).filter(Boolean) as Evidence[];
}
