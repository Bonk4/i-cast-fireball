import {
  Button,
  Checkbox,
  Divider,
  Group,
  Input,
  NumberInput,
  SegmentedControl,
  Space,
  Text,
  Textarea,
  TextInput,
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

        if (rolls[i].indexOf('*') > -1) {
          if (roll === 1) {
            newHero.critFail = true;
          } else {
            newHero.critSuccess = true;
          }
        }

        newHero.initiative = roll;
        newHeroes.push(newHero);
      }

      updateHeroes(newHeroes);
    }
  };

  const addHero = () => {
    let newHeroes = heroes.slice();
    newHeroes.push(new Hero());
    updateHeroes(newHeroes);
  };

  const clearHeroes = () => {
    updateHeroes(new Array<Hero>());
  };

  const updateName = (e: any, index: number) => {
    let newHeroes = heroes.slice();
    newHeroes[index].name = e.target.value;
    updateHeroes(newHeroes);
  };

  const updateInitiative = (e: any, index: number) => {
    let newHeroes = heroes.slice();
    newHeroes[index].initiative = e;
    updateHeroes(newHeroes);
  };

  const updateCriticalSuccess = (e: any, index: number) => {
    let newHeroes = heroes.slice();
    heroes[index].critSuccess = e.target.checked;
    heroes[index].critFail = !e.target.checked;
    updateHeroes(newHeroes);
  };

  const updateCriticalFail = (e: any, index: number) => {
    let newHeroes = heroes.slice();
    heroes[index].critFail = e.target.checked;
    heroes[index].critSuccess = !e.target.checked;
    updateHeroes(newHeroes);
  };

  const removeHero = (e: any, index: number) => {
    let newHeroes = heroes.slice();
    newHeroes.splice(index, 1);
    updateHeroes(newHeroes);
  };

  return (
    <>
      <Space h={'sm'} />
      <Group position="apart">
        {editorType === 'quick' ? (
          <Button color="red" onClick={clearHeroes} uppercase>
            Clear
          </Button>
        ) : (
          <Button onClick={addHero} uppercase>
            Add
          </Button>
        )}
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

      {editorType === 'custom' ? (
        <>
          {heroes.map((hero, i) => (
            <>
              <Space h={'sm'} />
              <Divider size={'sm'} />
              <Space h={'sm'} />

              <Group position="center" grow>
                <TextInput
                  label="Hero"
                  value={hero.name}
                  onChange={(e: any) => updateName(e, i)}
                ></TextInput>
                <NumberInput
                  defaultValue={hero.initiative}
                  value={hero.initiative}
                  placeholder="2"
                  label="Initiative"
                  onChange={(e) => updateInitiative(e, i)}
                />
              </Group>
              <Space h={'sm'} />
              <Group position="center" grow>
                <Checkbox
                  label="Critical Success?"
                  value={hero.critSuccess.toString()}
                  onChange={(e) => updateCriticalSuccess(e, i)}
                />

                <Checkbox
                  label="Critical Fail?"
                  value={hero.critFail.toString()}
                  onChange={(e) => updateCriticalFail(e, i)}
                />

                <Button
                  color="red"
                  radius="xl"
                  size="sm"
                  uppercase
                  onClick={(e: any) => removeHero(e, i)}
                >
                  Remove
                </Button>
              </Group>
              <Space h={'lg'} />
            </>
          ))}
        </>
      ) : (
        <Textarea
          placeholder="3, 14, 20*..."
          onChange={updateHeroesFromHeroInits}
        />
      )}

      {/* <p>{heroes.map((hero) => hero.name + ' ')}</p> */}
    </>
  );
};

export default PartyConfig;
