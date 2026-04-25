export type CareerEntry = {
  id: string;
  start: string;
  end: string | null;
  role: string;
  industry?: string;
  scale?: string;
  summary: string;
  responsibilities?: string[];
  achievements?: string[];
  tech?: string[];
};

export type CareerData = {
  entries: CareerEntry[];
};
