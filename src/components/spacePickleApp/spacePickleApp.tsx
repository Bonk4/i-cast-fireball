import {
  Accordion,
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Space,
  Text,
} from '@mantine/core';
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
  };

  return (
    <Container>
      <Accordion>
        <Accordion.Item
          label="Space Pickle"
          iconPosition="right"
          icon={<i className="fa-solid fa-question"></i>}
        >
          <Text align="left">
            Space Pickle, for when you get into a space pickle.
          </Text>
          <Text align="left">Star Wars themed Genysis Combat tracking.</Text>
        </Accordion.Item>
      </Accordion>

      <Space h={'xl'} />
      <Grid
        justify="space-around"
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
          },
        })}
      >
        <Grid.Col span={7}>
          <OrganismConfig
            organisms={lightSide}
            updateOrganisms={updateLightSide}
            lightSide={true}
          />

          <Space h={'md'} />
          <Divider size={'md'} />
          <Space h={'md'} />

          <OrganismConfig
            organisms={darkSide}
            updateOrganisms={updateDarkSide}
            lightSide={false}
          />
        </Grid.Col>
        <Grid.Col span={5}>
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
            <Button color="gray" size="lg" onClick={clearInitiative}>
              Clear
            </Button>
          </Group>
          <Space h={'lg'} />
          <InitiativeList
            organisms={initiative}
            updateOrganisms={updateInitiative}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SpacePickleApp;
