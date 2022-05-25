export class Creature {
    //random 4 digit ID assigned at birth
    id: number = Math.floor(1000 + Math.random() * 9000);
    name: string = '';

    hp: number = 0;
    ac: number = 10;

    initiative: number = 0;
    critFail: boolean = false;
    critSuccess: boolean = false;

    display: boolean = true;
    marked: boolean = false;
}