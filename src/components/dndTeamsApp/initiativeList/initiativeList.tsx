import { Paper, Title, Text, SimpleGrid, Skeleton, Group, Button } from '@mantine/core';
import { Creature } from '../../../models/creature';
import { Hero } from '../../../models/creatures/hero';
import { Villain } from '../../../models/creatures/villain';

export type InitiativeListProps = {
    creatures: Creature[];
    updateCreatures: Function;
    partyName: string;
    villainName: string;
};

const InitiativeList = ({ creatures, updateCreatures, partyName, villainName }: InitiativeListProps) => {
    const removeCreature = (index: number) => {
        let newCreatures = creatures.slice();
        newCreatures.splice(index, 1);
        updateCreatures(newCreatures);
    }

    const markCreature = (i: number) => {
        let newCreatures = creatures.slice();
        newCreatures[i].marked = !newCreatures[i].marked;
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
                            className={`init-team-${creature.team} ${creature.marked ? 'marked' : ''}`}
                            shadow="md"
                            radius="md"
                            p="md"
                            withBorder
                        >
                            <Group position='apart'>
                                <Button
                                    radius={'xl'}
                                    compact
                                    variant='subtle'
                                    color={'gray'} onClick={() => markCreature(i)}>
                                    <i className="fa-solid fa-bookmark"></i>
                                </Button>
                                <Title order={2}>{creature.name}</Title>
                                <Button
                                    radius={'xl'}
                                    compact
                                    variant='subtle'
                                    color={'gray'} onClick={() => removeCreature(i)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </Button>
                            </Group>
                            <Text>
                                {`Initiative: ${creature.initiative}
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
