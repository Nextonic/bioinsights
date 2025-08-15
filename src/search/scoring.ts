import { FDA_WEIGHTED_DATASET_IDS } from "@/data/datasets";

export type Evidence = {
  datasetId: string;
  title: string;
  url?: string;
  matchedEntities: { genes?: string[]; diseases?: string[]; drugs?: string[] };
  signals: {
    entityOverlap: number; // 0..1
    recency: number; // 0..1
    sourceAuthority: number; // 0..1 (FDA, peer-reviewed, etc.)
    textMatch: number; // 0..1 semantic/lexical match to question
  };
};

export type ScoredAnswer = {
  answer: string;
  score: number; // 0..1
  question: string;
  related: string[];
  evidence: Evidence[];
};

export function scoreEvidence(e: Evidence): number {
  const base =
    0.35 * e.signals.entityOverlap +
    0.25 * e.signals.textMatch +
    0.2 * e.signals.recency +
    0.2 * e.signals.sourceAuthority;
  const fdaBoost = FDA_WEIGHTED_DATASET_IDS.has(e.datasetId) ? 0.08 : 0;
  return Math.min(1, base + fdaBoost);
}

export function explainEvidence(e: Evidence) {
  const reasons: string[] = [];
  if (e.signals.entityOverlap > 0.6) reasons.push("Strong gene/disease/drug overlap");
  if (e.signals.textMatch > 0.6) reasons.push("High semantic/text match to the question");
  if (e.signals.recency > 0.6) reasons.push("Recent information");
  if (FDA_WEIGHTED_DATASET_IDS.has(e.datasetId)) reasons.push("FDA-authoritative source");
  return reasons;
}

export function scoreAnswer(a: Omit<ScoredAnswer, "score">): ScoredAnswer {
  const evScores = a.evidence.map(scoreEvidence);
  const agg = evScores.reduce((s, x) => s + x, 0) / Math.max(1, evScores.length);
  // Light bonus for multiple independent sources agreeing
  const diversity = new Set(a.evidence.map((e) => e.datasetId)).size;
  const diversityBonus = Math.min(0.07, (diversity - 1) * 0.015);
  return { ...a, score: Math.min(1, agg + diversityBonus) };
}
