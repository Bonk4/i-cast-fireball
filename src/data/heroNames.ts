export class HeroNames {
  static names: string[] = [
    'Arnhold',
    'Wolter',
    'Clive',
    'Payton',
    'Tosca',
    'Tamina',
    'Erika',
    'Aegar',
    'Liss',
    'Elian',
    'Astrid',
    'Ermes',
    'Ometa',
    'Pallius',
    'Emmeric',
    'Kali',
    'Quintan',
    'Vance',
    'Alda',
    'Khestri',
    'Velor',
    'Aryn',
    'Kalen',
    'Vega',
    'Hinter',
  ];

  static GetHeroName(): string {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }
}
