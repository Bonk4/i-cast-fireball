import { Container, Grid } from '@mantine/core';
import { useState } from 'react';
import { Organism } from '../../models/organism';
import DarkSideConfig from './darkSideConfig/darkSideConfig';
import InitiativeList from './initiativeList/initiativeList';
import LightSideConfig from './lightSideConfig/lightSideConfig';

const SpacePickleApp = () => {
  const [initiative, updateInitiative] = useState(new Array<Organism>(0));
  const [lightSide, updateLightSide] = useState(new Array<Organism>(0));
  const [darkSide, updateDarkSide] = useState(new Array<Organism>(0));

  return (
    <>
      <Container
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
          },
        })}
      >
        <Grid>
          <Grid.Col span={6}>
            <LightSideConfig
              organisms={lightSide}
              updateOrganisms={updateLightSide}
            />
            <DarkSideConfig
              organisms={darkSide}
              updateOrganisms={updateDarkSide}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <InitiativeList organisms={initiative} />
          </Grid.Col>
        </Grid>
      </Container>
    </>
  );
};

export default SpacePickleApp;
