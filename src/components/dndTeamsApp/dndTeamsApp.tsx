import { Button, Container, Grid, Group, Space } from "@mantine/core";
import { useState } from "react";
import { Creature } from "../../models/creature";
import { Hero } from "../../models/creatures/hero";
import { Villain } from "../../models/creatures/villain";
import InitiativeList from "./initiativeList/initiativeList";
import TeamConfig from "./teamConfig/teamConfig";

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
        setTeam(party, partyTeamNumber, partyName.length > 0 ? partyName : 'Party');
        setTeam(villains, villainTeamNumber, villainName.length > 0 ? partyName : 'Villains');
        setTeam(other, otherTeamNumber, otherName.length > 0 ? partyName : 'Other');
        updateInitiative(party.concat(villains).concat(other));
    }

    const clearInitiative = (e: any) => {
        updateInitiative(new Array<Creature>());
    };

    const setTeam = (teamMembers: Creature[], team: number, teamName: string) => {
        for (let i = 0; i < teamMembers.length; i++) {
            teamMembers[i].name = teamName;
            teamMembers[i].team = team;
        }
    }

    return (
        <Container>
            <Grid>
                <Grid.Col span={7}>
                    <TeamConfig
                        title="Party"
                        team={party}
                        updateTeam={updateParty}
                        teamName={partyName}
                        updateTeamName={updatePartyName}
                        teamNumber={partyTeamNumber}
                        updateTeamNumber={updatePartyTeamNumber} />

                    <Space h={'lg'} />

                    <TeamConfig
                        title="Villains"
                        team={villains}
                        updateTeam={updateVillains}
                        teamName={villainName}
                        updateTeamName={updateVillainName}
                        teamNumber={villainTeamNumber}
                        updateTeamNumber={updateVillainTeamNumber} />

                    <Space h={'lg'} />

                    <TeamConfig
                        title="Other"
                        team={other}
                        updateTeam={updateOther}
                        teamName={otherName}
                        updateTeamName={updateOtherName}
                        teamNumber={otherTeamNumber}
                        updateTeamNumber={updateOtherTeamNumber} />

                </Grid.Col>
                <Grid.Col span={5}>
                    <Group position='apart'>
                        <Button
                            variant="gradient"
                            gradient={{ from: 'red', to: 'yellow' }}
                            size={'lg'}
                            onClick={rollForInitiative}
                        >
                            <i className="fa-solid fa-fire nav-icon"></i>
                            Roll For Initiative!
                        </Button>
                        <Button
                            color="gray"
                            size={'lg'}
                            onClick={clearInitiative}>
                            Clear
                        </Button>
                    </Group>
                    <Space h={'md'} />
                    <InitiativeList creatures={initiative} updateCreatures={updateInitiative} partyName={partyName} villainName={villainName} />
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default DndTeamsApp;