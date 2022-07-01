import {
  Button,
  CloseButton,
  Group,
  NumberInput,
  SegmentedControl,
  Space,
  Title,
} from '@mantine/core';
import { Organism } from '../../../models/organism';

export type LightSideConfigProps = {
  organisms: Organism[];
  updateOrganisms: Function;
};

const LightSideConfig = ({
  organisms,
  updateOrganisms,
}: LightSideConfigProps) => {
  const addLightSide = (e: any) => {
    let newOrganisms = organisms.splice(0);
    newOrganisms.push(new Organism());
    updateOrganisms(newOrganisms);
  };

  const clearLightSide = (e: any) => {
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
        <Title order={2}>Light Side</Title>
      </Group>
      <Space h={'md'} />
      <Group position="center" spacing="lg" grow>
        <Button onClick={addLightSide}>Add</Button>
        <Button color={'red'} onClick={clearLightSide}>
          Clear
        </Button>
      </Group>
      <Space h={'md'} />
      {organisms.map((org, i) => (
        <>
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
        </>
      ))}
    </>
  );
};

export default LightSideConfig;
