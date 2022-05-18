import { Creature } from "../creature";

export class Villain extends Creature {
    // bonus: how much to add to a randomly generated initiate number
    // only on Villains as only Villains can use randomly generated init rolls
    bonus: number = 0;
}