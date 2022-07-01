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
      let successKeyA = a.success,
        successKeyB = b.success,
        advKeyA = a.advantage,
        advKeyB = b.advantage;

      if (!a.triumph && b.triumph) return 1;
      if (a.triumph && !b.triumph) return -1;

      if (successKeyA < successKeyB) return 1;
      if (successKeyA > successKeyB) return -1;

      if (advKeyA < advKeyB) return 1;
      if (advKeyA > advKeyB) return -1;

      return 0;
    },
  );
};
