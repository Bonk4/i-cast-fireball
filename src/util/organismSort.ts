import { Organism } from '../models/organism';

declare global {
  interface Array<T> {
    rollForInitiativeInSpace(): Array<Organism>;
  }
}

Array.prototype.rollForInitiativeInSpace = function (): Array<Organism> {
  return this.sort(
    // sort initiative score high to low
    function (a: Organism, b: Organism) {
      let totalSuccessA = a.success + a.triumph,
        totalSuccessB = b.success + b.triumph;

      // total success wins first
      if (totalSuccessA < totalSuccessB) return 1;
      if (totalSuccessA > totalSuccessB) return -1;

      // on ties fall to advantage
      if (a.advantage < b.advantage) return 1;
      if (a.advantage > b.advantage) return -1;

      // on a tie, check for triumphs
      if (totalSuccessA === totalSuccessB) {
        if (b.triumph > a.triumph) return 1;
        if (a.triumph > b.triumph) return -1;
      }

      // last ditch effort, light side wins ties
      if (a.lightSide) return -1;
      if (b.lightSide) return 1;

      return 0;
    },
  );
};
