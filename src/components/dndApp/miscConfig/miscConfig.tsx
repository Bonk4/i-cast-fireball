import { Group, SegmentedControl, Space, Textarea, Title } from '@mantine/core';
import { useState } from 'react';
import { Custom } from '../../../models/creatures/custom';

export type MiscConfigProps = {
  misc: Custom[];
  updateMisc: Function;
};

const MiscConfig = ({ misc, updateMisc }: MiscConfigProps) => {
  const [editorType, updateEditorType] = useState('quick');
  const updateVillainsFromHeroInits = (e: any) => {
    let newCustoms: Custom[] = [];
    if (e.target.value !== undefined && e.target.value !== '') {
      let rolls = e.target.value.split(/[\s,;]+/);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());
        let newMisc = new Custom();

        newMisc.initiative = roll;
        newCustoms.push(newMisc);
      }

      updateMisc(newCustoms);
    }
  };

  return (
    <>
      <Group position="apart" grow>
        <Title order={2}>Custom</Title>
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

      <p>{misc.map((custom) => custom.name + ' ')}</p>
    </>
  );
};

export default MiscConfig;
