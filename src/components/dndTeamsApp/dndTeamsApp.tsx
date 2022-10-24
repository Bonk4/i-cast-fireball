import { Button, Container, Grid, Group, Space } from '@mantine/core';
import { useState } from 'react';
import { Creature } from '../../models/creature';
import { Hero } from '../../models/creatures/hero';
import { Villain } from '../../models/creatures/villain';
import InitiativeList from './initiativeList/initiativeList';
import TeamConfig from './teamConfig/teamConfig';

const DndTeamsApp = () => {
  const [initiative, updateInitiative] = useState(new Array<Creature>());
  const [party, updateParty] = useState(new Array<Creature>());
  const [partyName, updatePartyName] = useState('');
  const [partyTeamNumber, updatePartyTeamNumber] = useState(1);

  const [villains, updateVillains] = useState(new Array<Creature>());
  const [villainName, updateVillainName] = useState('');
  const [villainTeamNumber, updateVillainTeamNumber] = useState(3);

  const [other, updateOther] = useState(new Array<Creature>());
  const [otherName, updateOtherName] = useState('');
  const [otherTeamNumber, updateOtherTeamNumber] = useState(5);

  const rollForInitiative = () => {
    updateInitiative(
      [...party, ...villains, ...other].rollForInitiative(false),
    );
  };

  const clearInitiative = (e: any) => {
    updateInitiative(new Array<Creature>());
  };

  return (
    <Container>
      <Grid>
        <Grid.Col span={7}>
          <TeamConfig
            title="Party"
            team={party}
            updateTeam={updateParty}
            defaultTeamNumber={1}
          />

          <Space h={'lg'} />

          <TeamConfig
            title="Villains"
            team={villains}
            updateTeam={updateVillains}
            defaultTeamNumber={3}
          />

          <Space h={'lg'} />

          <TeamConfig
            title="Other"
            team={other}
            updateTeam={updateOther}
            defaultTeamNumber={5}
          />
        </Grid.Col>
        <Grid.Col span={5}>
          <Group position="apart">
            <Button
              variant="gradient"
              gradient={{ from: 'red', to: 'yellow' }}
              size={'lg'}
              onClick={rollForInitiative}
            >
              <i className="fa-solid fa-fire nav-icon"></i>
              Roll For Initiative!
            </Button>
            <Button color="gray" size={'lg'} onClick={clearInitiative}>
              Clear
            </Button>
          </Group>
          <Space h={'md'} />
          <InitiativeList
            creatures={initiative}
            updateCreatures={updateInitiative}
            partyName={partyName}
            villainName={villainName}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default DndTeamsApp;
