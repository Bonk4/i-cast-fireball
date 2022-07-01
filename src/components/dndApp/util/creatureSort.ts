import { Creature } from '../../../models/creature';
import { Custom } from '../../../models/creatures/custom';

declare global {
  interface Array<T> {
    rollForInitiative(): Array<Creature>;
  }
}

Array.prototype.rollForInitiative = function (): Array<Creature> {
  return this.sort(
    // sort initiative score high to low
    function (a, b) {
      let keyA = a.initiative,
        keyB = b.initiative;

      // Reminder logic for "always goes first/last" takes priority
      if (a instanceof Custom) {
        let a2 = a as Custom;
        if (a2.goesFirst) return -1;
        if (a2.goesLast) return 1;
      }

      if (b instanceof Custom) {
        let b2 = b as Custom;
        if (b2.goesFirst) return 1;
        if (b2.goesLast) return -1;
      }

      // Next priority is Crit Success/Fail
      if (a.critFail || a.critSuccess || b.critFail || b.critSuccess) {
        if (a.critSuccess && b.critSuccess) {
          return 0;
        }
        if (a.critFail || b.critSuccess) return 1;
        if (b.critFail || a.critSuccess) return -1;
      }

      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    },
  );
};
