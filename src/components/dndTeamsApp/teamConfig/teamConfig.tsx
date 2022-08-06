import { Group, Input, SegmentedControl, Space, Textarea, Title } from "@mantine/core";
import { Creature } from "../../../models/creature";

export type TeamConfigProps = {
    title: string;
    team: Creature[];
    updateTeam: Function;
    teamName: string;
    updateTeamName: Function;
    teamNumber: number;
    updateTeamNumber: Function;
};

const TeamConfig = ({ title, team, updateTeam, teamName, updateTeamName, teamNumber, updateTeamNumber }: TeamConfigProps) => {
    const defaultColor = teamNumber.toString();

    const updateTeamFromInits = (e: any) => {
        let newTeam: Array<Creature> = [];
        if (e.target.value !== undefined && e.target.value !== '') {
            let rolls = e.target.value.split(/[\s,;]+/);

            for (let i = 0; i < rolls.length; i++) {
                const roll = parseInt(rolls[i].toString());

                let teammate = new Creature();

                if (rolls[i].indexOf('*') > -1) {
                    if (roll === 1) {
                        teammate.critFail = true;
                    } else {
                        teammate.critSuccess = true;
                    }
                }

                teammate.initiative = roll;
                newTeam.push(teammate);
            }

            updateTeam(newTeam);
        }
    };

    const assignTeamNumber = (num: string) => {
        updateTeamNumber(parseInt(num));
    }

    return (
        <>
            <Group position="apart">
                <Title order={3}>{teamName.length > 0 ? teamName : title}</Title>
                <Input value={teamName} onChange={(e: any) => updateTeamName(e.target.value)}
                    placeholder={`Custom name`}></Input>
            </Group>
            <Space h={'sm'} />

            <Textarea
                placeholder="3, 14, 20*..."
                onChange={updateTeamFromInits}
            />

            <Space h={'sm'} />
            <SegmentedControl
                defaultValue={defaultColor}
                data={[
                    { label: 'Blue 1', value: '1' },
                    { label: 'Blue 2', value: '2' },
                    { label: 'Red 1', value: '3' },
                    { label: 'Red 2', value: '4' },
                    { label: 'Green 1', value: '5' },
                    { label: 'Green 2', value: '6' },
                ]}
                onChange={(e) => assignTeamNumber(e)} />
        </>
    )
}

export default TeamConfig;