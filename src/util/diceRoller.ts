export class DiceRoller {
  d2() {
    return this.randomInt(1, 2);
  }
  d3() {
    return this.randomInt(1, 3);
  }
  d4() {
    return this.randomInt(1, 4);
  }
  d6() {
    return this.randomInt(1, 6);
  }
  d8() {
    return this.randomInt(1, 8);
  }
  d10() {
    return this.randomInt(1, 10);
  }
  d12() {
    return this.randomInt(1, 12);
  }
  d20() {
    return this.randomInt(1, 20);
  }
  d100() {
    return this.randomInt(1, 100);
  }

  private randomInt(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}
