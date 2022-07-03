import {
  Button,
  Checkbox,
  Divider,
  Group,
  NumberInput,
  SegmentedControl,
  Space,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Custom } from '../../../models/creatures/custom';

export type MiscConfigProps = {
  misc: Custom[];
  updateMisc: Function;
};

const MiscConfig = ({ misc, updateMisc }: MiscConfigProps) => {
  const addCustom = () => {
    let newMisc = misc.slice();
    newMisc.push(new Custom());
    updateMisc(newMisc);
  };

  const clearCustomes = () => {
    updateMisc(new Array<Custom>());
  };

  const updateName = (e: any, index: number) => {
    let newMisc = misc.slice();
    newMisc[index].name = e.target.value;
    updateMisc(newMisc);
  };

  const updateInitiative = (e: any, index: number) => {
    let newMisc = misc.slice();
    newMisc[index].initiative = e;
    updateMisc(newMisc);
  };

  const updateCustomInitiative = (e: any, index: number) => {
    let newMisc = misc.slice();
    newMisc[index].goesFirst = e === 'first';
    newMisc[index].goesLast = e === 'last';
    updateMisc(newMisc);
  };

  const removeCustom = (e: any, index: number) => {
    let newMisc = misc.slice();
    newMisc.splice(index, 1);
    updateMisc(newMisc);
  };
  const clearMisc = () => {
    updateMisc(new Array<Custom>());
  };

  return (
    <>
      <Space h={'md'} />
      <Group>
        <Button color="red" onClick={clearMisc} uppercase>
          Clear
        </Button>
        <Button onClick={addCustom} uppercase>
          Add
        </Button>
      </Group>
      <Space h={'md'} />
      <>
        {misc.map((misc, i) => (
          <>
            <Space h={'sm'} />
            <Divider size={'sm'} />
            <Space h={'sm'} />

            <Group position="center" grow>
              <TextInput
                label="Custom"
                value={misc.name}
                onChange={(e: any) => updateName(e, i)}
              ></TextInput>
              <NumberInput
                defaultValue={misc.initiative}
                value={misc.initiative}
                placeholder="2"
                label="Initiative"
                onChange={(e) => updateInitiative(e, i)}
              />
            </Group>
            <Space h={'sm'} />
            <Group position="apart">
              <SegmentedControl
                data={[
                  { label: 'Always First', value: 'first' },
                  { label: 'Always Last', value: 'last' },
                  { label: 'Initiative', value: 'init' },
                ]}
                onChange={(e) => updateCustomInitiative(e, i)}
              />
              <Button
                color="red"
                radius="xl"
                size="sm"
                uppercase
                onClick={(e: any) => removeCustom(e, i)}
              >
                Remove
              </Button>
            </Group>
            <Space h={'sm'} />
          </>
        ))}
      </>
    </>
  );
};

export default MiscConfig;
