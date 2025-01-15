export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  category: string;
  imageUrl?: string;
  registrationOpen: boolean;
  createdAt: string;
  updatedAt: string;
}

export type EventFormData = Omit<Event, "id" | "createdAt" | "updatedAt">;
