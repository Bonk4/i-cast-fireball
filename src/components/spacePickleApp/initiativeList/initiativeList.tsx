import { Paper, Text, Title } from '@mantine/core';
import { Organism } from '../../../models/organism';

export type InitiativeListProps = {
  organisms: Organism[];
};

const InitiativeList = ({ organisms }: InitiativeListProps) => {
  return (
    <>
      {organisms.map((organism) => (
        <Paper shadow="sm" radius="md" p="sm" withBorder>
          <Title order={2}>
            {organism.lightSide ? 'Light Side' : 'Dark Side'}
          </Title>
          <Text>{organism.success + ' Success'}</Text>
          <Text>{organism.advantage + ' Advantage'}</Text>
        </Paper>
      ))}
    </>
  );
};

export default InitiativeList;
