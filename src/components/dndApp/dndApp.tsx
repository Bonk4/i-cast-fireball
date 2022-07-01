import { useState } from 'react';
import { Button, Container } from '@mantine/core';
import PartyConfig from './partyConfig/partyConfig';
import MiscConfig from './miscConfig/miscConfig';
import VillainConfig from './villainConfig/villainConfig';
import { Creature } from '../../models/creature';
import { Hero } from '../../models/creatures/hero';
import { Villain } from '../../models/creatures/villain';
import { Custom } from '../../models/creatures/custom';
import InitiativeList from './initiativeList/initiativeList';

const DndApp = () => {
  const [initiative, updateInitiative] = useState(new Array<Creature>(0));
  const [heroes, updateHeroes] = useState(new Array<Hero>(0));
  const [villains, updateVillains] = useState(new Array<Villain>(0));
  const [misc, updateMisc] = useState(new Array<Custom>(0));
  const [rollForMe, updateRfm] = useState(false);

  const rollForInitiative = (e: any) => {
    console.log('rollForInitiative() called!');
    let newInit = [...heroes, ...villains, ...misc].rollForInitiative();
    console.log(newInit);
    updateInitiative(newInit);
  };

  return (
    <>
      <Container
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
          },
        })}
      >
        <PartyConfig heroes={heroes} updateHeroes={updateHeroes} />
        <VillainConfig villains={villains} updateVillains={updateVillains} />
        <MiscConfig misc={misc} updateMisc={updateMisc} />

        <Button onClick={rollForInitiative}></Button>

        <InitiativeList creatures={initiative}></InitiativeList>
      </Container>
    </>
  );
};

export default DndApp;
