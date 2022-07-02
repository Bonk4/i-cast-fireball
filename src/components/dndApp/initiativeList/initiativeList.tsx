import { Paper, Title, Text, SimpleGrid, Skeleton } from '@mantine/core';
import { create } from 'domain';
import { Creature } from '../../../models/creature';
import { Hero } from '../../../models/creatures/hero';
import { Villain } from '../../../models/creatures/villain';

export type InitiativeListProps = {
  creatures: Creature[];
};

const InitiativeList = ({ creatures }: InitiativeListProps) => {
  return creatures.length === 0 ? (
    <>
      <Skeleton height={50} circle mb="xl" />
      <Skeleton height={8} radius="xl" />
      <Skeleton height={8} mt={6} radius="xl" />
      <Skeleton height={8} mt={6} width="70%" radius="xl" />
    </>
  ) : (
    <>
      <SimpleGrid
        cols={1}
        spacing="lg"
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.dark[8],
          },
        })}
      >
        {creatures.map((creature) => (
          <>
            <Paper
              className={
                creature instanceof Hero
                  ? 'init-hero'
                  : creature instanceof Villain
                  ? 'init-villain'
                  : 'init-custom'
              }
              shadow="md"
              radius="md"
              p="md"
              withBorder
            >
              <Title order={2}>{creature.name}</Title>
              <Text>
                {`Initiative: ${creature.initiative}${
                  creature.critFail || creature.critSuccess ? '*' : ''
                }`}
              </Text>
            </Paper>
          </>
        ))}
      </SimpleGrid>
    </>
  );
};

export default InitiativeList;
