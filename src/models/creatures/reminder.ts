import { Creature } from '../creature';

// Represents things like Lair actions or non-creature actions
export class Reminder extends Creature {
  goesFirst: boolean = false;
  goesLast: boolean = false;
}
