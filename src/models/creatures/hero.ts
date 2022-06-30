import { HeroNames } from '../../data/heroNames';
import { Creature } from '../creature';

export class Hero extends Creature {
  constructor() {
    super();
    this.name = HeroNames.GetHeroName();
  }
}
