import { VillainNames } from "../../data/villainNames";
import { Creature } from "../creature";

export class Villain extends Creature {
    constructor(){
        super();
        this.name = VillainNames.GetVillainName();
    }

    // bonus: how much to add to a randomly generated initiate number
    // only on Villains as only Villains can use randomly generated init rolls
    bonus: number = 0;
}