import {
  Button,
  CloseButton,
  Group,
  NumberInput,
  Space,
  Title,
} from '@mantine/core';
import { Organism } from '../../../models/organism';

export type OrganismConfigProps = {
  organisms: Organism[];
  updateOrganisms: Function;
  lightSide: boolean;
};

const OrganismConfig = ({
  organisms,
  updateOrganisms,
  lightSide,
}: OrganismConfigProps) => {
  const addLightSide = (e: any) => {
    let newOrganisms = organisms.slice();
    newOrganisms.push(new Organism(lightSide));
    updateOrganisms(newOrganisms);
  };

  const clearLightSide = (e: any) => {
    const emptyOrganisms: Organism[] = [];
    updateOrganisms(emptyOrganisms);
  };

  const updateSuccess = (suc: any, index: number) => {
    let newOrganisms = organisms.slice();
    newOrganisms[index].success = suc;
    updateOrganisms(newOrganisms);
  };

  const updateAdv = (adv: any, index: number) => {
    let newOrganisms = organisms.slice();
    newOrganisms[index].advantage = parseInt(adv);
    updateOrganisms(newOrganisms);
  };

  const updateTriumph = (tri: any, index: number) => {
    let newOrganisms = organisms.slice();
    newOrganisms[index].triumph = tri;
    updateOrganisms(newOrganisms);
  };

  const removeOrganism = (e: any, index: number) => {
    let newOrganisms = organisms.slice();
    newOrganisms.splice(index, 1);
    updateOrganisms(newOrganisms);
  };

  return (
    <>
      <Group position="apart" grow>
        <Title order={2}>{lightSide ? 'Light Side' : 'Dark Side'}</Title>
      </Group>
      <Space h={'md'} />
      <Group position="center" spacing="lg" grow>
        <Button onClick={addLightSide} uppercase>
          Add
        </Button>
        <Button color={'red'} onClick={clearLightSide} uppercase>
          Clear
        </Button>
      </Group>

      <Space h={'md'} />

      {organisms.map((org, i) => (
        <>
          <Group position="center" grow>
            <NumberInput
              defaultValue={org.success}
              value={org.success}
              placeholder="2"
              label="Success"
              onChange={(e) => updateSuccess(e, i)}
            />

            <NumberInput
              defaultValue={org.advantage}
              value={org.advantage}
              onChange={(e) => updateAdv(e, i)}
              placeholder="2"
              label="Advantage"
            />

            <NumberInput
              defaultValue={org.triumph}
              value={org.triumph}
              placeholder="2"
              label="Triumph"
              onChange={(e) => updateTriumph(e, i)}
            />

            <Button
              color="red"
              radius="xl"
              size="sm"
              uppercase
              onClick={(e: any) => removeOrganism(e, i)}
            >
              Remove
            </Button>
          </Group>
          <Space h={'md'} />
        </>
      ))}
    </>
  );
};

export default OrganismConfig;
