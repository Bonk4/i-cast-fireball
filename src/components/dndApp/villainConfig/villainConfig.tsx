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
import { Villain } from '../../../models/creatures/villain';

export type VillainConfigProps = {
  villains: Villain[];
  updateVillains: Function;
  rollForMe: boolean;
  updateRollForMe: Function;
};

const VillainConfig = ({
  villains,
  updateVillains,
  rollForMe,
  updateRollForMe,
}: VillainConfigProps) => {
  const [editorType, updateEditorType] = useState('quick');

  const updateEditor = (e: any) => {
    updateRollForMe(e === 'roll');
    updateEditorType(e);
  };

  const updateVillainsFromvillainInits = (e: any) => {
    let newVillains: Villain[] = [];
    if (e.target.value !== undefined && e.target.value !== '') {
      let rolls = e.target.value.split(/[\s,;]+/);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());
        let newVillain = new Villain();

        if (rolls[i].indexOf('*') > -1) {
          if (roll === 1) {
            newVillain.critFail = true;
          } else {
            newVillain.critSuccess = true;
          }
        }

        newVillain.initiative = roll;
        newVillains.push(newVillain);
      }

      updateVillains(newVillains);
    }
  };

  const addVillain = () => {
    let newVillains = villains.slice();
    newVillains.push(new Villain());
    updateVillains(newVillains);
  };

  const updateName = (e: any, index: number) => {
    let newVillains = villains.slice();
    newVillains[index].name = e.target.value;
    updateVillains(newVillains);
  };

  const updateInitiative = (e: any, index: number) => {
    let newVillains = villains.slice();
    newVillains[index].initiative = e;
    updateVillains(newVillains);
  };

  const updateInitiativeBonus = (e: any, index: number) => {
    let newVillains = villains.slice();
    newVillains[index].bonus = e;
    updateVillains(newVillains);
  };

  const updateCriticalSuccess = (e: any, index: number) => {
    let newVillains = villains.slice();
    villains[index].critSuccess = e.target.checked;
    villains[index].critFail = !e.target.checked;
    updateVillains(newVillains);
  };

  const updateCriticalFail = (e: any, index: number) => {
    let newVillains = villains.slice();
    villains[index].critFail = e.target.checked;
    villains[index].critSuccess = !e.target.checked;
    updateVillains(newVillains);
  };

  const removevillain = (e: any, index: number) => {
    let newVillains = villains.slice();
    newVillains.splice(index, 1);
    updateVillains(newVillains);
  };

  const clearVillains = () => {
    updateVillains(new Array<Villain>());
  };

  return (
    <>
      <Space h={'md'} />
      <Group position="apart">
        {editorType === 'quick' ? (
          <Button color="red" onClick={clearVillains} uppercase>
            Clear
          </Button>
        ) : (
          <Group position="left">
            <Button color="red" onClick={clearVillains} uppercase>
              Clear
            </Button>
            <Button onClick={addVillain} uppercase>
              Add
            </Button>
          </Group>
        )}
        <SegmentedControl
          data={[
            { label: 'Quick', value: 'quick' },
            { label: 'Custom', value: 'custom' },
            { label: 'Roll For Me', value: 'roll' },
          ]}
          value={editorType}
          onChange={(e) => updateEditor(e)}
        />
      </Group>
      <Space h={'md'} />

      {editorType === 'custom' ? (
        <>
          {villains.map((villain, i) => (
            <>
              <Space h={'sm'} />
              <Divider size={'sm'} />
              <Space h={'sm'} />
              <Group position="center" grow>
                <TextInput
                  label="Villain"
                  value={villain.name}
                  onChange={(e: any) => updateName(e, i)}
                ></TextInput>
                <NumberInput
                  defaultValue={villain.initiative}
                  value={villain.initiative}
                  placeholder="2"
                  label="Initiative"
                  onChange={(e) => updateInitiative(e, i)}
                />
              </Group>
              <Space h={'sm'} />
              <Group position="center" grow>
                <Checkbox
                  label="Critical Success?"
                  value={villain.critSuccess.toString()}
                  onChange={(e) => updateCriticalSuccess(e, i)}
                />

                <Checkbox
                  label="Critical Fail?"
                  value={villain.critFail.toString()}
                  onChange={(e) => updateCriticalFail(e, i)}
                />

                <Button
                  color="red"
                  radius="xl"
                  size="sm"
                  uppercase
                  onClick={(e: any) => removevillain(e, i)}
                >
                  Remove
                </Button>
              </Group>
              <Space h={'lg'} />
            </>
          ))}
        </>
      ) : editorType === 'roll' ? (
        <>
          {villains.map((villain, i) => (
            <>
              <Space h={'sm'} />
              <Divider size={'sm'} />
              <Space h={'sm'} />

              <Group position="center" grow>
                <TextInput
                  label="Villain"
                  value={villain.name}
                  onChange={(e: any) => updateName(e, i)}
                />
                <NumberInput
                  defaultValue={villain.bonus}
                  value={villain.bonus}
                  placeholder="2"
                  label="Init Bonus"
                  onChange={(e) => updateInitiativeBonus(e, i)}
                />
                <Button
                  color="red"
                  radius="sm"
                  size="lg"
                  uppercase
                  onClick={(e: any) => removevillain(e, i)}
                >
                  Remove
                </Button>
              </Group>
            </>
          ))}
        </>
      ) : (
        <Textarea
          placeholder="3, 14, 20*..."
          onChange={updateVillainsFromvillainInits}
        />
      )}

      {/* <p>{villains.map((villain) => villain.name + ' ')}</p> */}
    </>
  );
};

export default VillainConfig;
