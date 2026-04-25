export type Skill = {
  name: string;
  years?: number;
};

export type SkillGroup = {
  category: string;
  description?: string;
  items: Skill[];
};

export const skills: SkillGroup[] = [
  {
    category: "Languages",
    description: "メインで書いてきた言語",
    items: [
      { name: "TypeScript", years: 6 },
      { name: "JavaScript", years: 8 },
      { name: "Go", years: 3 },
      { name: "Python", years: 2 },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js" },
      { name: "React" },
      { name: "Vue.js" },
      { name: "Tailwind CSS" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js" },
      { name: "NestJS" },
      { name: "Express" },
      { name: "REST / GraphQL" },
    ],
  },
  {
    category: "Cloud / Infra",
    items: [
      { name: "AWS" },
      { name: "GCP" },
      { name: "Docker" },
      { name: "Terraform" },
    ],
  },
  {
    category: "Database",
    items: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "DynamoDB" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "Git / GitHub" },
      { name: "GitHub Actions" },
      { name: "Datadog" },
    ],
  },
];
