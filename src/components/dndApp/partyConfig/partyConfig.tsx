import { Text, Textarea } from '@mantine/core';
import { Hero } from '../../../models/creatures/hero';

export type PartyConfigProps = {
  heroes: Hero[];
  updateHeroes: Function;
};

const PartyConfig = ({ heroes, updateHeroes }: PartyConfigProps) => {
  const updateHeroesFromHeroInits = (e: any) => {
    let newHeroes: Array<Hero> = [];
    if (e.target.value !== undefined && e.target.value !== '') {
      let rolls = e.target.value.split(/[\s,;]+/);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());
        let newHero = new Hero();

        newHero.initiative = roll;
        newHeroes.push(newHero);
      }

      updateHeroes(newHeroes);
    }
  };

  return (
    <>
      <Textarea
        placeholder="3, 14, 20*..."
        label="Party Initiatives"
        onChange={updateHeroesFromHeroInits}
      />

      <p>{heroes.map((hero) => hero.name + ' ')}</p>
    </>
  );
};

export default PartyConfig;
