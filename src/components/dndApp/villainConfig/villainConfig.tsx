import { Group, SegmentedControl, Space, Textarea, Title } from '@mantine/core';
import { useState } from 'react';
import { Villain } from '../../../models/creatures/villain';

export type VillainConfigProps = {
  villains: Villain[];
  updateVillains: Function;
};

const VillainConfig = ({ villains, updateVillains }: VillainConfigProps) => {
  const [editorType, updateEditorType] = useState('quick');
  const updateVillainsFromHeroInits = (e: any) => {
    let newVillains: Villain[] = [];
    if (e.target.value !== undefined && e.target.value !== '') {
      let rolls = e.target.value.split(/[\s,;]+/);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());
        let newVillain = new Villain();

        newVillain.initiative = roll;
        newVillains.push(newVillain);
      }

      updateVillains(newVillains);
    }
  };

  return (
    <>
      <Group position="apart" grow>
        <Title order={2}>Villains</Title>
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
        onChange={updateVillainsFromHeroInits}
      />

      <p>{villains.map((villain) => villain.name + ' ')}</p>
    </>
  );
};

export default VillainConfig;
