export interface Contact {
  id: number;
  created: Date;
  birthDate?: Date;
  notes?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  eventTypeIds?: number[];
}
