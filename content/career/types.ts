export type CareerProject = {
  id: string;
  start: string;
  end: string | null;
  name: string;
  roles: string[];
  summary: string;
  members?: string;
  tech?: string[];
};

export type CareerEntry = {
  id: string;
  start: string;
  end: string | null;
  company: string;
  roles: string[];
  summary: string;
  members?: string;
  tech?: string[];
  projects?: CareerProject[];
};

export type CareerData = {
  entries: CareerEntry[];
};
