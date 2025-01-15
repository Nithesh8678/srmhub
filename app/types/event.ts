export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  club: string;
  imageUrl?: string;
  registrationOpen: boolean;
  registrationLink?: string;
  createdAt: string;
  updatedAt: string;
}

export type EventFormData = Omit<Event, "id" | "createdAt" | "updatedAt">;

// Add club options
export const CLUB_OPTIONS = [
  "General",
  "Slug & Plug",
  "Sketch",
  "Tech-Wiz",
  "Andropedia",
  "Codekrafters",
  "Chipset",
  "Logicplay",
  "Intellects",
  "Synergies",
  "Techpro",
  "Gamecon",
  "Techvayuna",
  "Cyborg",
  "Developers Student Club",
  "Codezilla",
  "Journal Club",
  "Eleet Club",
  "Foreign Language Club",
] as const;

export type ClubType = (typeof CLUB_OPTIONS)[number];
