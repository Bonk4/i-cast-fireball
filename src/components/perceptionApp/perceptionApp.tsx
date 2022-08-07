import { Button, Container, Grid, Group, Input, NumberInput, Space, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Creature } from "../../models/creature";
import { DiceRoller } from "../../util/diceRoller";

const PerceptionApp = () => {
    const dice = new DiceRoller();
    const [party, updateParty] = useState([new Creature()]);

    const addParty = () => {
        let newParty = party.slice();
        newParty.push(new Creature());
        updateParty(newParty);
    }

    const updateBonus = (e: any, i: number) => {
        let newParty = party.slice();
        newParty[i].perceptionBonus = e;
        updateParty(newParty);
    }

    const rollPerception = (i?: number) => {
        let newParty = party.slice();
        if (i !== undefined) {
            newParty[i].perception = dice.d20() + newParty[i].perceptionBonus;
        } else {
            for (let i = 0; i < newParty.length; i++) {
                newParty[i].perception = dice.d20() + newParty[i].perceptionBonus;
            }
        }

        updateParty(newParty);
    }

    return (
        <Container>
            <Grid gutter={'lg'}>
                <Grid.Col span={12}>
                    {party.map((p, i) => 
                        <>
                            <Group position="center">
                                <TextInput id="input-demo" label="Hero" placeholder="Hero" />

                                <NumberInput
                                    value={p.perceptionBonus}
                                    placeholder="Perception Bonus"
                                    label="Perception Bonus"
                                    onChange={(e) => updateBonus(e, i)}
                                    required>
                                </NumberInput>
                                
                                <NumberInput
                                    value={p.perception}
                                    placeholder=""
                                    label="Perception"
                                    disabled>
                                </NumberInput>
                                <Button variant="subtle" size="lg" onClick={() => rollPerception(i)}>
                                    <i className="fa-solid fa-dice-d20"></i>
                                </Button>
                            </Group>
                            <Space h={'lg'} />
                        </>
                    )}
                    
                    <Group position="center">
                        <Button onClick={addParty} color="green">Add</Button>

                        <Button onClick={() => rollPerception()}>Roll All</Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </Container>
    );
}

export default PerceptionApp;