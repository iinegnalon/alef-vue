import type { Person } from '@/models/person';

export interface User extends Person {
  children: Person[];
}
