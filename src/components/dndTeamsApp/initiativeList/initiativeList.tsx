import {
  Paper,
  Title,
  Text,
  SimpleGrid,
  Skeleton,
  Group,
  Button,
  SegmentedControl,
  Badge,
  Center,
} from '@mantine/core';
import { useState } from 'react';
import { Creature } from '../../../models/creature';

export type InitiativeListProps = {
  creatures: Creature[];
  updateCreatures: Function;
  partyName: string;
  villainName: string;
};

const InitiativeList = ({
  creatures,
  updateCreatures,
}: InitiativeListProps) => {
  const [size, updateSize] = useState('expanded');

  const removeCreature = (index: number) => {
    let newCreatures = creatures.slice();
    newCreatures.splice(index, 1);
    updateCreatures(newCreatures);
  };

  const markCreature = (i: number) => {
    let newCreatures = creatures.slice();
    newCreatures[i].marked = !newCreatures[i].marked;
    updateCreatures(newCreatures);
  };

  const getColor = (t: number): string => {
    if (t == 1 || t == 2) return 'blue';
    if (t == 3 || t == 4) return 'red';
    return 'green';
  };

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
        <SegmentedControl
          value={size}
          onChange={updateSize}
          data={[
            { label: 'Compact', value: 'compact' },
            { label: 'Expanded', value: 'expanded' },
          ]}
        />
        {size === 'compact' ? (
          <>
            {creatures.map((creature) => (
              <>
                <Center>
                  <div style={{ width: 150 }}>
                    <Badge size="lg" color={getColor(creature.team)} fullWidth>
                      {creature.name}
                    </Badge>
                  </div>
                </Center>
              </>
            ))}
          </>
        ) : (
          creatures.map((creature, i) => (
            <>
              <Paper
                className={`init-team-${creature.team} ${
                  creature.marked ? 'marked' : ''
                }`}
                shadow="md"
                radius="md"
                p="md"
                withBorder
              >
                <Group position="apart">
                  <Button
                    radius={'xl'}
                    compact
                    variant="subtle"
                    color={'gray'}
                    onClick={() => markCreature(i)}
                  >
                    <i className="fa-solid fa-bookmark"></i>
                  </Button>
                  <Title order={2}>{creature.name}</Title>
                  <Button
                    radius={'xl'}
                    compact
                    variant="subtle"
                    color={'gray'}
                    onClick={() => removeCreature(i)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </Group>
                <Text>
                  {`Initiative: ${creature.initiative}
                                  ${
                                    creature.critFail || creature.critSuccess
                                      ? '*'
                                      : ''
                                  }`}
                </Text>
              </Paper>
            </>
          ))
        )}
      </SimpleGrid>
    </>
  );
};

export default InitiativeList;
