import { Paper, Title, Text } from '@mantine/core';
import { Creature } from '../../../models/creature';

export type InitiativeListProps = {
  creatures: Creature[];
};

const InitiativeList = ({ creatures }: InitiativeListProps) => {
  return (
    <>
      {/* <ul> */}
      {creatures.map((creature) => (
        <Paper shadow="sm" radius="md" p="sm" withBorder>
          <Title order={2}>{creature.name}</Title>
          <Text>Initiative: {creature.initiative}</Text>
        </Paper>
      ))}
      {/* </ul> */}
    </>
  );
};

export default InitiativeList;
