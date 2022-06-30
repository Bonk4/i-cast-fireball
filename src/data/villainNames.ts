export class VillainNames {
  static names: string[] = [
    'Kirnon',
    'Franz',
    'Sable',
    'Cloven',
    'Vayne',
    'Drake',
    'Bane',
    'Eike',
    'Yao',
    'Franz',
    'Genevere',
    'Sana',
    'Enigma',
    'Rave',
    'Blade',
    'Twilight',
    'Lucia',
    'Carmina',
    'Carmilla',
    'Yoko',
    'Zero',
    'Adaranth',
    'Moon',
    'Gabriel',
    'Dream',
    'Alex',
    'Fark',
    'Jinx',
    'Inigo',
    'Talon',
  ];

  static GetVillainName(): string {
    return this.names[Math.floor(Math.random() * this.names.length)];
  }
}
