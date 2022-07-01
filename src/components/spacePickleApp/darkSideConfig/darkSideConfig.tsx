import {
  Button,
  CloseButton,
  Group,
  NumberInput,
  Paper,
  SegmentedControl,
  Space,
  Title,
} from '@mantine/core';
import { Organism } from '../../../models/organism';

export type DarkSideConfigProps = {
  organisms: Organism[];
  updateOrganisms: Function;
};

const DarkSideConfig = ({
  organisms,
  updateOrganisms,
}: DarkSideConfigProps) => {
  const addDarkSide = (e: any) => {
    let newOrganisms = organisms.splice(0);
    newOrganisms.push(new Organism());
    updateOrganisms(newOrganisms);
  };

  const clearDarkSide = (e: any) => {
    const emptyOrganisms: Organism[] = [];
    updateOrganisms(emptyOrganisms);
  };

  const updateSuccess = (e: any, index: number) => {
    let newOrganisms = organisms.splice(0);
    newOrganisms[index].success = parseInt(e.target.value.toString());
    updateOrganisms(newOrganisms);
  };

  const updateAdv = (e: any, index: number) => {
    let newOrganisms = organisms.splice(0);
    newOrganisms[index].advantage = parseInt(e.target.value.toString());
    updateOrganisms(newOrganisms);
  };

  return (
    <>
      <Group position="apart" grow>
        <Title order={2}>Dark Side</Title>
      </Group>
      <Space h={'md'} />
      <Group position="center" spacing="lg" grow>
        <Button onClick={addDarkSide}>Add</Button>
        <Button color={'red'} onClick={clearDarkSide}>
          Clear
        </Button>
      </Group>
      <Space h={'md'} />
      {organisms.map((org, i) => (
        <Paper>
          <Group>
            <NumberInput
              defaultValue={org.success}
              value={org.success}
              placeholder="2"
              label="Successes"
              onChange={(e) => updateSuccess(e, i)}
            />

            <NumberInput
              defaultValue={org.advantage}
              value={org.advantage}
              onChange={(e) => updateAdv(e, i)}
              placeholder="2"
              label="Advantages"
            />

            <CloseButton aria-label="Close modal" />
          </Group>
          <Space h={'md'} />
        </Paper>
      ))}
    </>
  );
};

export default DarkSideConfig;
