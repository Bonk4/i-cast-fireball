import { Button, Container, Divider, Grid, Group, Space } from '@mantine/core';
import { useState } from 'react';
import { Organism } from '../../models/organism';
import '../../util/organismSort';
import InitiativeList from './initiativeList/initiativeList';
import OrganismConfig from './organismConfig/organismConfig';

const SpacePickleApp = () => {
  const [initiative, updateInitiative] = useState(new Array<Organism>(0));
  const [lightSide, updateLightSide] = useState(new Array<Organism>(0));
  const [darkSide, updateDarkSide] = useState(new Array<Organism>(0));

  const rollForInitiativeInSpace = () => {
    let newInitiative = [...lightSide, ...darkSide].rollForInitiativeInSpace();
    updateInitiative(newInitiative);
  };

  const clearInitiative = () => {
    updateInitiative(new Array<Organism>());
  }

  return (
    <>
      <Grid
        justify="space-around"
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
          },
        })}
      >
        <Grid.Col span={6}>
          <OrganismConfig
            organisms={lightSide}
            updateOrganisms={updateLightSide}
            lightSide={true}
          />

          <Space h={'md'} />
          <Divider size={'sm'} />
          <Space h={'md'} />

          <OrganismConfig
            organisms={darkSide}
            updateOrganisms={updateDarkSide}
            lightSide={false}
          />
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
        <Grid.Col span={4}>
          <Group position="apart">
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'blue', deg: 60 }}
              size={'lg'}
              onClick={rollForInitiativeInSpace}
            >
              <i className="fa-solid fa-fire nav-icon"></i>
              Roll For Initiative!
            </Button>
            <Button
              color="gray"
              size='lg'
              onClick={clearInitiative}>
              Clear
            </Button>
          </Group>
          <Space h={'lg'} />
          <InitiativeList organisms={initiative} />
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
      </Grid>
    </>
  );
};

export default SpacePickleApp;
