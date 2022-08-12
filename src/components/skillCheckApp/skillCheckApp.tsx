import {
  Button,
  Container,
  Grid,
  Group,
  NumberInput,
  Space,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { Creature } from "../../models/creature";
import { DiceRoller } from "../../util/diceRoller";

export type SkillCheckProps = {
  party: Array<Creature>;
  updateParty: Function;
};

const SkillCheckApp = ({ party, updateParty }: SkillCheckProps) => {
  const dice = new DiceRoller();

  const addParty = () => {
    let newParty = party.slice();
    newParty.push(new Creature());
    updateParty(newParty);
  };

  const removeParty = (i: number) => {
    let newParty = party.slice();
    newParty.splice(i, 1);
    updateParty(newParty);
  };

  const updateBonus = (e: any, i: number) => {
    let newParty = party.slice();
    newParty[i].skillCheckBonus = e;
    updateParty(newParty);
  };

  const rollSkillCheck = (i?: number) => {
    let newParty = party.slice();
    if (i !== undefined) {
      newParty[i].skillCheck = dice.d20() + newParty[i].skillCheckBonus;
    } else {
      for (let i = 0; i < newParty.length; i++) {
        newParty[i].skillCheck = dice.d20() + newParty[i].skillCheckBonus;
      }
    }

    updateParty(newParty);
  };

  return (
    <Container>
      <Grid gutter={"lg"}>
        <Grid.Col span={12}>
          <Group position="center">
            <Button onClick={addParty} color="green">
              Add
            </Button>

            <Button
              onClick={() => rollSkillCheck()}
              leftIcon={<i className="fa-solid fa-dice-d20"></i>}
            >
              Roll All
            </Button>
          </Group>

          <Space h="md" />

          {party.map((p, i) => (
            <>
              <Group position="center">
                <TextInput
                  id="input-demo"
                  placeholder="Hero"
                  className="skillcheck-input"
                />

                <NumberInput
                  value={p.skillCheckBonus}
                  placeholder="Bonus"
                  onChange={(e) => updateBonus(e, i)}
                  formatter={(bonus) => `+ ${bonus}`}
                  className="skillcheck-number-input"
                  required
                ></NumberInput>

                <Button
                  variant="subtle"
                  size="lg"
                  onClick={() => rollSkillCheck(i)}
                >
                  <i className="fa-solid fa-dice-d20"></i>
                </Button>

                <Title className="skillCheckResult">{p.skillCheck}</Title>
                <Button
                  variant="subtle"
                  color={"red"}
                  onClick={() => removeParty(i)}
                >
                  <i className="fa-solid fa-xmark"></i>
                </Button>
              </Group>
              <Space h={"lg"} />
            </>
          ))}
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default SkillCheckApp;
