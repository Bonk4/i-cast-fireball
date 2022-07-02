export class Organism {
  public constructor(lightSide: boolean) {
    this.lightSide = lightSide;
  }

  lightSide: boolean = false;
  success: number = 0;
  advantage: number = 0;
  triumph: number = 0;
}
