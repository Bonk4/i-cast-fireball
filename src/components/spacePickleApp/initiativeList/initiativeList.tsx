import {
  Badge,
  Button,
  Center,
  Group,
  Paper,
  SegmentedControl,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import { Organism } from '../../../models/organism';
import { useState } from 'react';

export type InitiativeListProps = {
  organisms: Organism[];
  updateOrganisms: Function;
};

const InitiativeList = ({
  organisms,
  updateOrganisms,
}: InitiativeListProps) => {
  const [size, updateSize] = useState('expanded');

  const removeOrganism = (index: number) => {
    let newOrganisms = organisms.slice();
    newOrganisms.splice(index, 1);
    updateOrganisms(newOrganisms);
  };

  return organisms.length === 0 ? (
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
        {organisms.map((organism, i) =>
          size === 'compact' ? (
            <>
              <Center>
                <div style={{ width: 150 }}>
                  <Badge
                    size="lg"
                    className={
                      organism.lightSide
                        ? 'init-light-organism'
                        : 'init-dark-organism'
                    }
                    fullWidth
                  >
                    {organism.lightSide ? 'Light' : 'Dark'}
                  </Badge>
                </div>
              </Center>
            </>
          ) : (
            <>
              <Paper
                className={
                  organism.lightSide
                    ? 'init-light-organism'
                    : 'init-dark-organism'
                }
                shadow="md"
                radius="sm"
                p="sm"
                withBorder
              >
                <Group position="apart">
                  <div></div>
                  <Title order={3}>
                    {organism.lightSide ? 'Light' : 'Dark'}
                  </Title>
                  <Button
                    radius={'xl'}
                    compact
                    variant="subtle"
                    color={'gray'}
                    onClick={(e: any) => removeOrganism(i)}
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </Button>
                </Group>
                <Text
                  size={'sm'}
                >{`${organism.success} Success | ${organism.advantage} Advantage | ${organism.triumph} Triumph`}</Text>
              </Paper>
            </>
          ),
        )}
      </SimpleGrid>
    </>
  );
};

export default InitiativeList;
