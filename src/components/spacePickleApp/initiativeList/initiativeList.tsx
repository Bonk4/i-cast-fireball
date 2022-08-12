import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Skeleton,
  Space,
  Text,
  Title,
} from "@mantine/core";
import { Organism } from "../../../models/organism";

export type InitiativeListProps = {
  organisms: Organism[];
  updateOrganisms: Function;
};

const InitiativeList = ({
  organisms,
  updateOrganisms,
}: InitiativeListProps) => {
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
        {organisms.map((organism, i) => (
          <>
            <Paper
              className={
                organism.lightSide
                  ? "init-light-organism"
                  : "init-dark-organism"
              }
              shadow="md"
              radius="md"
              p="md"
              withBorder
            >
              <Group position="apart">
                <div></div>
                <Title order={2}>{organism.lightSide ? "Light" : "Dark"}</Title>
                <Button
                  radius={"xl"}
                  compact
                  variant="subtle"
                  color={"gray"}
                  onClick={(e: any) => removeOrganism(i)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              </Group>
              <Text>{`${organism.success} Success | ${organism.advantage} Advantage | ${organism.triumph} Triumph`}</Text>
            </Paper>
          </>
        ))}
      </SimpleGrid>
    </>
  );
};

export default InitiativeList;
