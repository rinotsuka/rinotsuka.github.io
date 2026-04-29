export type CareerProject = {
  id: string;
  start: string;
  end: string | null;
  name: string;
  members?: string;
  methodology?: string;
  target?: string[];
  duties?: string[];
  tech?: string[];
  summary: string;
};

export type CareerEntry = {
  id: string;
  start: string;
  end: string | null;
  company: string;
  employment?: string;
  summary: string;
  projects?: CareerProject[];
};

export type CareerData = {
  entries: CareerEntry[];
};
