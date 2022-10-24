export class Creature {
  //random 4 digit ID assigned at birth
  id: number = Math.floor(1000 + Math.random() * 9000);
  name: string = '';
  team: number = 0;

  hp: number = 0;
  ac: number = 10;

  initiative: number = 0;
  critFail: boolean = false;
  critSuccess: boolean = false;

  skillCheck: number = 0;
  skillCheckBonus: number = 0;

  display: boolean = true;
  marked: boolean = false;
}
