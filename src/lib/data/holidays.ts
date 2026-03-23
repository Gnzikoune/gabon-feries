export type HolidayCategory = "Civil" | "National" | "Religieux" | "Mobile";

export interface Holiday {
  id: string;
  name: string;
  date: string;
  category: HolidayCategory;
  description: string;
}

export const GABON_HOLIDAYS: Holiday[] = [
  {
    id: "ny-2026",
    name: "Jour de l'An",
    date: "2026-01-01",
    category: "Civil",
    description: "Premier jour de l'année civile."
  },
  {
    id: "easter-mon-2026",
    name: "Lundi de Pâques",
    date: "2026-04-06",
    category: "Religieux",
    description: "Lundi suivant le dimanche de Pâques."
  },
  {
    id: "women-day-2026",
    name: "Journée de la Femme",
    date: "2026-04-17",
    category: "Civil",
    description: "Célébration des droits des femmes au Gabon."
  },
  {
    id: "labor-day-2026",
    name: "Fête du Travail",
    date: "2026-05-01",
    category: "Civil",
    description: "Célébration internationale des travailleurs."
  },
  {
    id: "ascension-2026",
    name: "Ascension",
    date: "2026-05-14",
    category: "Religieux",
    description: "Montée de Jésus au ciel."
  },
  {
    id: "whit-mon-2026",
    name: "Lundi de Pentecôte",
    date: "2026-05-25",
    category: "Religieux",
    description: "Lundi suivant le dimanche de la Pentecôte."
  },
  {
    id: "independance-16-2026",
    name: "Fête Nationale (Veille)",
    date: "2026-08-16",
    category: "National",
    description: "Préparation de la fête de l'indépendance."
  },
  {
    id: "independance-17-2026",
    name: "Fête de l'Indépendance",
    date: "2026-08-17",
    category: "National",
    description: "Anniversaire de l'accession du Gabon à la souveraineté internationale (1960)."
  },
  {
    id: "assumption-2026",
    name: "Assomption",
    date: "2026-08-15",
    category: "Religieux",
    description: "Célébration de la montée au ciel de la Vierge Marie."
  },
  {
    id: "all-saints-2026",
    name: "Toussaint",
    date: "2026-11-01",
    category: "Religieux",
    description: "Fête de tous les saints."
  },
  {
    id: "christmas-2026",
    name: "Noël",
    date: "2026-12-25",
    category: "Religieux",
    description: "Naissance de Jésus-Christ."
  }
];
