import { useState } from 'react';
import { Accordion, Button, Grid, Group, Space } from '@mantine/core';
import PartyConfig from './partyConfig/partyConfig';
import MiscConfig from './miscConfig/miscConfig';
import VillainConfig from './villainConfig/villainConfig';
import { Creature } from '../../models/creature';
import { Hero } from '../../models/creatures/hero';
import { Villain } from '../../models/creatures/villain';
import { Custom } from '../../models/creatures/custom';
import InitiativeList from './initiativeList/initiativeList';
import '../../util/creatureSort'; //rollForInitiative

const DndApp = () => {
  const [initiative, updateInitiative] = useState(new Array<Creature>(0));
  const [heroes, updateHeroes] = useState(new Array<Hero>(0));
  const [villains, updateVillains] = useState(new Array<Villain>(0));
  const [misc, updateMisc] = useState(new Array<Custom>(0));
  const [rollForMe, updateRollForMe] = useState(false);

  const rollForInitiative = (e: any) => {
    let newInit = [...heroes, ...villains, ...misc]
      .rollForInitiative(rollForMe)
      .slice();

    updateInitiative(newInit);
  };

  const clearInitiative = (e: any) => {
    updateInitiative(new Array<Creature>());
  };

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
          <Accordion multiple>
            <Accordion.Item label="Heroes">
              <PartyConfig heroes={heroes} updateHeroes={updateHeroes} />
            </Accordion.Item>
            <Accordion.Item label="Villains">
              <VillainConfig
                villains={villains}
                updateVillains={updateVillains}
                rollForMe={rollForMe}
                updateRollForMe={updateRollForMe}
              />
            </Accordion.Item>
            <Accordion.Item label="Custom">
              <MiscConfig misc={misc} updateMisc={updateMisc} />
            </Accordion.Item>
          </Accordion>
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
        <Grid.Col span={4}>
          <Group position='apart'>
            <Button
              variant="gradient"
              gradient={{ from: 'red', to: 'yellow' }}
              size={'lg'}
              onClick={rollForInitiative}
            >
              <i className="fa-solid fa-fire nav-icon"></i>
              Roll For Initiative!
            </Button>
            <Button
              color="gray"
              size={'lg'}
              onClick={clearInitiative}>
              Clear
            </Button>
          </Group>
          <Space h={'lg'} />
          <InitiativeList creatures={initiative} updateCreatures={updateInitiative} rollForMe={rollForMe} />
        </Grid.Col>
        <Grid.Col span={1}></Grid.Col>
      </Grid>
    </>
  );
};

export default DndApp;
