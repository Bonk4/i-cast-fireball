import {
  Group,
  SegmentedControl,
  Space,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Hero } from '../../../models/creatures/hero';

export type PartyConfigProps = {
  heroes: Hero[];
  updateHeroes: Function;
};

const PartyConfig = ({ heroes, updateHeroes }: PartyConfigProps) => {
  const [editorType, updateEditorType] = useState('quick');

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
      <Group position="apart" grow>
        <Title order={2}>Party</Title>
        <SegmentedControl
          data={[
            { label: 'Quick', value: 'quick' },
            { label: 'Custom', value: 'custom' },
          ]}
          value={editorType}
          onChange={updateEditorType}
        />
      </Group>
      <Space h={'md'} />
      <Textarea
        placeholder="3, 14, 20*..."
        onChange={updateHeroesFromHeroInits}
      />

      <p>{heroes.map((hero) => hero.name + ' ')}</p>
    </>
  );
};

export default PartyConfig;
