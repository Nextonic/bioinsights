export type EntityKeys = {
  gene?: string[]; // preferred order
  disease?: string[];
  drug?: string[];
};

// in src/data/datasets.ts
export type Dataset = {
  id: string;
  name: string,
  category: "gene" | "disease" | "drug" | "multi";
  fda_relevant: boolean;
  description: string;
  homepage: string;
  api?: string;
  license: string;
  updateCadence: string;
  entityKeys: { gene?: string[]; disease?: string[]; drug?: string[] };
  sampleJoinHints?: string[];
  version?: string;
  lastUpdated?: string | Date;
  records?: number | string;
  size?: string;
};


export const DATASETS: Dataset[] = [
  {
    id: "fda-faers",
    name: "FDA FAERS (Adverse Event Reporting System)",
    category: "drug",
    fda_relevant: true,
    description:
      "Spontaneous safety reports for drugs and biologics, including suspect drug, reactions, outcomes, reporters.",
    homepage: "https://www.fda.gov/drugs/questions-and-answers-fdas-adverse-event-reporting-system-faers",
    api: "https://api.fda.gov/drug/event.json",
    license: "Open (per FDA open data)",
    updateCadence: "Quarterly",
    entityKeys: { drug: ["unii", "rxnorm_id", "ndc"] },
    sampleJoinHints: [
      "Join to RxNorm via UNII→RxCUI mapping",
      "Aggregate PT terms (MedDRA) to diseases via MONDO/MeSH bridges",
    ],
  },
  {
    id: "fda-spl",
    name: "FDA Structured Product Labeling (Drug Labels)",
    category: "drug",
    fda_relevant: true,
    description:
      "Machine-readable labeling (indications, dosing, contraindications, warnings) for approved products.",
    homepage: "https://www.fda.gov/industry/structured-product-labeling-resources",
    api: "https://api.fda.gov/drug/label.json",
    license: "Open (per FDA open data)",
    updateCadence: "Continuous / Weekly",
    entityKeys: { drug: ["unii", "rxnorm_id", "ndc"] },
    sampleJoinHints: ["Map Indications section to diseases via MeSH/MONDO"],
  },
  {
    id: "fda-drugsatfda",
    name: "Drugs@FDA (Approvals & Reviews)",
    category: "drug",
    fda_relevant: true,
    description:
      "Approval history, labeling, review packages (medical, statistical, clinical pharmacology).",
    homepage: "https://www.accessdata.fda.gov/scripts/cder/daf/",
    license: "Public domain (site usage terms)",
    updateCadence: "Continuous",
    entityKeys: { drug: ["application_number", "unii", "rxnorm_id"] },
    sampleJoinHints: ["Use application_number to group brand/generic variants"],
  },
  {
    id: "fda-orange-book",
    name: "FDA Orange Book",
    category: "drug",
    fda_relevant: true,
    description:
      "Approved drug products with therapeutic equivalence evaluations (small molecules).",
    homepage: "https://www.fda.gov/drugs/drug-approvals-and-databases/orange-book",
    license: "Open (per FDA open data)",
    updateCadence: "Monthly",
    entityKeys: { drug: ["application_number", "unii", "rxnorm_id"] },
    sampleJoinHints: ["Join to Drugs@FDA on application_number; to RxNorm by RxCUI"],
  },
  {
    id: "fda-purple-book",
    name: "FDA Purple Book",
    category: "drug",
    fda_relevant: true,
    description:
      "Lists of licensed biological products, including biosimilarity and interchangeability evaluations.",
    homepage: "https://purplebooksearch.fda.gov/",
    license: "Open (per FDA open data)",
    updateCadence: "Weekly",
    entityKeys: { drug: ["bl_number", "unii", "rxnorm_id"] },
    sampleJoinHints: ["Join to RxNorm or UNII for ingredient-level merges"],
  },
  {
    id: "fda-ndc",
    name: "FDA NDC Directory",
    category: "drug",
    fda_relevant: true,
    description:
      "Directory of National Drug Codes identifying labeler, product, and package for marketed drugs.",
    homepage: "https://www.fda.gov/drugs/drug-approvals-and-databases/national-drug-code-directory",
    license: "Open (per FDA open data)",
    updateCadence: "Daily",
    entityKeys: { drug: ["ndc", "unii", "rxnorm_id"] },
    sampleJoinHints: ["Map NDC→RxCUI via RxNorm; NDC→UNII via SPL ingredients"],
  },
  {
    id: "fda-recalls",
    name: "FDA Enforcement Reports (Recalls)",
    category: "drug",
    fda_relevant: true,
    description:
      "Weekly enforcement reports detailing recalls and market withdrawals, including reason and classification.",
    homepage: "https://www.fda.gov/safety/recalls-market-withdrawals-safety-alerts",
    license: "Open (per FDA open data)",
    updateCadence: "Weekly",
    entityKeys: { drug: ["product_description", "unii"] },
    sampleJoinHints: ["Normalize product names; map to UNII/RxCUI where possible"],
  },
  {
    id: "fda-shortages",
    name: "FDA Drug Shortages (CDER)",
    category: "drug",
    fda_relevant: true,
    description:
      "Current and resolved drug shortages and discontinuations, including reasons and therapeutic categories.",
    homepage: "https://www.accessdata.fda.gov/scripts/drugshortages/",
    license: "Open (per FDA open data)",
    updateCadence: "Daily/Weekly",
    entityKeys: { drug: ["unii", "rxnorm_id"] },
    sampleJoinHints: ["Map product names to RxCUI for robust joins"],
  },
  {
    id: "clinicaltrials",
    name: "ClinicalTrials.gov",
    category: "multi",
    fda_relevant: false,
    description:
      "Registry of clinical studies with interventions, conditions, outcomes; useful for evidence of efficacy.",
    homepage: "https://clinicaltrials.gov/",
    api: "https://clinicaltrials.gov/api/v2/",
    license: "Open (CC0 for most fields)",
    updateCadence: "Daily",
    entityKeys: { disease: ["mesh_id"], drug: ["rxnorm_id", "intervention_name"], gene: ["symbol"] },
    sampleJoinHints: ["Normalize condition MeSH IDs; map interventions to RxNorm/ChEMBL"],
  },
  {
    id: "rxnorm",
    name: "RxNorm",
    category: "drug",
    fda_relevant: false,
    description:
      "Normalized drug identifiers (RxCUI) with ingredient/brand/form/strength relationships.",
    homepage: "https://www.nlm.nih.gov/research/umls/rxnorm/",
    api: "https://rxnav.nlm.nih.gov/",
    license: "UMLS license (free registration)",
    updateCadence: "Monthly",
    entityKeys: { drug: ["rxnorm_id", "unii", "ndc"] },
    sampleJoinHints: ["Primary crosswalk between NDC, UNII, brand/ingredient names"],
  },
  {
    id: "chembl",
    name: "ChEMBL",
    category: "multi",
    fda_relevant: false,
    description:
      "Bioactivity database of compounds, targets (genes/proteins), and assays; includes mechanism of action.",
    homepage: "https://www.ebi.ac.uk/chembl/",
    api: "https://www.ebi.ac.uk/chembl/ws",
    license: "CC BY-SA 3.0",
    updateCadence: "Semi-annual",
    entityKeys: { drug: ["chembl_id", "pubchem_cid", "unii"], gene: ["ensembl_gene_id", "symbol"] },
    sampleJoinHints: ["Map compound IDs to RxCUI via PubChem; targets to Ensembl/HGNC"],
  },
  {
    id: "pubchem",
    name: "PubChem",
    category: "drug",
    fda_relevant: false,
    description:
      "Chemical substances and compounds with synonyms and cross-references (RXCUI, UNII, MeSH).",
    homepage: "https://pubchem.ncbi.nlm.nih.gov/",
    api: "https://pubchem.ncbi.nlm.nih.gov/rest/pug/",
    license: "Open (NCBI)",
    updateCadence: "Continuous",
    entityKeys: { drug: ["pubchem_cid", "unii", "rxnorm_id"] },
    sampleJoinHints: ["Use synonym tables to normalize free-text drug names"],
  },
  {
    id: "pharmgkb",
    name: "PharmGKB",
    category: "multi",
    fda_relevant: false,
    description:
      "Pharmacogenomics knowledge—gene–drug–phenotype relationships and clinical annotations.",
    homepage: "https://www.pharmgkb.org/",
    license: "Custom (free for academic; check terms)",
    updateCadence: "Monthly",
    entityKeys: { gene: ["symbol", "ensembl_gene_id"], drug: ["rxnorm_id", "chembl_id"] },
    sampleJoinHints: ["Leverage curated gene–drug pairs to justify mechanistic evidence"],
  },
  {
    id: "disgenet",
    name: "DisGeNET",
    category: "multi",
    fda_relevant: false,
    description:
      "Gene–disease associations aggregated from literature and curated sources with evidence scores.",
    homepage: "https://www.disgenet.org/",
    license: "Custom (research license available)",
    updateCadence: "Periodic",
    entityKeys: { gene: ["entrez_id", "symbol"], disease: ["umls_cui", "mondo_id", "mesh_id"] },
    sampleJoinHints: ["Bridge diseases via MONDO/MeSH and genes via Entrez/HGNC"],
  },
  {
    id: "mesh",
    name: "MeSH (Medical Subject Headings)",
    category: "multi",
    fda_relevant: false,
    description:
      "Controlled vocabulary for diseases, chemicals, and concepts used widely in clinical and regulatory text.",
    homepage: "https://www.nlm.nih.gov/mesh/meshhome.html",
    license: "Open",
    updateCadence: "Annual (with updates)",
    entityKeys: { disease: ["mesh_id"], drug: ["mesh_id"], gene: ["symbol"] },
    sampleJoinHints: ["Map SPL Indications/Search terms to MeSH; cross to MONDO"],
  },
  {
    id: "go",
    name: "Gene Ontology (GO)",
    category: "gene",
    fda_relevant: false,
    description:
      "Functional annotations for gene products (BP, MF, CC) used to explain biological mechanisms.",
    homepage: "http://geneontology.org/",
    license: "CC BY 4.0",
    updateCadence: "Frequent",
    entityKeys: { gene: ["ensembl_gene_id", "symbol", "uniprot_id"] },
    sampleJoinHints: ["Use GO terms to justify mechanistic plausibility for indications"],
  },
  {
    id: "hgnc",
    name: "HGNC (HUGO Gene Nomenclature Committee)",
    category: "gene",
    fda_relevant: false,
    description:
      "Authoritative gene symbols and IDs for human genes, with cross-references (Entrez, Ensembl, UniProt).",
    homepage: "https://www.genenames.org/",
    license: "Custom (open for use)",
    updateCadence: "Continuous",
    entityKeys: { gene: ["symbol", "entrez_id", "ensembl_gene_id", "uniprot_id"] },
    sampleJoinHints: ["Use as the canonical mapping layer for all gene joins"],
  },
  {
    id: "ensembl",
    name: "Ensembl Genes (Homo sapiens)",
    category: "gene",
    fda_relevant: false,
    description:
      "Comprehensive gene models, transcripts, cross-references; stable Ensembl IDs for joins.",
    homepage: "https://www.ensembl.org/",
    api: "https://rest.ensembl.org",
    license: "Open (EMBL-EBI terms)",
    updateCadence: "Regular releases",
    entityKeys: { gene: ["ensembl_gene_id", "symbol", "entrez_id"] },
    sampleJoinHints: ["Map to HGNC symbols and UniProt for protein-level evidence"],
  },
  {
    id: "uniprot",
    name: "UniProt",
    category: "gene",
    fda_relevant: false,
    description:
      "Protein knowledgebase, sequences and functional annotations; cross-links to Ensembl/HGNC/GO.",
    homepage: "https://www.uniprot.org/",
    api: "https://rest.uniprot.org/",
    license: "CC BY 4.0",
    updateCadence: "Frequent",
    entityKeys: { gene: ["uniprot_id", "ensembl_gene_id", "symbol"] },
    sampleJoinHints: ["Map targets to drug mechanisms (e.g., kinase inhibitors)"],
  },
  {
    id: "mondo",
    name: "MONDO Disease Ontology",
    category: "disease",
    fda_relevant: false,
    description:
      "Unified disease ontology aligning MeSH, DOID, OMIM, Orphanet, NCIt—great for cross-dataset joins.",
    homepage: "https://mondo.monarchinitiative.org/",
    license: "CC BY 4.0",
    updateCadence: "Frequent",
    entityKeys: { disease: ["mondo_id", "mesh_id", "doid", "omim_id", "ncit_id"] },
    sampleJoinHints: ["Use MONDO as the canonical disease ID across FAERS/SPL/CT.gov"],
  },
  {
    id: "ncit",
    name: "NCI Thesaurus (NCIt)",
    category: "multi",
    fda_relevant: false,
    description:
      "Terminology for cancers, drugs, and clinical concepts; strong overlap with regulatory vocabularies.",
    homepage: "https://ncit.nci.nih.gov/",
    license: "CC BY 4.0",
    updateCadence: "Frequent",
    entityKeys: { disease: ["ncit_id"], drug: ["ncit_id"], gene: ["symbol"] },
    sampleJoinHints: ["Bridge oncology terms between SPL and ClinicalTrials.gov"],
  },
  {
    id: "drugcentral",
    name: "DrugCentral",
    category: "drug",
    fda_relevant: false,
    description:
      "Open resource of approved drugs with indications, MoA, and references—handy for indication lookups.",
    homepage: "https://drugcentral.org/",
    license: "Custom (research use)",
    updateCadence: "Periodic",
    entityKeys: { drug: ["drugcentral_id", "rxnorm_id", "chembl_id"] },
    sampleJoinHints: ["Cross-check indications against SPL and Drugs@FDA"],
  },
  {
    id: "openfda-ndc",
    name: "openFDA NDC endpoint",
    category: "drug",
    fda_relevant: true,
    description:
      "Developer-friendly mirror of FDA NDC/SPL-derived fields for quick lookups and filters.",
    homepage: "https://open.fda.gov/apis/drug/ndc/",
    api: "https://api.fda.gov/drug/ndc.json",
    license: "Open (per FDA open data)",
    updateCadence: "Daily",
    entityKeys: { drug: ["ndc", "unii", "rxnorm_id"] },
    sampleJoinHints: ["Use as a fast lookup layer for product metadata in results filters"],
  },
];

// Utilities: helpers for resolving join keys across the catalog
export const JOIN_PRIORITY: Required<EntityKeys> = {
  gene: ["symbol", "entrez_id", "ensembl_gene_id", "uniprot_id"],
  disease: ["mondo_id", "mesh_id", "ncit_id", "doid", "umls_cui", "omim_id"],
  drug: ["rxnorm_id", "unii", "ndc", "chembl_id", "pubchem_cid", "ncit_id"],
};

export const FDA_WEIGHTED_DATASET_IDS = new Set(
  DATASETS.filter((d) => d.fda_relevant).map((d) => d.id)
);