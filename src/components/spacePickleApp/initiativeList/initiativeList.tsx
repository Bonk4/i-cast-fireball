import {
  Container,
  Paper,
  SimpleGrid,
  Skeleton,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { Organism } from '../../../models/organism';

export type InitiativeListProps = {
  organisms: Organism[];
};

const InitiativeList = ({ organisms }: InitiativeListProps) => {
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
        {organisms.map((organism) => (
          <>
            <Paper
              className={
                organism.lightSide
                  ? 'init-light-organism'
                  : 'init-dark-organism'
              }
              shadow="md"
              radius="md"
              p="md"
              withBorder
            >
              <Title order={2}>
                {organism.lightSide ? 'Light Side' : 'Dark Side'}
              </Title>
              <Text>{`${organism.success} Success | ${organism.advantage} Advantage | ${organism.triumph} Triumph`}</Text>
            </Paper>
          </>
        ))}
      </SimpleGrid>
    </>
  );
};

export default InitiativeList;
