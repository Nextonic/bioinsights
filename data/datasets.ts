// Auto-generated dataset module
// Path suggestion: src/data/datasets.ts
// You can import with: import { DATASETS, type Dataset } from "@/data/datasets";

export type Dataset = {
  id: string;
  name: string;
  description: string;
  version: string;
  lastUpdated: string; // ISO
  license: string;
  size: string;
  records: string;
  provenance: string;
  sources: string[];
  tags: string[];
  downloadHref?: string;
  docsHref?: string;
};

export const DATASETS: Dataset[] = [
  {
  "id": "chem-gene",
  "name": "Chemical ↔ Gene Activity",
  "description": "Normalized relationships between chemicals and gene activity (increase/decrease), with directionality, effect size bins, and source provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-08-01",
  "license": "CC BY 4.0",
  "size": "1.2 GB",
  "records": "12.8M edges",
  "provenance": "Curated biomedical literature + structured toxin/compound resources.",
  "sources": [
    "PubMed-derived corpora",
    "CTD-like resources",
    "CHEBI-like ontologies"
  ],
  "tags": [
    "chemical",
    "gene",
    "directionality",
    "activity"
  ]
},
  {
  "id": "drug-disease",
  "name": "Drug ↔ Disease Conditions",
  "description": "Edges capturing drug effects on disease conditions (beneficial/neutral/adverse), including class effects and signal strength tiers.",
  "version": "2025.07",
  "lastUpdated": "2025-07-12",
  "license": "CC BY-NC 4.0",
  "size": "860 MB",
  "records": "4.3M edges",
  "provenance": "Regulatory labels, pharmacoepidemiology digests, clinical abstracts.",
  "sources": [
    "Label-like datasets",
    "Clinical abstract digests",
    "Drug class taxonomies"
  ],
  "tags": [
    "drug",
    "disease",
    "safety",
    "class-effect"
  ]
},
  {
  "id": "gene-disease",
  "name": "Gene ↔ Disease Associations",
  "description": "Gene–disease associations with evidence grading, variant-aware flags, and tissue annotations for downstream risk modeling.",
  "version": "2025.06",
  "lastUpdated": "2025-06-20",
  "license": "CC BY 4.0",
  "size": "530 MB",
  "records": "2.1M edges",
  "provenance": "Open genetics knowledge bases + manual curation overlays.",
  "sources": [
    "GxD knowledge bases",
    "Variant catalogs",
    "Anatomy/tissue ontologies"
  ],
  "tags": [
    "gene",
    "disease",
    "variants",
    "tissue"
  ]
},
  {
  "id": "evidence-graph",
  "name": "Evidence Graph (All Entities)",
  "description": "Unified, de-duplicated evidence graph spanning chemicals, drugs, genes, and diseases with normalized IDs and crosswalks.",
  "version": "2025.08",
  "lastUpdated": "2025-08-10",
  "license": "CC BY 4.0",
  "size": "2.4 GB",
  "records": "19.6M nodes / 41.3M edges",
  "provenance": "Multi-source fusion with transparent lineage to raw sources.",
  "sources": [
    "All upstream datasets above",
    "Crosswalk tables",
    "Normalization rules"
  ],
  "tags": [
    "graph",
    "crosswalks",
    "provenance",
    "normalization"
  ]
},
  {
  "id": "pathway-interactions-001",
  "name": "Pathway Interactions 001",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-06-10",
  "license": "CC BY 4.0",
  "size": "1.6 GB",
  "records": "34.0M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "GTEx-like expression",
    "STRING-like PPI",
    "PubMed-derived corpora"
  ],
  "tags": [
    "pathway",
    "audit",
    "interaction",
    "grading"
  ]
},
  {
  "id": "ontologies-crosswalk-002",
  "name": "Ontologies Crosswalk 002",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-21",
  "license": "ODC-BY 1.0",
  "size": "4.0 GB",
  "records": "11.4M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "PubMed-derived corpora",
    "EHR summary tables",
    "STRING-like PPI"
  ],
  "tags": [
    "mapping",
    "audit",
    "crosswalks",
    "grading"
  ]
},
  {
  "id": "protein-protein-003",
  "name": "Protein–Protein Interactions 003",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-24",
  "license": "CC BY-NC 4.0",
  "size": "851 MB",
  "records": "30.4M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "ChEMBL-like pharmacology",
    "UMLS-like ontologies",
    "FDA label corpora"
  ],
  "tags": [
    "evidence",
    "protein",
    "grading",
    "interaction"
  ]
},
  {
  "id": "variant-clinvar-004",
  "name": "Variant Clinical Assertions 004",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-20",
  "license": "ODC-BY 1.0",
  "size": "696 MB",
  "records": "38.8M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "GWAS catalogs",
    "FDA label corpora",
    "STRING-like PPI"
  ],
  "tags": [
    "assertion",
    "evidence",
    "audit",
    "clinical"
  ]
},
  {
  "id": "protein-protein-005",
  "name": "Protein–Protein Interactions 005",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-24",
  "license": "ODC-BY 1.0",
  "size": "1.8 GB",
  "records": "32.6M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "UMLS-like ontologies",
    "GWAS catalogs",
    "EHR summary tables"
  ],
  "tags": [
    "evidence",
    "audit",
    "interaction",
    "ppi"
  ]
},
  {
  "id": "protein-protein-006",
  "name": "Protein–Protein Interactions 006",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-29",
  "license": "CC BY 4.0",
  "size": "4.9 GB",
  "records": "3.8M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "GWAS catalogs",
    "ChEMBL-like pharmacology",
    "STRING-like PPI"
  ],
  "tags": [
    "normalization",
    "evidence",
    "ppi",
    "interaction"
  ]
},
  {
  "id": "adverse-events-007",
  "name": "Drug ↔ Adverse Events 007",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-07",
  "license": "ODC-BY 1.0",
  "size": "3.6 GB",
  "records": "20.3M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "EHR summary tables",
    "UMLS-like ontologies",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "drug",
    "audit",
    "normalization",
    "safety"
  ]
},
  {
  "id": "adverse-events-008",
  "name": "Drug ↔ Adverse Events 008",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-04-17",
  "license": "CC BY-NC 4.0",
  "size": "2.5 GB",
  "records": "26.7M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "SIDER-like adverse events",
    "FDA label corpora",
    "UMLS-like ontologies"
  ],
  "tags": [
    "audit",
    "adverse",
    "normalization",
    "drug"
  ]
},
  {
  "id": "expression-tissue-009",
  "name": "Gene Expression by Tissue 009",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-05-11",
  "license": "CC BY-NC 4.0",
  "size": "318 MB",
  "records": "36.1M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "UMLS-like ontologies",
    "FDA label corpora",
    "ClinVar-like archives"
  ],
  "tags": [
    "audit",
    "normalization",
    "grading",
    "tissue"
  ]
},
  {
  "id": "adverse-events-010",
  "name": "Drug ↔ Adverse Events 010",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-12",
  "license": "ODC-BY 1.0",
  "size": "5.7 GB",
  "records": "46.0M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "ChEMBL-like pharmacology",
    "PubMed-derived corpora",
    "FDA label corpora"
  ],
  "tags": [
    "adverse",
    "audit",
    "safety",
    "drug"
  ]
},
  {
  "id": "trial-outcomes-011",
  "name": "Clinical Trial Outcomes 011",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-22",
  "license": "ODC-BY 1.0",
  "size": "3.1 GB",
  "records": "23.1M nodes / 61.7M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "SIDER-like adverse events",
    "ChEMBL-like pharmacology",
    "UMLS-like ontologies"
  ],
  "tags": [
    "trial",
    "outcomes",
    "grading",
    "evidence"
  ]
},
  {
  "id": "trial-outcomes-012",
  "name": "Clinical Trial Outcomes 012",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-19",
  "license": "CC BY-NC 4.0",
  "size": "6.0 GB",
  "records": "22.2M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "FDA label corpora",
    "GWAS catalogs",
    "GTEx-like expression"
  ],
  "tags": [
    "clinical",
    "outcomes",
    "audit",
    "trial"
  ]
},
  {
  "id": "variant-clinvar-013",
  "name": "Variant Clinical Assertions 013",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-04-02",
  "license": "CC BY 4.0",
  "size": "4.3 GB",
  "records": "3.0M nodes / 4.5M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "FDA label corpora",
    "UMLS-like ontologies",
    "GWAS catalogs"
  ],
  "tags": [
    "assertion",
    "normalization",
    "evidence",
    "clinical"
  ]
},
  {
  "id": "ontologies-crosswalk-014",
  "name": "Ontologies Crosswalk 014",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-07-31",
  "license": "CC BY 4.0",
  "size": "4.8 GB",
  "records": "9.9M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "SIDER-like adverse events",
    "STRING-like PPI",
    "Reactome-like pathways"
  ],
  "tags": [
    "evidence",
    "audit",
    "normalization",
    "ontology"
  ]
},
  {
  "id": "pathway-interactions-015",
  "name": "Pathway Interactions 015",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-13",
  "license": "ODC-BY 1.0",
  "size": "2.2 GB",
  "records": "12.8M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "UMLS-like ontologies",
    "ChEMBL-like pharmacology",
    "EHR summary tables"
  ],
  "tags": [
    "evidence",
    "interaction",
    "network",
    "audit"
  ]
},
  {
  "id": "trial-outcomes-016",
  "name": "Clinical Trial Outcomes 016",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-23",
  "license": "ODC-BY 1.0",
  "size": "858 MB",
  "records": "27.3M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "FDA label corpora",
    "GWAS catalogs",
    "EHR summary tables"
  ],
  "tags": [
    "evidence",
    "audit",
    "normalization",
    "trial"
  ]
},
  {
  "id": "metabolite-gene-017",
  "name": "Metabolite ↔ Gene Signals 017",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-13",
  "license": "CC BY-NC 4.0",
  "size": "312 MB",
  "records": "46.4M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "ClinVar-like archives",
    "STRING-like PPI",
    "UMLS-like ontologies"
  ],
  "tags": [
    "normalization",
    "audit",
    "evidence",
    "gene"
  ]
},
  {
  "id": "trial-outcomes-018",
  "name": "Clinical Trial Outcomes 018",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-26",
  "license": "CC BY 4.0",
  "size": "3.6 GB",
  "records": "37.5M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "PubMed-derived corpora",
    "GTEx-like expression",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "grading",
    "audit",
    "trial",
    "clinical"
  ]
},
  {
  "id": "ontologies-crosswalk-019",
  "name": "Ontologies Crosswalk 019",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-18",
  "license": "CC BY 4.0",
  "size": "3.7 GB",
  "records": "12.1M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "GTEx-like expression",
    "GWAS catalogs",
    "PubMed-derived corpora"
  ],
  "tags": [
    "grading",
    "ontology",
    "evidence",
    "mapping"
  ]
},
  {
  "id": "expression-tissue-020",
  "name": "Gene Expression by Tissue 020",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-20",
  "license": "CC BY 4.0",
  "size": "1.8 GB",
  "records": "19.7M nodes / 37.7M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "PubMed-derived corpora",
    "ChEMBL-like pharmacology",
    "FDA label corpora"
  ],
  "tags": [
    "expression",
    "grading",
    "tissue",
    "rna-seq"
  ]
},
  {
  "id": "adverse-events-021",
  "name": "Drug ↔ Adverse Events 021",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-18",
  "license": "CC BY 4.0",
  "size": "2.4 GB",
  "records": "25.2M nodes / 56.9M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "SIDER-like adverse events",
    "UMLS-like ontologies",
    "ClinVar-like archives"
  ],
  "tags": [
    "normalization",
    "drug",
    "safety",
    "adverse"
  ]
},
  {
  "id": "pathway-interactions-022",
  "name": "Pathway Interactions 022",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-10",
  "license": "CC BY-NC 4.0",
  "size": "1.9 GB",
  "records": "17.5M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "UMLS-like ontologies",
    "ChEMBL-like pharmacology",
    "ClinVar-like archives"
  ],
  "tags": [
    "audit",
    "pathway",
    "normalization",
    "evidence"
  ]
},
  {
  "id": "expression-tissue-023",
  "name": "Gene Expression by Tissue 023",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-01",
  "license": "CC BY-NC 4.0",
  "size": "4.7 GB",
  "records": "13.5M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "UMLS-like ontologies",
    "STRING-like PPI",
    "SIDER-like adverse events"
  ],
  "tags": [
    "expression",
    "audit",
    "normalization",
    "tissue"
  ]
},
  {
  "id": "ontologies-crosswalk-024",
  "name": "Ontologies Crosswalk 024",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-04",
  "license": "ODC-BY 1.0",
  "size": "3.4 GB",
  "records": "2.6M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "PubMed-derived corpora",
    "Reactome-like pathways",
    "GWAS catalogs"
  ],
  "tags": [
    "normalization",
    "crosswalks",
    "ontology",
    "mapping"
  ]
},
  {
  "id": "ontologies-crosswalk-025",
  "name": "Ontologies Crosswalk 025",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-05-10",
  "license": "CC BY 4.0",
  "size": "5.2 GB",
  "records": "40.6M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "PubMed-derived corpora",
    "EHR summary tables",
    "Reactome-like pathways"
  ],
  "tags": [
    "audit",
    "evidence",
    "crosswalks",
    "mapping"
  ]
},
  {
  "id": "adverse-events-026",
  "name": "Drug ↔ Adverse Events 026",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-07",
  "license": "CC BY 4.0",
  "size": "5.2 GB",
  "records": "40.9M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "Reactome-like pathways",
    "ClinVar-like archives",
    "GWAS catalogs"
  ],
  "tags": [
    "safety",
    "drug",
    "audit",
    "evidence"
  ]
},
  {
  "id": "protein-protein-027",
  "name": "Protein–Protein Interactions 027",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-18",
  "license": "CC BY-NC 4.0",
  "size": "2.3 GB",
  "records": "34.1M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "PubMed-derived corpora",
    "FDA label corpora",
    "ClinVar-like archives"
  ],
  "tags": [
    "ppi",
    "grading",
    "interaction",
    "protein"
  ]
},
  {
  "id": "pathway-interactions-028",
  "name": "Pathway Interactions 028",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-28",
  "license": "ODC-BY 1.0",
  "size": "4.8 GB",
  "records": "49.2M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "STRING-like PPI",
    "GTEx-like expression",
    "GWAS catalogs"
  ],
  "tags": [
    "network",
    "pathway",
    "evidence",
    "normalization"
  ]
},
  {
  "id": "ontologies-crosswalk-029",
  "name": "Ontologies Crosswalk 029",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-07-03",
  "license": "CC BY-NC 4.0",
  "size": "698 MB",
  "records": "16.8M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "SIDER-like adverse events",
    "FDA label corpora",
    "ClinVar-like archives"
  ],
  "tags": [
    "grading",
    "mapping",
    "evidence",
    "normalization"
  ]
},
  {
  "id": "metabolite-gene-030",
  "name": "Metabolite ↔ Gene Signals 030",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-03",
  "license": "CC BY 4.0",
  "size": "2.7 GB",
  "records": "34.0M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "GTEx-like expression",
    "SIDER-like adverse events",
    "ClinVar-like archives"
  ],
  "tags": [
    "evidence",
    "grading",
    "metabolite",
    "omics"
  ]
},
  {
  "id": "expression-tissue-031",
  "name": "Gene Expression by Tissue 031",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-07-20",
  "license": "ODC-BY 1.0",
  "size": "3.8 GB",
  "records": "22.4M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "UMLS-like ontologies",
    "ChEMBL-like pharmacology",
    "EHR summary tables"
  ],
  "tags": [
    "normalization",
    "expression",
    "rna-seq",
    "grading"
  ]
},
  {
  "id": "pathway-interactions-032",
  "name": "Pathway Interactions 032",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-19",
  "license": "CC BY 4.0",
  "size": "4.9 GB",
  "records": "2.3M nodes / 78.7M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "ChEMBL-like pharmacology",
    "STRING-like PPI",
    "GWAS catalogs"
  ],
  "tags": [
    "normalization",
    "audit",
    "evidence",
    "grading"
  ]
},
  {
  "id": "metabolite-gene-033",
  "name": "Metabolite ↔ Gene Signals 033",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-05-08",
  "license": "ODC-BY 1.0",
  "size": "4.2 GB",
  "records": "43.1M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "STRING-like PPI",
    "GWAS catalogs",
    "EHR summary tables"
  ],
  "tags": [
    "audit",
    "normalization",
    "grading",
    "evidence"
  ]
},
  {
  "id": "phenotype-gene-034",
  "name": "Phenotype ↔ Gene Links 034",
  "description": "Phenotype ↔ Gene Links with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-05-02",
  "license": "CC BY-NC 4.0",
  "size": "1.1 GB",
  "records": "26.8M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "ChEMBL-like pharmacology",
    "GTEx-like expression",
    "UMLS-like ontologies"
  ],
  "tags": [
    "evidence",
    "grading",
    "audit",
    "gene"
  ]
},
  {
  "id": "drug-targets-035",
  "name": "Drug ↔ Target Map 035",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-06",
  "license": "CC BY 4.0",
  "size": "5.1 GB",
  "records": "39.0M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "SIDER-like adverse events",
    "GWAS catalogs",
    "ClinVar-like archives"
  ],
  "tags": [
    "evidence",
    "drug",
    "pharmacology",
    "target"
  ]
},
  {
  "id": "expression-tissue-036",
  "name": "Gene Expression by Tissue 036",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-06-21",
  "license": "ODC-BY 1.0",
  "size": "759 MB",
  "records": "12.1M nodes / 13.9M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "FDA label corpora",
    "STRING-like PPI",
    "GTEx-like expression"
  ],
  "tags": [
    "rna-seq",
    "grading",
    "evidence",
    "normalization"
  ]
},
  {
  "id": "phenotype-gene-037",
  "name": "Phenotype ↔ Gene Links 037",
  "description": "Phenotype ↔ Gene Links with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-07-17",
  "license": "CC BY-NC 4.0",
  "size": "5.5 GB",
  "records": "34.9M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "ChEMBL-like pharmacology",
    "PubMed-derived corpora",
    "Reactome-like pathways"
  ],
  "tags": [
    "ontology",
    "evidence",
    "normalization",
    "gene"
  ]
},
  {
  "id": "drug-targets-038",
  "name": "Drug ↔ Target Map 038",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-09",
  "license": "CC BY-NC 4.0",
  "size": "3.1 GB",
  "records": "33.6M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "EHR summary tables",
    "ChEMBL-like pharmacology",
    "SIDER-like adverse events"
  ],
  "tags": [
    "grading",
    "audit",
    "drug",
    "evidence"
  ]
},
  {
  "id": "variant-clinvar-039",
  "name": "Variant Clinical Assertions 039",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-22",
  "license": "ODC-BY 1.0",
  "size": "2.7 GB",
  "records": "9.5M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "STRING-like PPI",
    "Reactome-like pathways",
    "GWAS catalogs"
  ],
  "tags": [
    "evidence",
    "assertion",
    "normalization",
    "audit"
  ]
},
  {
  "id": "expression-tissue-040",
  "name": "Gene Expression by Tissue 040",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-04",
  "license": "CC BY 4.0",
  "size": "3.0 GB",
  "records": "3.1M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "GWAS catalogs",
    "FDA label corpora",
    "PubMed-derived corpora"
  ],
  "tags": [
    "audit",
    "expression",
    "tissue",
    "grading"
  ]
},
  {
  "id": "phenotype-gene-041",
  "name": "Phenotype ↔ Gene Links 041",
  "description": "Phenotype ↔ Gene Links with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-01",
  "license": "CC BY 4.0",
  "size": "3.0 GB",
  "records": "28.5M nodes / 38.3M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "Reactome-like pathways",
    "EHR summary tables",
    "FDA label corpora"
  ],
  "tags": [
    "audit",
    "gene",
    "ontology",
    "phenotype"
  ]
},
  {
  "id": "variant-clinvar-042",
  "name": "Variant Clinical Assertions 042",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-06-19",
  "license": "ODC-BY 1.0",
  "size": "4.2 GB",
  "records": "20.1M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "FDA label corpora",
    "GTEx-like expression",
    "GWAS catalogs"
  ],
  "tags": [
    "variant",
    "normalization",
    "assertion",
    "audit"
  ]
},
  {
  "id": "variant-clinvar-043",
  "name": "Variant Clinical Assertions 043",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-06-28",
  "license": "ODC-BY 1.0",
  "size": "2.7 GB",
  "records": "25.5M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "PubMed-derived corpora",
    "STRING-like PPI",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "variant",
    "evidence",
    "assertion",
    "normalization"
  ]
},
  {
  "id": "adverse-events-044",
  "name": "Drug ↔ Adverse Events 044",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-05-16",
  "license": "ODC-BY 1.0",
  "size": "3.3 GB",
  "records": "31.0M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "ChEMBL-like pharmacology",
    "STRING-like PPI",
    "ClinVar-like archives"
  ],
  "tags": [
    "adverse",
    "safety",
    "drug",
    "audit"
  ]
},
  {
  "id": "drug-targets-045",
  "name": "Drug ↔ Target Map 045",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-07-28",
  "license": "ODC-BY 1.0",
  "size": "3.8 GB",
  "records": "1.9M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "EHR summary tables",
    "ChEMBL-like pharmacology",
    "GWAS catalogs"
  ],
  "tags": [
    "pharmacology",
    "audit",
    "normalization",
    "grading"
  ]
},
  {
  "id": "variant-clinvar-046",
  "name": "Variant Clinical Assertions 046",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-03",
  "license": "ODC-BY 1.0",
  "size": "5.7 GB",
  "records": "21.9M nodes / 40.1M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "ChEMBL-like pharmacology",
    "SIDER-like adverse events",
    "GTEx-like expression"
  ],
  "tags": [
    "audit",
    "variant",
    "normalization",
    "assertion"
  ]
},
  {
  "id": "trial-outcomes-047",
  "name": "Clinical Trial Outcomes 047",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-02",
  "license": "CC BY-NC 4.0",
  "size": "4.1 GB",
  "records": "27.9M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "STRING-like PPI",
    "UMLS-like ontologies",
    "Reactome-like pathways"
  ],
  "tags": [
    "outcomes",
    "normalization",
    "evidence",
    "audit"
  ]
},
  {
  "id": "expression-tissue-048",
  "name": "Gene Expression by Tissue 048",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-30",
  "license": "CC BY 4.0",
  "size": "4.4 GB",
  "records": "37.3M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "GWAS catalogs",
    "SIDER-like adverse events",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "rna-seq",
    "normalization",
    "grading",
    "audit"
  ]
},
  {
  "id": "pathway-interactions-049",
  "name": "Pathway Interactions 049",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-15",
  "license": "CC BY 4.0",
  "size": "2.4 GB",
  "records": "35.5M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "ClinVar-like archives",
    "PubMed-derived corpora",
    "GTEx-like expression"
  ],
  "tags": [
    "grading",
    "network",
    "interaction",
    "evidence"
  ]
},
  {
  "id": "pathway-interactions-050",
  "name": "Pathway Interactions 050",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-06-12",
  "license": "CC BY-NC 4.0",
  "size": "3.0 GB",
  "records": "48.3M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "ChEMBL-like pharmacology",
    "FDA label corpora",
    "GTEx-like expression"
  ],
  "tags": [
    "evidence",
    "audit",
    "pathway",
    "grading"
  ]
},
  {
  "id": "adverse-events-051",
  "name": "Drug ↔ Adverse Events 051",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-17",
  "license": "CC BY 4.0",
  "size": "6.0 GB",
  "records": "23.2M nodes / 49.3M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "UMLS-like ontologies",
    "STRING-like PPI",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "evidence",
    "adverse",
    "grading",
    "audit"
  ]
},
  {
  "id": "expression-tissue-052",
  "name": "Gene Expression by Tissue 052",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-26",
  "license": "CC BY 4.0",
  "size": "3.9 GB",
  "records": "4.5M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "EHR summary tables",
    "UMLS-like ontologies",
    "FDA label corpora"
  ],
  "tags": [
    "tissue",
    "expression",
    "evidence",
    "grading"
  ]
},
  {
  "id": "variant-clinvar-053",
  "name": "Variant Clinical Assertions 053",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-14",
  "license": "CC BY 4.0",
  "size": "1.6 GB",
  "records": "35.3M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "FDA label corpora",
    "GWAS catalogs",
    "ClinVar-like archives"
  ],
  "tags": [
    "audit",
    "normalization",
    "grading",
    "clinical"
  ]
},
  {
  "id": "metabolite-gene-054",
  "name": "Metabolite ↔ Gene Signals 054",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-28",
  "license": "ODC-BY 1.0",
  "size": "1.1 GB",
  "records": "7.5M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "EHR summary tables",
    "ClinVar-like archives",
    "GTEx-like expression"
  ],
  "tags": [
    "evidence",
    "metabolite",
    "audit",
    "omics"
  ]
},
  {
  "id": "metabolite-gene-055",
  "name": "Metabolite ↔ Gene Signals 055",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-08-07",
  "license": "ODC-BY 1.0",
  "size": "3.1 GB",
  "records": "2.2M nodes / 35.7M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "GTEx-like expression",
    "ClinVar-like archives",
    "PubMed-derived corpora"
  ],
  "tags": [
    "metabolite",
    "gene",
    "grading",
    "audit"
  ]
},
  {
  "id": "expression-tissue-056",
  "name": "Gene Expression by Tissue 056",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-15",
  "license": "CC BY-NC 4.0",
  "size": "3.3 GB",
  "records": "14.3M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "SIDER-like adverse events",
    "ChEMBL-like pharmacology",
    "FDA label corpora"
  ],
  "tags": [
    "evidence",
    "rna-seq",
    "audit",
    "normalization"
  ]
},
  {
  "id": "protein-protein-057",
  "name": "Protein–Protein Interactions 057",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-12",
  "license": "CC BY-NC 4.0",
  "size": "2.6 GB",
  "records": "33.3M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "UMLS-like ontologies",
    "PubMed-derived corpora",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "protein",
    "interaction",
    "normalization",
    "grading"
  ]
},
  {
  "id": "pathway-interactions-058",
  "name": "Pathway Interactions 058",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-08-10",
  "license": "CC BY 4.0",
  "size": "4.0 GB",
  "records": "21.0M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "UMLS-like ontologies",
    "Reactome-like pathways",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "normalization",
    "evidence",
    "pathway",
    "interaction"
  ]
},
  {
  "id": "expression-tissue-059",
  "name": "Gene Expression by Tissue 059",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-06-13",
  "license": "CC BY-NC 4.0",
  "size": "5.3 GB",
  "records": "1.9M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "EHR summary tables",
    "ClinVar-like archives",
    "UMLS-like ontologies"
  ],
  "tags": [
    "expression",
    "grading",
    "evidence",
    "audit"
  ]
},
  {
  "id": "trial-outcomes-060",
  "name": "Clinical Trial Outcomes 060",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-28",
  "license": "CC BY 4.0",
  "size": "4.0 GB",
  "records": "28.0M nodes / 24.8M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "STRING-like PPI",
    "ChEMBL-like pharmacology",
    "GTEx-like expression"
  ],
  "tags": [
    "trial",
    "evidence",
    "grading",
    "audit"
  ]
},
  {
  "id": "metabolite-gene-061",
  "name": "Metabolite ↔ Gene Signals 061",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-08-09",
  "license": "ODC-BY 1.0",
  "size": "5.3 GB",
  "records": "14.2M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "Reactome-like pathways",
    "UMLS-like ontologies",
    "ClinVar-like archives"
  ],
  "tags": [
    "audit",
    "metabolite",
    "omics",
    "grading"
  ]
},
  {
  "id": "variant-clinvar-062",
  "name": "Variant Clinical Assertions 062",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-05-09",
  "license": "CC BY-NC 4.0",
  "size": "3.4 GB",
  "records": "27.8M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "ChEMBL-like pharmacology",
    "Reactome-like pathways",
    "GWAS catalogs"
  ],
  "tags": [
    "normalization",
    "clinical",
    "grading",
    "evidence"
  ]
},
  {
  "id": "trial-outcomes-063",
  "name": "Clinical Trial Outcomes 063",
  "description": "Clinical Trial Outcomes with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-04-12",
  "license": "CC BY-NC 4.0",
  "size": "4.5 GB",
  "records": "40.7M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "SIDER-like adverse events",
    "EHR summary tables",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "clinical",
    "trial",
    "grading",
    "outcomes"
  ]
},
  {
  "id": "pathway-interactions-064",
  "name": "Pathway Interactions 064",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-04-26",
  "license": "ODC-BY 1.0",
  "size": "5.5 GB",
  "records": "5.2M nodes / 69.9M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "FDA label corpora",
    "ChEMBL-like pharmacology",
    "ClinVar-like archives"
  ],
  "tags": [
    "network",
    "grading",
    "evidence",
    "pathway"
  ]
},
  {
  "id": "protein-protein-065",
  "name": "Protein–Protein Interactions 065",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-21",
  "license": "ODC-BY 1.0",
  "size": "4.4 GB",
  "records": "43.7M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "GTEx-like expression",
    "FDA label corpora",
    "GWAS catalogs"
  ],
  "tags": [
    "normalization",
    "audit",
    "interaction",
    "ppi"
  ]
},
  {
  "id": "pathway-interactions-066",
  "name": "Pathway Interactions 066",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-04-26",
  "license": "ODC-BY 1.0",
  "size": "4.3 GB",
  "records": "5.8M nodes / 25.4M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "PubMed-derived corpora",
    "Reactome-like pathways",
    "SIDER-like adverse events"
  ],
  "tags": [
    "network",
    "audit",
    "normalization",
    "evidence"
  ]
},
  {
  "id": "adverse-events-067",
  "name": "Drug ↔ Adverse Events 067",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-08-14",
  "license": "CC BY-NC 4.0",
  "size": "3.5 GB",
  "records": "8.9M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "GTEx-like expression",
    "STRING-like PPI",
    "GWAS catalogs"
  ],
  "tags": [
    "evidence",
    "grading",
    "safety",
    "normalization"
  ]
},
  {
  "id": "drug-targets-068",
  "name": "Drug ↔ Target Map 068",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-07-27",
  "license": "CC BY-NC 4.0",
  "size": "4.1 GB",
  "records": "23.5M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "SIDER-like adverse events",
    "UMLS-like ontologies",
    "EHR summary tables"
  ],
  "tags": [
    "drug",
    "evidence",
    "pharmacology",
    "grading"
  ]
},
  {
  "id": "metabolite-gene-069",
  "name": "Metabolite ↔ Gene Signals 069",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-07-26",
  "license": "CC BY-NC 4.0",
  "size": "1.4 GB",
  "records": "24.4M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "STRING-like PPI",
    "GTEx-like expression",
    "Reactome-like pathways"
  ],
  "tags": [
    "grading",
    "omics",
    "normalization",
    "metabolite"
  ]
},
  {
  "id": "metabolite-gene-070",
  "name": "Metabolite ↔ Gene Signals 070",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-03",
  "license": "ODC-BY 1.0",
  "size": "5.2 GB",
  "records": "48.7M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "ClinVar-like archives",
    "GWAS catalogs",
    "Reactome-like pathways"
  ],
  "tags": [
    "gene",
    "normalization",
    "audit",
    "omics"
  ]
},
  {
  "id": "adverse-events-071",
  "name": "Drug ↔ Adverse Events 071",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-11",
  "license": "CC BY-NC 4.0",
  "size": "4.8 GB",
  "records": "11.6M nodes / 12.3M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "Reactome-like pathways",
    "STRING-like PPI",
    "EHR summary tables"
  ],
  "tags": [
    "safety",
    "audit",
    "grading",
    "adverse"
  ]
},
  {
  "id": "ontologies-crosswalk-072",
  "name": "Ontologies Crosswalk 072",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-13",
  "license": "CC BY-NC 4.0",
  "size": "5.5 GB",
  "records": "48.4M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "Reactome-like pathways",
    "FDA label corpora",
    "ChEMBL-like pharmacology"
  ],
  "tags": [
    "ontology",
    "crosswalks",
    "normalization",
    "evidence"
  ]
},
  {
  "id": "ontologies-crosswalk-073",
  "name": "Ontologies Crosswalk 073",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-24",
  "license": "CC BY-NC 4.0",
  "size": "379 MB",
  "records": "23.0M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "GTEx-like expression",
    "STRING-like PPI",
    "Reactome-like pathways"
  ],
  "tags": [
    "ontology",
    "normalization",
    "crosswalks",
    "evidence"
  ]
},
  {
  "id": "phenotype-gene-074",
  "name": "Phenotype ↔ Gene Links 074",
  "description": "Phenotype ↔ Gene Links with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-05-27",
  "license": "ODC-BY 1.0",
  "size": "660 MB",
  "records": "45.5M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "SIDER-like adverse events",
    "STRING-like PPI",
    "FDA label corpora"
  ],
  "tags": [
    "gene",
    "phenotype",
    "normalization",
    "ontology"
  ]
},
  {
  "id": "drug-targets-075",
  "name": "Drug ↔ Target Map 075",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-25",
  "license": "CC BY 4.0",
  "size": "5.4 GB",
  "records": "14.2M nodes / 54.3M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "GTEx-like expression",
    "EHR summary tables",
    "STRING-like PPI"
  ],
  "tags": [
    "normalization",
    "drug",
    "evidence",
    "grading"
  ]
},
  {
  "id": "expression-tissue-076",
  "name": "Gene Expression by Tissue 076",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-04",
  "license": "CC BY 4.0",
  "size": "2.8 GB",
  "records": "42.8M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "SIDER-like adverse events",
    "Reactome-like pathways",
    "UMLS-like ontologies"
  ],
  "tags": [
    "normalization",
    "rna-seq",
    "expression",
    "evidence"
  ]
},
  {
  "id": "expression-tissue-077",
  "name": "Gene Expression by Tissue 077",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-05-02",
  "license": "CC BY-NC 4.0",
  "size": "822 MB",
  "records": "32.2M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "PubMed-derived corpora",
    "Reactome-like pathways",
    "GWAS catalogs"
  ],
  "tags": [
    "tissue",
    "grading",
    "audit",
    "expression"
  ]
},
  {
  "id": "ontologies-crosswalk-078",
  "name": "Ontologies Crosswalk 078",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-05-26",
  "license": "CC BY 4.0",
  "size": "2.2 GB",
  "records": "27.1M nodes / 2.2M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "EHR summary tables",
    "UMLS-like ontologies",
    "ClinVar-like archives"
  ],
  "tags": [
    "audit",
    "crosswalks",
    "ontology",
    "grading"
  ]
},
  {
  "id": "adverse-events-079",
  "name": "Drug ↔ Adverse Events 079",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-01",
  "license": "CC BY 4.0",
  "size": "3.7 GB",
  "records": "8.7M nodes / 11.9M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "UMLS-like ontologies",
    "FDA label corpora",
    "GTEx-like expression"
  ],
  "tags": [
    "evidence",
    "audit",
    "adverse",
    "drug"
  ]
},
  {
  "id": "drug-targets-080",
  "name": "Drug ↔ Target Map 080",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-04-12",
  "license": "ODC-BY 1.0",
  "size": "4.8 GB",
  "records": "26.3M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "SIDER-like adverse events",
    "PubMed-derived corpora",
    "GTEx-like expression"
  ],
  "tags": [
    "evidence",
    "audit",
    "normalization",
    "drug"
  ]
},
  {
  "id": "drug-targets-081",
  "name": "Drug ↔ Target Map 081",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-04-19",
  "license": "CC BY 4.0",
  "size": "2.1 GB",
  "records": "4.7M nodes / 50.7M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "STRING-like PPI",
    "GTEx-like expression",
    "UMLS-like ontologies"
  ],
  "tags": [
    "pharmacology",
    "evidence",
    "grading",
    "normalization"
  ]
},
  {
  "id": "pathway-interactions-082",
  "name": "Pathway Interactions 082",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-05-26",
  "license": "CC BY-NC 4.0",
  "size": "2.9 GB",
  "records": "17.3M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "STRING-like PPI",
    "SIDER-like adverse events",
    "FDA label corpora"
  ],
  "tags": [
    "network",
    "evidence",
    "audit",
    "grading"
  ]
},
  {
  "id": "protein-protein-083",
  "name": "Protein–Protein Interactions 083",
  "description": "Protein–Protein Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-07-31",
  "license": "CC BY 4.0",
  "size": "819 MB",
  "records": "13.5M nodes / 60.1M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "EHR summary tables",
    "UMLS-like ontologies",
    "PubMed-derived corpora"
  ],
  "tags": [
    "grading",
    "audit",
    "normalization",
    "interaction"
  ]
},
  {
  "id": "pathway-interactions-084",
  "name": "Pathway Interactions 084",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-06-30",
  "license": "ODC-BY 1.0",
  "size": "5.7 GB",
  "records": "45.8M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "ClinVar-like archives",
    "GTEx-like expression",
    "SIDER-like adverse events"
  ],
  "tags": [
    "network",
    "pathway",
    "grading",
    "interaction"
  ]
},
  {
  "id": "adverse-events-085",
  "name": "Drug ↔ Adverse Events 085",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-05-28",
  "license": "CC BY 4.0",
  "size": "2.3 GB",
  "records": "6.2M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "GTEx-like expression",
    "GWAS catalogs",
    "STRING-like PPI"
  ],
  "tags": [
    "audit",
    "grading",
    "normalization",
    "drug"
  ]
},
  {
  "id": "variant-clinvar-086",
  "name": "Variant Clinical Assertions 086",
  "description": "Variant Clinical Assertions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-08",
  "license": "CC BY 4.0",
  "size": "1.9 GB",
  "records": "46.1M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "PubMed-derived corpora",
    "EHR summary tables",
    "GTEx-like expression"
  ],
  "tags": [
    "grading",
    "normalization",
    "evidence",
    "variant"
  ]
},
  {
  "id": "adverse-events-087",
  "name": "Drug ↔ Adverse Events 087",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-04-24",
  "license": "ODC-BY 1.0",
  "size": "3.3 GB",
  "records": "23.0M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "Reactome-like pathways",
    "ClinVar-like archives",
    "SIDER-like adverse events"
  ],
  "tags": [
    "audit",
    "grading",
    "normalization",
    "drug"
  ]
},
  {
  "id": "phenotype-gene-088",
  "name": "Phenotype ↔ Gene Links 088",
  "description": "Phenotype ↔ Gene Links with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-05-11",
  "license": "ODC-BY 1.0",
  "size": "583 MB",
  "records": "13.9M nodes / 35.1M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "STRING-like PPI",
    "ClinVar-like archives",
    "GWAS catalogs"
  ],
  "tags": [
    "audit",
    "grading",
    "phenotype",
    "ontology"
  ]
},
  {
  "id": "metabolite-gene-089",
  "name": "Metabolite ↔ Gene Signals 089",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-06-12",
  "license": "ODC-BY 1.0",
  "size": "4.2 GB",
  "records": "33.5M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "GWAS catalogs",
    "STRING-like PPI",
    "PubMed-derived corpora"
  ],
  "tags": [
    "metabolite",
    "gene",
    "omics",
    "normalization"
  ]
},
  {
  "id": "adverse-events-090",
  "name": "Drug ↔ Adverse Events 090",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-06-14",
  "license": "CC BY-NC 4.0",
  "size": "983 MB",
  "records": "21.8M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "STRING-like PPI",
    "UMLS-like ontologies",
    "GWAS catalogs"
  ],
  "tags": [
    "grading",
    "audit",
    "adverse",
    "drug"
  ]
},
  {
  "id": "metabolite-gene-091",
  "name": "Metabolite ↔ Gene Signals 091",
  "description": "Metabolite ↔ Gene Signals with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-21",
  "license": "CC BY 4.0",
  "size": "2.9 GB",
  "records": "10.1M nodes / 35.5M edges",
  "provenance": "Curation overlays with audit trails.",
  "sources": [
    "SIDER-like adverse events",
    "STRING-like PPI",
    "ClinVar-like archives"
  ],
  "tags": [
    "metabolite",
    "evidence",
    "audit",
    "omics"
  ]
},
  {
  "id": "adverse-events-092",
  "name": "Drug ↔ Adverse Events 092",
  "description": "Drug ↔ Adverse Events with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.08",
  "lastUpdated": "2025-07-02",
  "license": "CC BY 4.0",
  "size": "2.8 GB",
  "records": "13.6M nodes / 33.2M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "STRING-like PPI",
    "ClinVar-like archives",
    "Reactome-like pathways"
  ],
  "tags": [
    "safety",
    "adverse",
    "audit",
    "drug"
  ]
},
  {
  "id": "ontologies-crosswalk-093",
  "name": "Ontologies Crosswalk 093",
  "description": "Ontologies Crosswalk with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-08-14",
  "license": "ODC-BY 1.0",
  "size": "1.4 GB",
  "records": "17.9M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "GWAS catalogs",
    "FDA label corpora",
    "EHR summary tables"
  ],
  "tags": [
    "mapping",
    "crosswalks",
    "normalization",
    "grading"
  ]
},
  {
  "id": "pathway-interactions-094",
  "name": "Pathway Interactions 094",
  "description": "Pathway Interactions with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.06",
  "lastUpdated": "2025-08-05",
  "license": "CC BY-NC 4.0",
  "size": "4.6 GB",
  "records": "22.7M edges",
  "provenance": "Structured registries + literature mining.",
  "sources": [
    "SIDER-like adverse events",
    "Reactome-like pathways",
    "EHR summary tables"
  ],
  "tags": [
    "evidence",
    "pathway",
    "audit",
    "grading"
  ]
},
  {
  "id": "expression-tissue-095",
  "name": "Gene Expression by Tissue 095",
  "description": "Gene Expression by Tissue with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.07",
  "lastUpdated": "2025-04-15",
  "license": "CC BY-NC 4.0",
  "size": "3.2 GB",
  "records": "22.9M edges",
  "provenance": "Automated extraction + expert review.",
  "sources": [
    "Reactome-like pathways",
    "ClinVar-like archives",
    "FDA label corpora"
  ],
  "tags": [
    "normalization",
    "expression",
    "grading",
    "evidence"
  ]
},
  {
  "id": "drug-targets-096",
  "name": "Drug ↔ Target Map 096",
  "description": "Drug ↔ Target Map with normalized identifiers, evidence grading, and provenance.",
  "version": "2025.05",
  "lastUpdated": "2025-07-25",
  "license": "ODC-BY 1.0",
  "size": "4.0 GB",
  "records": "24.0M edges",
  "provenance": "Harmonized public resources with QA audits.",
  "sources": [
    "PubMed-derived corpora",
    "ChEMBL-like pharmacology",
    "FDA label corpora"
  ],
  "tags": [
    "audit",
    "pharmacology",
    "drug",
    "target"
  ]
},
];

export default DATASETS;
