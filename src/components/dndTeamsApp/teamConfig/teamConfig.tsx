import {
  Group,
  Input,
  SegmentedControl,
  Space,
  Textarea,
  Title,
} from '@mantine/core';
import { useState } from 'react';
import { Creature } from '../../../models/creature';

export type TeamConfigProps = {
  title: string;
  team: Creature[];
  updateTeam: Function;
  defaultTeamNumber: number;
};

const TeamConfig = ({
  title,
  team,
  updateTeam,
  defaultTeamNumber,
}: TeamConfigProps) => {
  const [teamName, updateTeamName] = useState('');
  const [teamNumber, updateTeamNumber] = useState(defaultTeamNumber);
  const [inits, updateInits] = useState('');

  const updateTeamMembers = () => {
    updateTeamFromInits();
    updateTeam(
      team.map((mate) => {
        mate.name = teamName;
        mate.team = teamNumber;
        return mate;
      }),
    );
  };

  const updateTeamFromInits = () => {
    let newTeam: Array<Creature> = [];
    if (inits !== undefined && inits !== '') {
      let rolls = inits.split(/[\s,;]+/);
      console.log(rolls);

      for (let i = 0; i < rolls.length; i++) {
        const roll = parseInt(rolls[i].toString());

        let teammate = new Creature();

        teammate.name = teamName;
        teammate.team = teamNumber;

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
      console.log(newTeam);
    }
  };

  const assignTeamNumber = (num: string) => {
    console.log(num);
    updateTeamNumber(parseInt(num));
    updateTeamMembers();
  };

  return (
    <>
      <Group position="apart">
        <Title order={3}>{teamName.length > 0 ? teamName : title}</Title>
        <Input
          value={teamName}
          onChange={(e: any) => {
            updateTeamName(e.target.value);
            updateTeamFromInits();
          }}
          placeholder={`Custom name`}
        ></Input>
      </Group>
      <Space h={'sm'} />

      <Textarea
        placeholder="3, 14, 20*..."
        value={inits}
        onChange={(e: any) => {
          updateInits(e.target.value);
          updateTeamMembers();
        }}
      />

      <Space h={'sm'} />
      <SegmentedControl
        defaultValue={defaultTeamNumber.toString()}
        data={[
          { label: 'Blue 1', value: '1' },
          { label: 'Blue 2', value: '2' },
          { label: 'Red 1', value: '3' },
          { label: 'Red 2', value: '4' },
          { label: 'Green 1', value: '5' },
          { label: 'Green 2', value: '6' },
        ]}
        onChange={(e) => assignTeamNumber(e)}
      />
    </>
  );
};

export default TeamConfig;
