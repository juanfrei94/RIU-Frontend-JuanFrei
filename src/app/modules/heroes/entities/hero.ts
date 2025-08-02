import { Publisher } from './publisher.enum';

export interface Hero {
  id: string;
  superhero: string;
  publisher: Publisher;
  alter_ego: string;
  first_appearance: string;
  characters: string;
}
