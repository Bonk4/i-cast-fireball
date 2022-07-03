import { Paper, Title, Text, SimpleGrid, Skeleton, Group, Button } from '@mantine/core';
import { create } from 'domain';
import { Creature } from '../../../models/creature';
import { Hero } from '../../../models/creatures/hero';
import { Villain } from '../../../models/creatures/villain';

export type InitiativeListProps = {
  creatures: Creature[];
  updateCreatures: Function;
  rollForMe: Boolean;
};

const InitiativeList = ({ creatures, updateCreatures, rollForMe }: InitiativeListProps) => {
  const removeCreature = (index: number) => {
    let newCreatures = creatures.slice();
    newCreatures.splice(index, 1);
    updateCreatures(newCreatures);
  }

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
        {creatures.map((creature, i) => (
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
              <Group position='apart'>
                <div></div>
                <Title order={2}>{creature.name}</Title>
                <Button
                  radius={'xl'}
                  compact
                  variant='outline'
                  color={'gray'} onClick={() => removeCreature(i)}>
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              </Group>
              <Text>
                {`Initiative: ${creature.initiative}${creature instanceof Villain && rollForMe
                  ? ` | Natural ${creature.roll}`
                  : ''}
                  ${creature.critFail || creature.critSuccess ? '*' : ''}`}
              </Text>
            </Paper>
          </>
        ))}
      </SimpleGrid>
    </>
  );
};

export default InitiativeList;
